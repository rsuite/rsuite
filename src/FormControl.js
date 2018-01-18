/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import withStyleProps from './utils/withStyleProps';
import { globalKey } from './utils/prefix';

type Props = {
  type?: 'text' | 'email' | 'number' | 'file' | 'select' | 'textarea' | 'password',
  id?: string,
  classPrefix: string,
  className?: string,
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void,
  componentClass: React.ElementType,
  inputRef?: React.Ref<any>,
}

class FormControl extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}form-control`,
    componentClass: 'input',
    type: 'text'
  }

  static contextTypes = {
    formGroup: PropTypes.object
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const target = event.target;
    const { onChange } = this.props;
    onChange && onChange(target.value, event);
  }

  render() {
    const controlId = _.get(this.context, 'formGroup.controlId');
    const {
      type,
      className,
      componentClass: Component,
      inputRef,
      classPrefix,
      id = controlId,
      ...props,
    } = this.props;

    const classes = classNames({
      // input[type="file"] should not have .form-control.
      [classPrefix]: type !== 'file',
    }, className);

    return (
      <Component
        {...props}
        type={type}
        id={id}
        className={classes}
        ref={inputRef}
        onChange={this.handleChange}
      />
    );
  }
}

export default withStyleProps({ hasSize: true })(FormControl);

