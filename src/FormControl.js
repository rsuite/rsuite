/* @flow */

import * as React from 'react';

import Input from './Input';
import ErrorMessage from './ErrorMessage';
import FormContext, { FormValueContext, FormErrorContext } from './FormContext';
import LegacyFormControl from './_legacy/FormControl';

import { getUnhandledProps, defaultProps, prefix } from './utils';

type PlacementEightPoints =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight'
  | 'leftTop'
  | 'rightTop'
  | 'leftBottom'
  | 'rightBottom';

type Props = {
  name: string,
  checkTrigger?: 'change' | 'blur' | 'none',
  accepter: React.ElementType,
  onChange?: (value: any, event: SyntheticEvent<*>) => void,
  onBlur?: (event: SyntheticEvent<*>) => void,
  classPrefix?: string,
  errorMessage?: React.Node,
  errorPlacement?: PlacementEightPoints
};

type State = {
  checkResult?: Object,
  value?: any
};

class FormControl extends React.Component<Props, State> {
  static contextType = FormContext;
  static defaultProps = {
    accepter: Input,
    errorPlacement: 'bottomLeft'
  };

  constructor(props: Props, context: Object) {
    super(props, context);
    if (!context || !context.onFieldChange) {
      throw new Error(`
        <FormControl> must be inside a component decorated with <Form>.
        And need to update React to 16.6.0 +.
      `);
    }

    const { formValue = {}, formDefaultValue = {} } = context;
    const name = props.name;

    this.state = {
      checkResult: {},
      value: formValue[name] || formDefaultValue[name]
    };
  }

  getValue() {
    const { formValue } = this.context.form;
    const { name } = this.props;

    if (formValue && typeof formValue[name] !== 'undefined') {
      return formValue[name];
    }

    return this.state.value;
  }

  getErrorMessage() {
    const { formError } = this.context.form;
    const { name, errorMessage } = this.props;

    if (errorMessage) {
      return errorMessage;
    }

    return formError[name];
  }

  getCheckTrigger() {
    const { checkTrigger } = this.context;
    return this.props.checkTrigger || checkTrigger;
  }

  handleFieldChange = (formValue: Object, value: any, event: SyntheticEvent<*>) => {
    const { name, onChange } = this.props;
    const { onFieldChange } = this.context;
    const checkTrigger = this.getCheckTrigger();
    const checkResult = this.handleFieldCheck(formValue, value, checkTrigger === 'change');

    this.setState({ checkResult, value });

    onFieldChange(name, value, event);
    onChange && onChange(value, event);
  };

  handleFieldBlur = (formValue: Object, event: SyntheticEvent<*>) => {
    const { onBlur, name } = this.props;
    const checkTrigger = this.getCheckTrigger();
    const value = typeof formValue[name] === 'undefined' ? this.state.value : formValue[name];

    this.handleFieldCheck(formValue, value, checkTrigger === 'blur');
    onBlur && onBlur(event);
  };

  handleFieldCheck = (
    formValue: Object,
    value: any,
    isCheckTrigger: boolean,
    callback?: Function
  ) => {
    const { name } = this.props;
    const { onFieldError, onFieldSuccess, model } = this.context;
    const checkResult = model.checkForField(name, value, formValue);

    if (isCheckTrigger) {
      if (checkResult.hasError) {
        onFieldError(name, checkResult.errorMessage, callback);
      } else {
        onFieldSuccess(name, callback);
      }
    }

    return checkResult;
  };

  render() {
    const {
      name,
      accepter: Component,
      classPrefix,
      errorPlacement,
      errorMessage: propErrorMessage,
      ...props
    } = this.props;

    const { formValue = {}, formDefaultValue = {} } = this.context.form;
    const unhandled = getUnhandledProps(FormControl, props);
    const addPrefix = prefix(classPrefix);
    const errorMessage = this.getErrorMessage();
    const hasError = !!errorMessage;

  render() {
    return (
      <div className={this.addPrefix('wrapper')}>
        <FormValueContext.Consumer>{this.renderValue}</FormValueContext.Consumer>
        {this.checkErrorFromContext()}
      </div>
    );
  }
}

const EnhancedFormControl = defaultProps({
  classPrefix: 'form-control'
})(FormControl);

export default (React.createContext ? EnhancedFormControl : LegacyFormControl);
