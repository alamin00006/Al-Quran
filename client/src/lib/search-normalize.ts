// Normalizes search text so punctuation, casing, and diacritics do not block matches.
export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['`’]/g, "")
    .replace(/[^a-z0-9\u0980-\u09ff\u0600-\u06ff]+/gi, " ")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}
