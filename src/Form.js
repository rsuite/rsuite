/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { SchemaModel, Schema } from 'rsuite-schema';
import classNames from 'classnames';

import { getUnhandledProps, prefix } from './utils';
import { defaultClassPrefix } from './utils/prefix';

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
  classPrefix: string
};

type State = {
  formError?: Object,
  formValue?: Object
};

class Form extends React.Component<Props, State> {
  static defaultProps = {
    classPrefix: defaultClassPrefix('form'),
    model: SchemaModel({}),
    layout: 'vertical',
    formDefaultValue: {},
    checkDelay: 500,
    checkTrigger: 'change'
  };

  static childContextTypes = {
    form: PropTypes.object.isRequired
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      formError: props.formError || {},
      formValue: props.formDefaultValue
    };
  }
  getChildContext() {
    const { formDefaultValue, formValue, model, checkTrigger } = this.props;
    const formError = this.getFormError();
    return {
      form: {
        onFieldChange: this.handleFieldChange,
        onFieldError: this.handleFieldError,
        onFieldSuccess: this.handleFieldSuccess,
        checkTrigger,
        formValue,
        formDefaultValue,
        formError,
        model
      }
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
  check = (callback: (formError: Object) => void) => {
    const formValue = this.getFormValue() || {};
    const { model, onCheck, onError } = this.props;
    const formError = {};
    let errorCount = 0;

    Object.keys(model.schema).forEach(key => {
      const checkResult = model.checkForField(key, formValue[key]);
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

  render() {
    const { layout, classPrefix, fluid, className, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(
      classPrefix,
      addPrefix(layout),
      className,
      addPrefix(fluid && layout === 'vertical' ? 'fluid' : 'fixed-width')
    );
    const unhandled = getUnhandledProps(Form, props);

    return <form {...unhandled} onSubmit={e => e.preventDefault()} className={classes} />;
  }
}

export default Form;
