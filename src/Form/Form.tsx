import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { SchemaModel } from 'schema-typed';
import classNames from 'classnames';
import shallowEqual from '../utils/shallowEqual';

import { getUnhandledProps, prefix } from '../utils';
import { defaultClassPrefix } from '../utils/prefix';
import FormContext, { FormValueContext, FormErrorContext } from './FormContext';
import { FormProps } from './Form.d';

interface FormState {
  formError?: any;
  formValue?: any;
}

class Form extends React.Component<FormProps, FormState> {
  static propTypes = {
    className: PropTypes.string,
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline']),
    fluid: PropTypes.bool,
    formValue: PropTypes.object,
    formDefaultValue: PropTypes.object,
    formError: PropTypes.object,
    checkDelay: PropTypes.number,
    checkTrigger: PropTypes.oneOf(['change', 'blur', 'none']),
    onChange: PropTypes.func,
    onError: PropTypes.func,
    onCheck: PropTypes.func,
    onSubmit: PropTypes.func,
    model: PropTypes.object,
    classPrefix: PropTypes.string,
    errorFromContext: PropTypes.bool,
    children: PropTypes.node,
    readOnly: PropTypes.bool,
    plaintext: PropTypes.bool
  };
  static defaultProps = {
    classPrefix: defaultClassPrefix('form'),
    model: SchemaModel({}),
    layout: 'vertical',
    formDefaultValue: {},
    checkDelay: 500,
    checkTrigger: 'change',
    errorFromContext: true
  };

  formContextValue = null;

  constructor(props: FormProps) {
    super(props);
    const { formDefaultValue, formError } = this.props;

    this.state = {
      formError: formError || {},
      formValue: formDefaultValue
    };
  }
  getFormValue = (state: FormState = this.state, props: FormProps = this.props) =>
    _.isUndefined(props.formValue) ? state.formValue : props.formValue;
  getFormError = (state: FormState = this.state, props: FormProps = this.props) =>
    _.isUndefined(props.formError) ? state.formError : props.formError;

  /**
   * public APIs
   */
  check = (callback?: (formError: any) => void) => {
    const formValue = this.getFormValue() || {};
    const { model, onCheck, onError } = this.props;
    const formError = {};
    let errorCount = 0;

    Object.keys(model.schema).forEach(key => {
      const checkResult = model.checkForField(key, formValue[key], formValue);
      if (checkResult.hasError === true) {
        errorCount += 1;
        formError[key] = checkResult.errorMessage;
      }
    });

    this.setState({ formError });

    onCheck?.(formError);
    callback?.(formError);

    if (errorCount > 0) {
      onError?.(formError);
      return false;
    }

    return true;
  };

  /**
   * public APIs
   */
  checkForField = (fieldName: string, callback?: (checkResult: any) => void) => {
    const formValue = this.getFormValue() || {};
    const { model, onCheck, onError } = this.props;
    const checkResult = model.checkForField(fieldName, formValue[fieldName], formValue);
    this.setState((prvState, props) => {
      const formError = {
        ...this.getFormError(prvState, props),
        [fieldName]: checkResult.errorMessage
      };
      onCheck?.(formError);

      if (checkResult.hasError) {
        onError?.(formError);
      }
      return { formError };
    });
    callback?.(checkResult);
    return !checkResult.hasError;
  };

  /**
   * public APIs
   */
  checkAsync = () => {
    const formValue = this.getFormValue() || {};
    const { model, onCheck, onError } = this.props;

    const promises = [];
    const keys = [];

    Object.keys(model.schema).forEach(key => {
      keys.push(key);
      promises.push(model.checkForFieldAsync(key, formValue[key], formValue));
    });

    return Promise.all(promises).then(values => {
      const formError = {};
      let errorCount = 0;

      for (let i = 0; i < values.length; i++) {
        if (values[i].hasError) {
          errorCount += 1;
          formError[keys[i]] = values[i].errorMessage;
        }
      }

      onCheck?.(formError);

      if (errorCount > 0) {
        onError?.(formError);
      }

      this.setState({ formError });

      return { hasError: errorCount > 0, formError };
    });
  };

