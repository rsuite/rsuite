declare const __DEV__: boolean;

declare namespace Chai {
  interface Assertion {
    toHavaError(expectedMessage?: string): Assertion;
  }
}
