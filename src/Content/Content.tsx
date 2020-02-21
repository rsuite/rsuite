import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';
import { ContentProps } from './Content.d';

class Content extends React.Component<ContentProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string
  };
  render() {
    const { className, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className);
    return <div {...props} className={classes} />;
  }
}

export default defaultProps<ContentProps>({
  classPrefix: 'content'
})(Content);
