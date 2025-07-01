/**
 * Tokenise a string into lowercase word tokens.
 * - Removes punctuation and emoji characters.
 * - Splits by whitespace / word boundaries.
 */
export function tokenize(input: string): string[] {
  if (!input) return [];

  // Lowercase, remove emojis, replace punctuation with space.
  const cleaned = input
    .toLowerCase()
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/[!"#$%&'()*+,\-.\/\\:;<=>?@\[\]^_`{|}~]/g, " ");

  // Split by one or more whitespace characters or word boundaries, filter empties.
  return cleaned
    .split(/\s+/)
    .filter(Boolean);
} 