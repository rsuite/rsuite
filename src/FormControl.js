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
  errorPlacement?: PlacementEightPoints,
  formValue?: Object
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

  getCheckTrigger() {
    const { checkTrigger } = this.context;
    return this.props.checkTrigger || checkTrigger;
  }

  handleFieldChange = (value: any, event: SyntheticEvent<*>) => {
    const { name, onChange, formValue = {} } = this.props;
    const { onFieldChange } = this.context;
    const checkTrigger = this.getCheckTrigger();
    const checkResult = this.handleFieldCheck(formValue, value, checkTrigger === 'change');

    this.setState({ checkResult, value });

    onFieldChange(name, value, event);
    onChange && onChange(value, event);
  };

  handleFieldBlur = (event: SyntheticEvent<*>) => {
    const { onBlur, name, formValue = {} } = this.props;
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

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  checkErrorFromContext() {
    const { errorFromContext } = this.context;
    const { name, errorMessage } = this.props;

    if (errorMessage) {
      return this.renderError(errorMessage);
    }

    if (errorFromContext) {
      return (
        <FormErrorContext.Consumer>
          {formError => this.renderError(formError[name])}
        </FormErrorContext.Consumer>
      );
    }

    return null;
  }

  renderError = (errorMessage: React.Node) => {
    const { errorPlacement } = this.props;
    const show = !!errorMessage;
    return (
      <ErrorMessage
        show={show}
        className={this.addPrefix('message-wrapper')}
        placement={errorPlacement}
      >
        {errorMessage}
      </ErrorMessage>
    );
  };

  renderValue = () => {
    const { name, accepter: Component, formValue = {}, ...props } = this.props;
    const { formDefaultValue = {} } = this.context;
    const unhandled = getUnhandledProps(FormControl, props);
    return (
      <Component
        {...unhandled}
        name={name}
        onChange={this.handleFieldChange}
        onBlur={this.handleFieldBlur}
        defaultValue={formDefaultValue[name]}
        value={formValue[name]}
      />
    );
  };

  render() {
    return (
      <div className={this.addPrefix('wrapper')}>
        {this.renderValue()}
        {this.checkErrorFromContext()}
      </div>
    );
  }
}

class FormControlWrapper extends React.Component {
  render() {
    return (
      <FormValueContext.Consumer>
        {formValue => <FormControl {...this.props} formValue={formValue} />}
      </FormValueContext.Consumer>
    );
  }
}

const EnhancedFormControl = defaultProps({
  classPrefix: 'form-control'
})(FormControlWrapper);

export default (React.createContext ? EnhancedFormControl : LegacyFormControl);