  /**
   * public APIs
   */
  checkForFieldAsync = (fieldName: string) => {
    const formValue = this.getFormValue() || {};
    const { model, onCheck, onError } = this.props;
    return model
      .checkForFieldAsync(fieldName, formValue[fieldName], formValue)
      .then(checkResult => {
        this.setState((prvState, props) => {
          const formError = {
            ...this.getFormError(prvState, props),
            [fieldName]: checkResult.errorMessage
          };
          onCheck?.(formError);
          if (checkResult.hasError) {
            onError?.(formError);
          }
          return { formError };
        });

        return checkResult;
      });
  };

  /**
   * public APIs
   */
  cleanErrors(callback: () => void) {
    this.setState({ formError: {} }, callback);
  }

  /**
   * public APIs
   */
  cleanErrorForFiled(fieldName: string, callback: () => void) {
    this.setState(
      {
        formError: _.omit(this.state.formError, [fieldName])
      },
      callback
    );
  }

  /**
   * public APIs
   */
  resetErrors(formError: object = {}, callback: () => void) {
    this.setState({ formError }, callback);
  }

  handleFieldError = (name: string, errorMessage: string) => {
    this.setState((prvState, props) => {
      const formError = {
        ...this.getFormError(prvState, props),
        [name]: errorMessage
      };
      this.props.onError?.(formError);
      this.props.onCheck?.(formError);
      return { formError };
    });
  };

  handleFieldSuccess = (name: string) => {
    this.setState((prvState, props) => {
      const formError = _.omit(this.getFormError(prvState, props), [name]);
      this.props.onCheck?.(formError);
      return { formError };
    });
  };

  handleFieldChange = (name: string, value: any, event: React.SyntheticEvent<any>) => {
    const formValue = this.getFormValue();
    const nextFormValue = {
      ...formValue,
      [name]: value
    };
    this.setState({
      formValue: nextFormValue
    });
    this.props.onChange?.(nextFormValue, event);
  };

  getFormContextValue() {
    const {
      formDefaultValue,
      errorFromContext,
      model,
      checkTrigger,
      readOnly,
      plaintext
    } = this.props;
    const nextFormContextValue = {
      model,
      checkTrigger,
      formDefaultValue,
      errorFromContext,
      readOnly,
      plaintext,
      onFieldChange: this.handleFieldChange,
      onFieldError: this.handleFieldError,
      onFieldSuccess: this.handleFieldSuccess
    };

    if (!shallowEqual(nextFormContextValue, this.formContextValue)) {
      this.formContextValue = nextFormContextValue;
    }

    return this.formContextValue;
  }

  checkErrorFromContext(children?: React.ReactNode) {
    const { errorFromContext } = this.props;

    if (errorFromContext) {
      const formError: any = this.getFormError();
      return <FormErrorContext.Provider value={formError}>{children}</FormErrorContext.Provider>;
    }
    return children;
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const checkStatus = this.check();
    this.props.onSubmit?.(checkStatus, event);
  };

  render() {
    const {
      formValue = {},
      layout,
      classPrefix,
      fluid,
      className,
      children,
      ...props
    } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(
      classPrefix,
      className,
      addPrefix(layout),
      addPrefix(fluid && layout === 'vertical' ? 'fluid' : 'fixed-width')
    );
    const unhandled = getUnhandledProps(Form, props);
    const contextDefalutValue: any = this.getFormContextValue();

    return (
      <form onSubmit={this.handleSubmit} {...unhandled} className={classes}>
        <FormContext.Provider value={contextDefalutValue}>
          <FormValueContext.Provider value={formValue}>
            {this.checkErrorFromContext(children)}
          </FormValueContext.Provider>
        </FormContext.Provider>
      </form>
    );
  }
}

export default Form;
