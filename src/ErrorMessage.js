// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { defaultProps, prefix } from './utils';

type Props = {
  className?: string,
  htmlFor?: string,
  show?: boolean,
  classPrefix: string,
  children: React.Node
};

class ErrorMessage extends React.Component<Props> {
  static contextTypes = {
    formGroup: PropTypes.object
  };

  render() {
    const controlId = _.get(this.context, 'formGroup.controlId');
    const { className, htmlFor = controlId, show, classPrefix, children, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('show')]: show
    });

    return (
      <div {...props} className={classes} htmlFor={htmlFor}>
        <span className={addPrefix('arrow')} />
        <span className={addPrefix('inner')}>{children}</span>
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'error-message'
})(ErrorMessage);
