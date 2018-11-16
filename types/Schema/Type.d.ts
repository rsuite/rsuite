interface CheckResult {
  hasError: boolean;
  errorMessage: string;
}

declare class Type {
  constructor(name: string)
  check: (value: any, data: any) => CheckResult;
  addRule: (onValid: (value: any, data: any) => CheckResult | boolean, errorMessage: string) => this;
  isRequired: (errorMessage: string) => this;
}

export {
  CheckResult,
  Type,
}
