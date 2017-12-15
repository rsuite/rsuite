/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import withStyleProps from './utils/withStyleProps';
import createComponent from './utils/createComponent';
import prefix from './utils/prefix';

type Props = {
  type?: 'text' | 'email' | 'number' | 'file' | 'select' | 'textarea' | 'password',
  id?: string,
  classPrefix?: string,
  className?: string,
  onChange?: (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void,
  inputRef?: React.Ref<any>,
}


const Component = createComponent('input');

class FormControl extends React.Component<Props> {

  static defaultProps = {
    classPrefix: 'form',
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
    const controlId = get(this.context, 'formGroup.controlId');
    const {
      type,
      className,
      inputRef,
      classPrefix,
      id = controlId,
      ...props,
    } = this.props;

    const addPrefix: Function = prefix(classPrefix);

    let classes = classNames({
      // input[type="file"] should not have .form-control.
      [addPrefix('control')]: type !== 'file',
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

export default withStyleProps({
  hasSize: true,
})(FormControl);

