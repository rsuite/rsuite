/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { SchemaModel, Schema } from 'rsuite-schema';
import classNames from 'classnames';
import getUnhandledProps from './utils/getUnhandledProps';

type Props = {
  className?: string,
  horizontal?: boolean,
  inline?: boolean,
  values?: Object,
  defaultValues?: Object,
  errors?: Object,
  model?: typeof Schema,
  checkDelay?: number,
  checkTrigger?: 'change' | 'blur' | null,
  onChange?: (values: Object, event: SyntheticEvent<*>) => void,
  onError?: (errors: Object) => void,
  onCheck?: (errors: Object) => void,
}

type State = {
  errors?: Object,
  values?: Object
}

class Form extends React.Component<Props, State> {

  static defaultProps = {
    model: SchemaModel({}),
    horizontal: false,
    inline: false,
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
   * 校验表单数据是否合法
   * 该方法主要提供给 Form ref 时候调用
   * return  true/false
   */
  check = (callback: (errors: Object) => void) => {
    const { values } = this.state;
    const { defaultValues, model, onCheck, onError } = this.props;
    const errors = {};
    let errorCount = 0;

    const nextValues = Object.assign({}, defaultValues, values);
    Object.keys(model.schema).forEach((key) => {
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
  }

  cleanErrors(callback: () => void) {
    this.setState({ errors: {} }, callback);
  }

  resetErrors(errors: Object = {}, callback: () => void) {
    this.setState({ errors }, callback);
  }

  /**
   * 验证，出现错误的回调函数
   */
  handleFieldError = (name: string, error: string) => {


    const { onError, onCheck } = this.props;
    const errors = Object.assign({}, this.state.errors, {
      [name]: error
    });

    this.setState({ errors }, () => {
      onError && onError(errors);
      onCheck && onCheck(errors);
    });
  }

  /**
   * 验证通过的回调函数
   */
  handleFieldSuccess = (name: string) => {
    const { onCheck } = this.props;
    const errors = Object.assign({}, this.state.errors, {
      [name]: null
    });
    this.setState({ errors }, () => {
      onCheck && onCheck(errors);
    });
  }

  /**
   * 每一次 字段数据更新回调函数
   */
  handleFieldChange = (name: string, value: any, event: SyntheticEvent<*>) => {
    const { onChange, defaultValues } = this.props;
    const values = Object.assign({}, this.state.values, defaultValues, {
      [name]: value
    });
    onChange && onChange(values, event);
  }

  render() {

    const {
      horizontal,
      inline,
      className,
      ...props
    } = this.props;

    const clesses = classNames('form', {
      'form-horizontal': horizontal,
      'form-inline': inline
    }, className);

    const unhandled = getUnhandledProps(Form, props);

    return (
      <form
        {...unhandled}
        onSubmit={e => e.preventDefault()}
        className={clesses}
      />
    );
  }
}

export default Form;
