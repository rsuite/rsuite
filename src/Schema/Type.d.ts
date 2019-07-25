interface CheckResult<T = string> {
  hasError: boolean;
  errorMessage: T;
}

declare class Type<ValueType = any, ErrorMsgType = string, DataType = any> {
  constructor(name: string | number | symbol);

  check: (value: ValueType, data: DataType) => CheckResult<ErrorMsgType>;
  addRule: (
    onValid: (value: ValueType, data: DataType) => CheckResult<ErrorMsgType> | boolean,
    errorMessage: ErrorMsgType
  ) => this;
  isRequired: (errorMessage: ErrorMsgType) => this;
}

export { CheckResult, Type };
