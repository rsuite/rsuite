import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import Button from '../Button';
import { prefix, defaultProps } from '../utils';
import { IconButtonProps } from './IconButton.d';

class IconButton extends React.Component<IconButtonProps> {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.object,
    classPrefix: PropTypes.string,
    circle: PropTypes.bool,
    children: PropTypes.node,
    placement: PropTypes.oneOf(['left', 'right'])
  };
  static defaultProps = {
    placement: 'left'
  };
  render() {
    const { icon, placement, children, circle, classPrefix, className, ...props } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, addPrefix(`placement-${placement}`), {
      [addPrefix('circle')]: circle,
      [addPrefix('with-text')]: !_.isUndefined(children)
    });

    return (
      <Button {...props} className={classes}>
        {icon}
        {children}
      </Button>
    );
  }
}

export default defaultProps<IconButtonProps>({
  classPrefix: 'btn-icon'
})(IconButton);
