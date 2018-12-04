/* @flow */

import * as React from 'react';
import _ from 'lodash';
import { SchemaModel, Schema } from 'schema-typed';
import classNames from 'classnames';
import { shallowEqual } from 'rsuite-utils/lib/utils';

import { getUnhandledProps, prefix } from './utils';
import { defaultClassPrefix } from './utils/prefix';
import FormContext, { FormValueContext, FormErrorContext } from './FormContext';
import LegacyForm from './_legacy/Form';

type Props = {
  className?: string,
  layout?: 'horizontal' | 'vertical' | 'inline',
  fluid?: boolean,
  formValue?: Object,
  formDefaultValue?: Object,
  formError?: Object,
  checkDelay?: number,
  checkTrigger?: 'change' | 'blur' | 'none',
  onChange?: (formValue: Object, event: SyntheticEvent<*>) => void,
  onError?: (formError: Object) => void,
  onCheck?: (formError: Object) => void,
  model: typeof Schema,
  classPrefix: string,
  errorFromContext?: boolean,
  children?: React.Node
};

type State = {
  formError?: Object,
  formValue?: Object
};

function preventDefaultEvent(event) {
  event.preventDefault();
}

class Form extends React.Component<Props, State> {
  formContextValue = null;
  static defaultProps = {
    classPrefix: defaultClassPrefix('form'),
    model: SchemaModel({}),
    layout: 'vertical',
    formDefaultValue: {},
    checkDelay: 500,
    checkTrigger: 'change',
    errorFromContext: true
  };

  constructor(props: Props) {
    super(props);

    const {
      formDefaultValue,
      formError,
      formValue,
      model,
      checkTrigger,
      errorFromContext
    } = this.props;

    this.state = {
      formError: formError || {},
      formValue: formDefaultValue
    };
  }
  getFormValue() {
    const { formValue } = this.props;
    return _.isUndefined(formValue) ? this.state.formValue : formValue;
  }

  getFormError() {
    const { formError } = this.props;
    return _.isUndefined(formError) ? this.state.formError : formError;
  }

  /**
   * public APIs
   */
  check = (callback?: (formError: Object) => void) => {
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

    onCheck && onCheck(formError);
    callback && callback(formError);

    if (errorCount > 0) {
      onError && onError(formError);
      return false;
    }

    return true;
  };

  /**
   * public APIs
   */
  checkForField = (fieldName: string, callback?: (checkResult: Object) => void) => {
    const formValue = this.getFormValue() || {};
    const { model, onCheck, onError } = this.props;
    const checkResult = model.checkForField(fieldName, formValue[fieldName], formValue);

    const formError = {
      ...this.getFormError(),
      [fieldName]: checkResult.errorMessage
    };

    this.setState({ formError });

    onCheck && onCheck(formError);
    callback && callback(checkResult);

    if (checkResult.hasError) {
      onError && onError(formError);
      return false;
    }

    return true;
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
  resetErrors(formError: Object = {}, callback: () => void) {
    this.setState({ formError }, callback);
  }

  handleFieldError = (name: string, errorMessage: string) => {
    const { onError, onCheck } = this.props;
    const formError = {
      ...this.state.formError,
      [name]: errorMessage
    };

    this.setState({ formError }, () => {
      onError && onError(formError);
      onCheck && onCheck(formError);
    });
  };

  handleFieldSuccess = (name: string) => {
    const { onCheck } = this.props;
    const formError = _.omit(this.state.formError, [name]);
    this.setState({ formError }, () => {
      onCheck && onCheck(formError);
    });
  };

  handleFieldChange = (name: string, value: any, event: SyntheticEvent<*>) => {
    const { onChange } = this.props;
    const formValue = this.getFormValue();
    const nextFormValue = {
      ...formValue,
      [name]: value
    };
    this.setState({
      formValue: nextFormValue
    });
    onChange && onChange(nextFormValue, event);
  };

  getFormContextValue() {
    const { formDefaultValue, errorFromContext, model, checkTrigger } = this.props;
    const nextFormContextValue = {
      model,
      checkTrigger,
      formDefaultValue,
      errorFromContext,
      onFieldChange: this.handleFieldChange,
      onFieldError: this.handleFieldError,
      onFieldSuccess: this.handleFieldSuccess
    };

    if (!shallowEqual(nextFormContextValue, this.formContextValue)) {
      this.formContextValue = nextFormContextValue;
    }

    return this.formContextValue;
  }

  checkErrorFromContext(children?: React.Node) {
    const { errorFromContext } = this.props;

    if (errorFromContext) {
      const formError: any = this.getFormError();
      return <FormErrorContext.Provider value={formError}>{children}</FormErrorContext.Provider>;
    }
    return children;
  }

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
      <form {...unhandled} onSubmit={preventDefaultEvent} className={classes}>
        <FormContext.Provider value={contextDefalutValue}>
          <FormValueContext.Provider value={formValue}>
            {this.checkErrorFromContext(children)}
          </FormValueContext.Provider>
        </FormContext.Provider>
      </form>
    );
  }
}

export default (React.createContext ? Form : LegacyForm);
