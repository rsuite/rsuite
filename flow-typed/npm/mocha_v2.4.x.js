// flow-typed signature: ee3fbf2649f3a8e2106603751f8fe5ea
// flow-typed version: da30fe6876/mocha_v2.4.x/flow_>=v0.25.x

type TestFunction = (done: () => void) => void | Promise<mixed>;

declare var describe: {
  (name: string, spec: () => void): void,
  only(description: string, spec: () => void): void,
  skip(description: string, spec: () => void): void,
  timeout(ms: number): void
};

declare var context: typeof describe;

declare var it: {
  (name: string, spec?: TestFunction): void,
  only(description: string, spec: TestFunction): void,
  skip(description: string, spec: TestFunction): void,
  timeout(ms: number): void
};

declare function before(method: TestFunction): void;
declare function beforeEach(method: TestFunction): void;
declare function after(method: TestFunction): void;
declare function afterEach(method: TestFunction): void;
