import { Router } from "express";
import { queryDatabricks } from "../databricks/sql.js";
import { CATALOG } from "../config.js";
import { computeHealthStatus, healthLabel } from "../health/rules.js";
import { parseComplaintCategory } from "../utils/complaintCategory.js";
import {
  isProductFlaggged,
  setProductAsFlaggedProduct,
} from "../services/flags.js";
import { getProductInsights } from "../services/brief.js";

export const productsRouter = Router();

type MetricsRow = {
  review_count: number | null;
  avg_rating: number | null;
  negative_pct: number | null;
};

type ProductListRow = MetricsRow & {
  product_id: string;
  name: string;
  category: string;
  top_complaint: string | null;
};

type ProductRow = {
  product_id: string;
  name: string;
  category: string;
};

type CategoryCountRow = {
  complaint_category: string;
  cnt: number;
};

type SentimentCountRow = {
  sentiment: string;
  cnt: number;
};

type HighlightReviewRow = {
  text: string;
  rating: number;
  sentiment: string;
};

function buildProductMetrics(row: MetricsRow | undefined) {
  const productMetrics = {
    reviewCount: Number(row?.review_count ?? 0),
    avgRating: row?.avg_rating !== null ? Number(row?.avg_rating) : null,
    negativePct: row?.negative_pct !== null ? Number(row?.negative_pct) : null,
  };

  const healthStatus = computeHealthStatus(productMetrics);

  return {
    metrics: productMetrics,
    health: { status: healthStatus, label: healthLabel(healthStatus) },
  };
}

const METRICS_SUBQUERY = `
  SELECT
    enriched.product_id,
    COUNT(*) AS review_count,
    AVG(review.rating) AS avg_rating,
    100.0 * SUM(CASE WHEN enriched.sentiment = 'negative' THEN 1 ELSE 0 END) / COUNT(*) AS negative_pct
  FROM ${CATALOG}.core.enriched_reviews enriched
  JOIN ${CATALOG}.core.reviews review ON enriched.review_id = review.review_id
  GROUP BY enriched.product_id
`;

productsRouter.get("/products", async (_req, res) => {
  try {
    const productRows = await queryDatabricks<ProductListRow>(
      `
        SELECT
        product.product_id,
        product.name,
        product.category,
        metrics.review_count,
        metrics.avg_rating,
        metrics.negative_pct,
        (
          SELECT enriched.complaint_category
          FROM ${CATALOG}.core.enriched_reviews enriched
          WHERE enriched.product_id = product.product_id
            AND enriched.complaint_category IS NOT NULL
          GROUP BY enriched.complaint_category
          ORDER BY COUNT(*) DESC
          LIMIT 1
        ) AS top_complaint
      FROM ${CATALOG}.core.products product
      LEFT JOIN (${METRICS_SUBQUERY}) metrics ON product.product_id = metrics.product_id
      ORDER BY product.name
            
            `,
    );

    res.json({
      products: productRows.map((product) => ({
        productId: product.product_id,
        name: product.name,
        category: product.category,
        ...buildProductMetrics(product),
        topComplaint: parseComplaintCategory(product.top_complaint),
        flagged: false,
      })),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load products";
    res.status(500).json({ error: message });
  }
});

productsRouter.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const [
      productRows,
      metricsRows,
      categoryRows,
      sentimentRows,
      worstNegativeReviewRows,
      bestPositiveReviewRows,
      flagged,
      productInsights,
    ] = await Promise.all([
      queryDatabricks<ProductRow>(
        `
        SELECT product_id, name, category
        FROM ${CATALOG}.core.products
        WHERE product_id = '${productId}'
        
        `,
      ),

      queryDatabricks<MetricsRow>(
        `
        SELECT review_count, avg_rating, negative_pct
        FROM (${METRICS_SUBQUERY}) metrics
        WHERE product_id = '${productId}'
        
        `,
      ),

      queryDatabricks<CategoryCountRow>(`
        SELECT complaint_category, COUNT(*) as cnt
        FROM ${CATALOG}.core.enriched_reviews enriched
        WHERE enriched.product_id = '${productId}'
           AND enriched.complaint_category IS NOT NULL
        GROUP BY enriched.complaint_category
        ORDER BY cnt DESC
        `),

      queryDatabricks<SentimentCountRow>(
        `
          SELECT sentiment, COUNT(*) AS cnt
        FROM ${CATALOG}.core.enriched_reviews enriched
        WHERE enriched.product_id = '${productId}'
          AND enriched.sentiment IS NOT NULL
        GROUP BY enriched.sentiment
        ORDER BY cnt DESC
          `,
      ),

      queryDatabricks<HighlightReviewRow>(
        `
        SELECT review.text, review.rating, enriched.sentiment
        FROM ${CATALOG}.core.reviews review
        JOIN ${CATALOG}.core.enriched_reviews enriched ON review.review_id = enriched.review_id
        WHERE review.product_id = '${productId}'
          AND enriched.sentiment = 'negative'
        ORDER BY review.rating ASC
        LIMIT 1
          `,
      ),

      queryDatabricks<HighlightReviewRow>(`
        SELECT review.text, review.rating, enriched.sentiment
        FROM ${CATALOG}.core.reviews review
        JOIN ${CATALOG}.core.enriched_reviews enriched ON review.review_id = enriched.review_id
        WHERE review.product_id = '${productId}'
          AND enriched.sentiment = 'positive'
        ORDER BY review.rating DESC
        LIMIT 1
          `),

      isProductFlaggged(productId),

      getProductInsights(productId),
    ]);

    const productRow = productRows[0];

    if (!productRow) {
      res.status(404).json({ error: "Product Not found" });
      return;
    }

    const { metrics, health } = buildProductMetrics(metricsRows[0]);

    const highlightReviewRow =
      health.status === "healthy"
        ? (bestPositiveReviewRows[0] ?? null)
        : (worstNegativeReviewRows[0] ?? null);

    res.json({
      productId: productRow.product_id,
      name: productRow.name,
      category: productRow.category,
      metrics,
      health,
      flagged,
      summary: productInsights.summary,
      nextStep: productInsights.nextStep,
      highlightReview: highlightReviewRow
        ? {
            text: highlightReviewRow.text,
            rating: Number(highlightReviewRow.rating),
            sentiment: highlightReviewRow.sentiment,
          }
        : null,
      topComplaint: categoryRows[0]
        ? (parseComplaintCategory(categoryRows[0].complaint_category) ??
          categoryRows[0].complaint_category)
        : null,
      topCategories: categoryRows.map((categoryRow) => ({
        category:
          parseComplaintCategory(categoryRow.complaint_category) ??
          categoryRow.complaint_category,
        count: Number(categoryRow.cnt),
      })),

      sentimentBreakdown: sentimentRows.map((sentimentRow) => ({
        sentiment: sentimentRow.sentiment,
        count: Number(sentimentRow.cnt),
      })),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load products";
    res.status(500).json({ error: message });
  }
});

productsRouter.put("/products/:productId/flag", async (req, res) => {
  const flagged = Boolean(req.body?.flagged);
  try {
    const updatedFlag = await setProductAsFlaggedProduct(
      req.params.productId,
      flagged,
    );

    res.json({ productId: req.params.productId, flagged: updatedFlag });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load products";
    res.status(500).json({ error: message });
  }
});
