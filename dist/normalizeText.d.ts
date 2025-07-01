export type NormalizeOptions = {
    /** Expand contractions for the given locale (e.g. "can't" → "cannot") */
    expandContractions?: boolean;
    /** Remove punctuation characters */
    removePunctuation?: boolean;
    /** Remove emoji (Unicode pictographic) characters */
    removeEmojis?: boolean;
    /**
     * BCP-47 language tag used to select locale-specific rules (default: "en").
     * Only affects contraction expansion for now.
     */
    locale?: string;
};
/**
 * Normalise raw text by applying a series of common preprocessing steps.
 */
export declare function normalizeText(input: string, options?: NormalizeOptions): string;
