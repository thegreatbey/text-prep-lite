export type NormalizeOptions = {
    /** Expand common English contractions (e.g. "can't" → "cannot") */
    expandContractions?: boolean;
    /** Remove punctuation characters */
    removePunctuation?: boolean;
    /** Remove emoji (Unicode pictographic) characters */
    removeEmojis?: boolean;
};
/**
 * Normalise raw text by applying a series of common preprocessing steps.
 */
export declare function normalizeText(input: string, options?: NormalizeOptions): string;
