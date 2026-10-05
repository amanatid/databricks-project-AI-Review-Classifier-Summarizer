import { CATALOG } from "../config.js";
import { queryDatabricks } from "../databricks/sql.js";
import { parseComplaintCategory } from "../utils/complaintCategory.js";

const FALLBACK_SUMMARY =
  "No summary available yet — run the enrich pipeline first.";
const FALLBACK_NEXT_STEP =
  "Review recent negative feedback and decide on next steps.";

async function loadReviewSnippts(productId: string) {
  const reviewRows = await queryDatabricks<{
    text: string;
    sentiment: string;
    complaint_category: string;
  }>(`
        SELECT text, sentiment, complaint_category
         FROM ${CATALOG}.core.enriched_reviews enriched
          WHERE enriched.product_id = '${productId}'
    ORDER BY CASE WHEN enriched.sentiment = 'negative' THEN 0 ELSE 1 END
    LIMIT 5

        `);

  return reviewRows
    .map((reviewRow) => {
      const complaintCategory =
        parseComplaintCategory(reviewRow.complaint_category) ?? "unknwon";

      return `- ${reviewRow.text} (${reviewRow.sentiment}, ${complaintCategory})`;
    })
    .join("\n");
}

export async function getProductInsights(
  productId: string,
): Promise<{ summary: string; nextStep: string }> {
  try {
    const reviewSnippets = await loadReviewSnippts(productId);

    const summaryPrompt = `In 2-3 sentences, summarize product health for a PM based on these review snippets:\n${reviewSnippets}`;
    const nextStepPrompt = `In 2-3 sentences, what should a PM do next for this product? Base it only on these reviews:\n${reviewSnippets}`;

    const [summaryRows, nextStepRows] = await Promise.all([
      queryDatabricks<{ summary: string }>(
        `SELECT ai_gen('${summaryPrompt}') AS summary`,
      ),
      queryDatabricks<{ next_step: string }>(
        `SELECT ai_gen('${nextStepPrompt}') AS next_step`,
      ),
    ]);

    return {
      summary: summaryRows[0]?.summary ?? FALLBACK_SUMMARY,
      nextStep: nextStepRows[0]?.next_step ?? FALLBACK_NEXT_STEP,
    };
  } catch {
    return { summary: FALLBACK_SUMMARY, nextStep: FALLBACK_NEXT_STEP };
  }
}
