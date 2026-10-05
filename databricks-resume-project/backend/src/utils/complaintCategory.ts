export function parseComplaintCategory(
  complaintFromDatabase: string | null | undefined,
): string | null {
  if (!complaintFromDatabase) return null;

  const trimmedValue = complaintFromDatabase.trim();

  if (!trimmedValue.startsWith("{")) return trimmedValue;

  try {
    const parsedJson = JSON.parse(trimmedValue) as { response?: unknown[] };
    const firstCategoryEntry = parsedJson.response?.[0];

    if (typeof firstCategoryEntry === "string") return firstCategoryEntry;

    if (
      firstCategoryEntry &&
      typeof firstCategoryEntry === "object" &&
      firstCategoryEntry !== null &&
      "value" in firstCategoryEntry
    ) {
      return String((firstCategoryEntry as { value: string }).value);
    }
  } catch {
    return trimmedValue;
  }

  return trimmedValue;
}
