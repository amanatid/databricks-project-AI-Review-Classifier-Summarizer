# 📊 Databricks AI Review Classifier & Summarizer

An automated Databricks workspace pipeline that leverages **Databricks AI Functions / Foundation Model APIs** to perform sentiment analysis, multi-class topic categorization, and text summarization on customer feedback at scale.

---

## 🌟 Key Features

- **Automated Categorization:** Classifies incoming customer reviews into custom tags (e.g., *Product Quality*, *Customer Support*, *Shipping*, *Pricing*).
- **Sentiment & Intent Analysis:** Evaluates customer sentiment (Positive, Neutral, Negative) and highlights urgent operational issues.
- **AI-Powered Summarization:** Summarizes lengthy review text into concise, actionable key takeaways.
- **Scalable Processing:** Uses **Databricks AI Functions** (`ai_analyze_sentiment`, `ai_classify`, `ai_summarize`) and **Delta Lake** for scalable batch or streaming data processing.

---

## 🏗️ Architecture & Workflow

```text
[ Raw Reviews Data ] ➔ [ Delta Lake Bronze ] ➔ [ Databricks AI Functions ] ➔ [ Delta Lake Silver/Gold ] ➔ [ Analytics / BI Dashboard ]
