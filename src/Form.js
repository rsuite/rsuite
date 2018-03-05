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
  values?: Object,
  defaultValues?: Object,
  errors?: Object,
  checkDelay?: number,
  checkTrigger?: 'change' | 'blur' | 'none',
  onChange?: (values: Object, event: SyntheticEvent<*>) => void,
  onError?: (errors: Object) => void,
  onCheck?: (errors: Object) => void,
  model: typeof Schema,
  classPrefix: string
};

type State = {
  errors?: Object,
  values?: Object
};

class Form extends React.Component<Props, State> {
  static defaultProps = {
    classPrefix: defaultClassPrefix('form'),
    model: SchemaModel({}),
    layout: 'vertical',
    defaultValues: {},
    checkDelay: 500,
    checkTrigger: 'change'
  };

  static childContextTypes = {
    form: PropTypes.object.isRequired
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      errors: props.errors || {},
      /**
       * 把当前 values 维护到 state 中，主要为 Form 中的 check 方法
       * 默认会设置 props.values ，
       * 如果还是没有的话就默认为 {}
       */
      values: props.values || {}
    };
  }
  getChildContext() {
    const { defaultValues, model, checkTrigger } = this.props;
    const { errors, values } = this.state;
    return {
      form: {
        onFieldChange: this.handleFieldChange,
        onFieldError: this.handleFieldError,
        onFieldSuccess: this.handleFieldSuccess,
        checkTrigger,
        values,
        defaultValues,
        errors,
        model
      }
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!_.isEqual(nextProps.errors, this.props.errors)) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (!_.isEqual(nextProps.values, this.props.values)) {
      this.setState({
        values: nextProps.values
      });
    }
  }
  /**
   * public APIs
   */
  check = (callback: (errors: Object) => void) => {
    const { values } = this.state;
    const { defaultValues, model, onCheck, onError } = this.props;
    const errors = {};
    let errorCount = 0;

    const nextValues = Object.assign({}, defaultValues, values);
    Object.keys(model.schema).forEach(key => {
      const checkResult = model.checkForField(key, nextValues[key]);

      if (checkResult.hasError === true) {
        errorCount += 1;
        errors[key] = checkResult.errorMessage;
      }
    });

    this.setState({ errors });
    onCheck && onCheck(errors);
    callback && callback(errors);
    if (errorCount > 0) {
      onError && onError(errors);
      return false;
    }

    return true;
  };

  /**
   * public APIs
   */
  cleanErrors(callback: () => void) {
    this.setState({ errors: {} }, callback);
  }

  /**
   * public APIs
   */
  resetErrors(errors: Object = {}, callback: () => void) {
    this.setState({ errors }, callback);
  }

  handleFieldError = (name: string, error: string) => {
    const { onError, onCheck } = this.props;
    const errors = Object.assign({}, this.state.errors, {
      [name]: error
    });

    this.setState({ errors }, () => {
      onError && onError(errors);
      onCheck && onCheck(errors);
    });
  };

  handleFieldSuccess = (name: string) => {
    const { onCheck } = this.props;
    const errors = Object.assign({}, this.state.errors, {
      [name]: null
    });
    this.setState({ errors }, () => {
      onCheck && onCheck(errors);
    });
  };

  handleFieldChange = (name: string, value: any, event: SyntheticEvent<*>) => {
    const { onChange, defaultValues } = this.props;
    const values = Object.assign({}, this.state.values, defaultValues, {
      [name]: value
    });
    onChange && onChange(values, event);
  };

  render() {
    const { layout, classPrefix, className, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const clesses = classNames(classPrefix, addPrefix(layout), className);
    const unhandled = getUnhandledProps(Form, props);

    return <form {...unhandled} onSubmit={e => e.preventDefault()} className={clesses} />;
  }
}

export default Form;
