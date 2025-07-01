"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeText = normalizeText;
/**
 * Map of lowercase contractions to their expanded forms.
 * The list is intentionally kept small and dependency-free; extend as needed.
 */
const CONTRACTION_MAP = {
    "can't": "cannot",
    "won't": "will not",
    "i'm": "i am",
    "it's": "it is",
    "he's": "he is",
    "she's": "she is",
    "they're": "they are",
    "we're": "we are",
    "isn't": "is not",
    "aren't": "are not",
    "wasn't": "was not",
    "weren't": "were not",
    "don't": "do not",
    "doesn't": "does not",
    "didn't": "did not",
    "hasn't": "has not",
    "haven't": "have not",
    "hadn't": "had not",
    "shouldn't": "should not",
    "wouldn't": "would not",
    "couldn't": "could not",
    "mustn't": "must not",
    "let's": "let us",
    "there's": "there is",
    "that's": "that is",
    "what's": "what is",
    "who's": "who is",
    "where's": "where is",
    "when's": "when is",
    "why's": "why is",
    "how's": "how is",
    "i've": "i have",
    "we've": "we have",
    "they've": "they have",
    "should've": "should have",
    "would've": "would have",
    "could've": "could have",
    "i'll": "i will",
    "he'll": "he will",
    "she'll": "she will",
    "we'll": "we will",
    "they'll": "they will",
    "it'll": "it will",
    "who'll": "who will",
    "can't've": "cannot have",
    "n't": " not" // catch-all for contractions ending in n't
};
/**
 * Normalise raw text by applying a series of common preprocessing steps.
 */
function normalizeText(input, options = {}) {
    let text = (input ?? "").toLowerCase().trim();
    const { expandContractions = false, removePunctuation = false, removeEmojis = false } = options;
    // 1. Expand contractions before punctuation removal (to preserve apostrophes).
    if (expandContractions) {
        text = expandTextContractions(text);
    }
    // 2. Remove emojis (Unicode Extended_Pictographic) if requested.
    if (removeEmojis) {
        text = text.replace(/\p{Extended_Pictographic}/gu, "");
    }
    // 3. Remove punctuation if requested.
    if (removePunctuation) {
        text = text.replace(/[!"#$%&'()*+,\-.\/\\:;<=>?@\[\]^_`{|}~]/g, " ");
    }
    // 4. Collapse multiple spaces into a single space and trim again.
    return text.replace(/\s+/g, " ").trim();
}
function expandTextContractions(text) {
    // Build a regex that matches any contraction in the map or generic n't pattern.
    const keys = Object.keys(CONTRACTION_MAP)
        .map((k) => k.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"));
    const contractionRegex = new RegExp(`\\b(${keys.join("|")})\\b`, "gi");
    return text.replace(contractionRegex, (match) => {
        const lower = match.toLowerCase();
        return CONTRACTION_MAP[lower] ?? match;
    });
}
