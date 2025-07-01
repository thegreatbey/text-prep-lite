"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeText = normalizeText;
const contractions_1 = require("./contractions");
/**
 * Normalise raw text by applying a series of common preprocessing steps.
 */
function normalizeText(input, options = {}) {
    let text = (input ?? "").toLowerCase().trim();
    const { expandContractions = false, removePunctuation = false, removeEmojis = false, locale = "en", } = options;
    // 1. Expand contractions before punctuation removal (to preserve apostrophes).
    if (expandContractions) {
        const map = contractions_1.CONTRACTION_MAPS[locale] ?? {};
        if (Object.keys(map).length) {
            text = expandTextContractions(text, map, locale);
        }
    }
    // 2. Remove emojis (Unicode Extended_Pictographic) if requested.
    if (removeEmojis) {
        text = text.replace(/\p{Extended_Pictographic}/gu, "");
    }
    // 3. Remove punctuation if requested.
    if (removePunctuation) {
        text = text.replace(/[!"#$%&'()*+,\-.\/\\:;<=>?@\[\]^_`{|}~¡¿]/g, " ");
    }
    // 4. Collapse multiple spaces into a single space and trim again.
    return text.replace(/\s+/g, " ").trim();
}
function expandTextContractions(text, map, locale) {
    if (!Object.keys(map).length)
        return text;
    const keys = Object.keys(map).map((k) => k.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"));
    // Use word boundaries for Latin-script languages to avoid false positives.
    const useWordBoundary = !["zh", "yue", "he"].includes(locale);
    const pattern = useWordBoundary ? `\\b(${keys.join("|")})\\b` : `(${keys.join("|")})`;
    const contractionRegex = new RegExp(pattern, "gi");
    return text.replace(contractionRegex, (match) => {
        const lower = match.toLowerCase();
        return map[lower] ?? map[match] ?? match;
    });
}
