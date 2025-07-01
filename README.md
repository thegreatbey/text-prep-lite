# text-prep-lite

[![npm version](https://img.shields.io/npm/v/text-prep-lite.svg)](https://www.npmjs.com/package/text-prep-lite)
[![CI](https://github.com/thegreatbey/text-prep-lite/actions/workflows/ci.yml/badge.svg)](https://github.com/thegreatbey/text-prep-lite/actions/workflows/ci.yml)

Lightweight text preprocessing utilities for Natural Language Processing (NLP) written in TypeScript.

`text-prep-lite` provides two core helpers:

* `normalizeText` – clean & normalise raw text into a predictable representation.
* `tokenize` – break text into lowercase word tokens.

The library is intentionally **dependency-free** and suitable for browsers, Node.js, and serverless environments.

---

## Why?

Natural-language data is messy.  Before tokenisation or feeding text into an NLP model you often need to:

* normalise case & whitespace
* expand contractions ("can't" → "cannot")
* strip punctuation / emojis

`text-prep-lite` does those common steps with **zero runtime dependencies**.

---

## Installation

```bash
npm install text-prep-lite
# or
yarn add text-prep-lite
```

---

## Usage

```ts
import { normalizeText, tokenize } from "text-prep-lite";

const raw = "  I can't believe it's not butter! 🧈  ";

const cleaned = normalizeText(raw, {
  expandContractions: true,
  removePunctuation: true,
  removeEmojis: true,
});
// → "i cannot believe it is not butter"

const tokens = tokenize(raw);
// → ["i", "can", "t", "believe", "it", "s", "not", "butter"]
```

---

## API

### `normalizeText(input: string, options?: NormalizeOptions): string`

Returns a cleaned version of `input`.

`NormalizeOptions`:

| Option | Default | Description |
|--------|---------|-------------|
| `expandContractions` | `false` | Expand contractions for the selected `locale`. |
| `removePunctuation` | `false` | Strip punctuation characters. |
| `removeEmojis` | `false` | Remove Unicode emoji characters. |
| `locale` | `'en'` | BCP-47 language tag for locale-specific rules (currently: **en**, **sq**, **fr**, **de**, **he**). |

**Supported locales**

- `en` – English (default)
- `sq` – Albanian
- `fr` – French
- `de` – German
- `he` – Hebrew
- `es` – Spanish
- `zh` – Chinese (Mandarin)
- `yue` – Chinese (Cantonese)

```ts
// French example
normalizeText("C'est incroyable!", { expandContractions: true, locale: "fr" });
// → "ce est incroyable!"  (punctuation kept in this call)
```

---

### `tokenize(input: string): string[]`

1. Converts text to lowercase.
2. Removes punctuation & emojis.
3. Splits by whitespace / word boundaries.

Returns an array of tokens.

`tokenize` has **no options** – it always lowercases, strips punctuation & emojis, and splits on whitespace.

---

## Development

```bash
# run tests
npm test

# build library
npm run build
```

---

## License

MIT © Your Name 

---

## Contributing

1. Fork & clone the repo
2. `npm i`
3. `npm test` – run lint & unit tests
4. Submit pull-request 🚀

Please add tests for any new feature or bug-fix. 