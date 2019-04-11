/* @flow */

import * as React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import Input from './Input';
import ErrorMessage from './ErrorMessage';
import FormContext, { FormValueContext, FormErrorContext } from './FormContext';
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
  formValue?: Object,
  readOnly?: boolean,
  plaintext?: boolean,
  value?: any
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

    const { formDefaultValue = {} } = context;
    const name = props.name;
    this.state = {
      checkResult: {},
      value: this.getValue(props) || formDefaultValue[name]
    };
  }

  getValue(props?: Props) {
    const { formValue, name, value } = props || this.props;

    if (!_.isUndefined(value)) {
      return value;
    }

    if (!formValue) {
      return;
    }

    return formValue[name];
  }

  getCheckTrigger() {
    const { checkTrigger } = this.context;

    return this.props.checkTrigger || checkTrigger;
  }

  getReadOnly() {
    const { readOnly } = this.context;
    if (!_.isUndefined(readOnly)) {
      return readOnly;
    }

    return this.props.readOnly;
  }

  getPlaintext() {
    const { plaintext } = this.context;
    if (!_.isUndefined(plaintext)) {
      return plaintext;
    }
    return this.props.plaintext;
  }

  handleFieldChange = (value: any, event: SyntheticEvent<*>) => {
    const { name, onChange } = this.props;
    const { onFieldChange } = this.context;
    const checkTrigger = this.getCheckTrigger();
    const checkResult = this.handleFieldCheck(value, checkTrigger === 'change');

    this.setState({ checkResult, value });

    onFieldChange(name, value, event);
    onChange && onChange(value, event);
  };

  handleFieldBlur = (event: SyntheticEvent<*>) => {
    const { onBlur } = this.props;
    const checkTrigger = this.getCheckTrigger();
    const value = this.getValue() || this.state.value;

    this.handleFieldCheck(value, checkTrigger === 'blur');
    onBlur && onBlur(event);
  };

  handleFieldCheck = (value: any, isCheckTrigger: boolean, callback?: Function) => {
    const { name, formValue } = this.props;
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
    const { errorMessage } = this.props;

    if (typeof errorMessage !== 'undefined') {
      return this.renderError(undefined, errorMessage);
    }

    if (errorFromContext) {
      return <FormErrorContext.Consumer>{this.renderError}</FormErrorContext.Consumer>;
    }

    return null;
  }

  renderError = (formError?: Object, errorMessage?: React.Node) => {
    const { errorPlacement, name } = this.props;

    if (formError) {
      errorMessage = formError[name];
    }

    return (
      <ErrorMessage
        show={!!errorMessage}
        className={this.addPrefix('message-wrapper')}
        placement={errorPlacement}
      >
        {errorMessage}
      </ErrorMessage>
    );
  };

  renderAccepter = () => {
    const { name, accepter: Component, ...props } = this.props;
    const { formDefaultValue = {} } = this.context;
    const unhandled = getUnhandledProps(FormControl, props);
    const value = this.getValue();
    const readOnly = this.getReadOnly();

    if (_.get(Component, 'defaultProps.componentClass') === 'input' && readOnly) {
      unhandled.readOnly = readOnly;
    }

    return (
      <Component
        {...unhandled}
        name={name}
        onChange={this.handleFieldChange}
        onBlur={this.handleFieldBlur}
        defaultValue={formDefaultValue[name]}
        value={value}
      />
    );
  };

  render() {
    const readOnly = this.getReadOnly();
    const plaintext = this.getPlaintext();
    const classes = classNames(this.addPrefix('wrapper'), {
      'read-only': readOnly,
      plaintext
    });
    return (
      <div className={classes}>
        {this.renderAccepter()}
        {this.checkErrorFromContext()}
      </div>
    );
  }
}

class FormControlWrapper extends React.Component<any> {
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

export default EnhancedFormControl;
