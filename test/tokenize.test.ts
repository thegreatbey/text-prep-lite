import { describe, it, expect } from "vitest";
import { tokenize } from "../src/tokenize";

describe("tokenize", () => {
  it("splits simple sentence into tokens", () => {
    expect(tokenize("Hello, world!")).toEqual(["hello", "world"]);
  });

  it("handles multiple spaces and punctuation", () => {
    expect(tokenize("   This   is...a test!!! ")).toEqual(["this", "is", "a", "test"]);
  });
}); 