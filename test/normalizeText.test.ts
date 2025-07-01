import { describe, it, expect } from "vitest";
import { normalizeText } from "../src/normalizeText";

describe("normalizeText", () => {
  it("lowercases and trims input", () => {
    expect(normalizeText("  HeLLo  ")).toBe("hello");
  });

  it("expands contractions when enabled", () => {
    expect(normalizeText("I can't", { expandContractions: true })).toBe("i cannot");
  });

  it("removes punctuation when enabled", () => {
    expect(normalizeText("Hello, world!", { removePunctuation: true })).toBe("hello world");
  });

  it("removes emojis when enabled", () => {
    expect(normalizeText("hello 🌍", { removeEmojis: true })).toBe("hello");
  });

  it("expands French contractions", () => {
    expect(normalizeText("C'est incroyable", { expandContractions: true, locale: "fr" })).toBe("ce est incroyable");
  });

  it("expands German contractions", () => {
    expect(normalizeText("Wir gehen zum Markt", { expandContractions: true, locale: "de" })).toBe("wir gehen zu dem markt");
  });

  it("expands Albanian contractions", () => {
    expect(normalizeText("S'ka problem", { expandContractions: true, locale: "sq" })).toBe("s ka problem");
  });

  it("expands Hebrew contractions", () => {
    expect(normalizeText("מ' בסדר", { expandContractions: true, locale: "he" })).toBe("מ בסדר");
  });

  it("expands Spanish contractions", () => {
    expect(normalizeText("Vamos al parque", { expandContractions: true, locale: "es" })).toBe("vamos a el parque");
  });

  it("expands Chinese contractions (Mandarin)", () => {
    expect(normalizeText("没事", { expandContractions: true, locale: "zh" })).toBe("没有事");
  });

  it("expands Chinese contractions (Cantonese)", () => {
    expect(normalizeText("冇問題", { expandContractions: true, locale: "yue" })).toBe("沒有問題");
  });

  it("handles empty string", () => {
    expect(normalizeText("", { expandContractions: true })).toBe("");
  });

  it("removes multiple emojis", () => {
    expect(normalizeText("hi 😄😄", { removeEmojis: true })).toBe("hi");
  });

  it("handles non-ASCII punctuation", () => {
    expect(normalizeText("¿Qué tal?", { removePunctuation: true })).toBe("qué tal");
  });

  it("expands y'all contraction", () => {
    expect(normalizeText("Y'all ready?", { expandContractions: true })).toBe("you all ready?");
  });
}); 