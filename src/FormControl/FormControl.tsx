import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';

import Input from '../Input';
import ErrorMessage from '../ErrorMessage';
import { getUnhandledProps, defaultProps, prefix } from '../utils';
import { PLACEMENT_8 } from '../constants';
import { FormControlProps } from './FormControl.d';
import FormContext, {
  FormValueContext,
  FormErrorContext,
  FormPlaintextContext
} from '../Form/FormContext';

interface FormControlState {
  checkResult?: any;
  value?: any;
}

class FormControl extends React.Component<FormControlProps, FormControlState> {
  static contextType = FormContext;
  static propTypes = {
    name: PropTypes.string,
    checkTrigger: PropTypes.oneOf(['change', 'blur', 'none']),
    checkAsync: PropTypes.bool,
    accepter: PropTypes.elementType,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    classPrefix: PropTypes.string,
    errorMessage: PropTypes.node,
    errorPlacement: PropTypes.oneOf(PLACEMENT_8),
    formValue: PropTypes.object,
    readOnly: PropTypes.bool,
    plaintext: PropTypes.bool,
    plaintextDefaultValue: PropTypes.node,
    value: PropTypes.any
  };
  static defaultProps = {
    accepter: Input,
    errorPlacement: 'bottomStart',
    plaintextDefaultValue: '--'
  };

  constructor(props: FormControlProps, context: any) {
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

  getValue(props?: FormControlProps) {
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

  handleFieldChange = (value: any, event: React.SyntheticEvent<any>) => {
    const { name, onChange } = this.props;
    const { onFieldChange } = this.context;
    const checkTrigger = this.getCheckTrigger();

    this.setState({ value });
    this.handleFieldCheck(value, checkTrigger === 'change').then(checkResult => {
      this.setState({ checkResult });
    });

    onFieldChange(name, value, event);
    onChange?.(value, event);
  };

  handleFieldBlur = (event: React.SyntheticEvent<any>) => {
    const checkTrigger = this.getCheckTrigger();
    const value = this.getValue() || this.state.value;

    this.handleFieldCheck(value, checkTrigger === 'blur');
    this.props.onBlur?.(event);
  };

  handleFieldCheck = (value: any, isCheckTrigger: boolean, callback?: Function) => {
    const { name, formValue, checkAsync } = this.props;
    const { onFieldError, onFieldSuccess, model } = this.context;

    const callbackEvents = checkResult => {
      if (isCheckTrigger) {
        if (checkResult.hasError) {
          onFieldError(name, checkResult.errorMessage, callback);
        } else {
          onFieldSuccess(name, callback);
        }
      }
      return checkResult;
    };

    if (checkAsync) {
      return model.checkForFieldAsync(name, value, formValue).then(checkResult => {
        return callbackEvents(checkResult);
      });
    }

    return Promise.resolve(callbackEvents(model.checkForField(name, value, formValue)));
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

  renderError = (formError?: any, errorMessage?: React.ReactNode) => {
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

    return (
      <Component
        {...unhandled}
        readOnly={readOnly}
        name={name}
        onChange={this.handleFieldChange}
        onBlur={this.handleFieldBlur}
        defaultValue={formDefaultValue[name]}
        value={value}
      />
    );
  };

  render() {
    const { plaintextDefaultValue } = this.props;
    const readOnly = this.getReadOnly();
    const plaintext = this.getPlaintext();
    const value = this.getValue();
    const classes = classNames(this.addPrefix('wrapper'), {
      'read-only': readOnly,
      plaintext
    });

    if (plaintext && (_.isUndefined(value) || _.isNull(value))) {
      return (
        <div className={classes}>
          <div className={this.addPrefix('default-value')}>{plaintextDefaultValue}</div>
        </div>
      );
    }

    return (
      <div className={classes}>
        <FormPlaintextContext.Provider value={plaintext}>
          {this.renderAccepter()}
        </FormPlaintextContext.Provider>
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

const EnhancedFormControl = defaultProps<FormControlProps>({
  classPrefix: 'form-control'
})(FormControlWrapper);

export default EnhancedFormControl;
