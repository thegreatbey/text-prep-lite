declare module "vitest" {
  // Basic function signatures used in tests. These are *not* complete; install vitest types for full support.
  export function describe(name: string, fn: () => void): void;
  export function it(name: string, fn: () => void): void;
  export function expect<T = any>(value: T): any;
} 