declare const __DEV__: boolean;

declare namespace Chai {
  interface Assertion {
    toHaveError(expectedMessage?: string): Assertion;
  }
}
