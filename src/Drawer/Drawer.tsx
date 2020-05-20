import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Slide from '../Animation/Slide';
import Modal from '../Modal/Modal';

import { prefix, defaultProps } from '../utils';
import { DrawerProps } from './Drawer.d';

class Drawer extends React.Component<DrawerProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    show: PropTypes.bool,
    full: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string
  };
  static defaultProps = {
    placement: 'right'
  };

  render() {
    const { show, full, className, placement, classPrefix, ...props } = this.props;
    const addPrefix: Function = prefix(classPrefix);
    const classes = classNames(addPrefix(placement), className, {
      [addPrefix('full')]: full
    });

    const animationProps = {
      placement
    };

    return (
      <Modal
        {...props}
        drawer
        classPrefix={classPrefix}
        className={classes}
        show={show}
        animation={Slide}
        animationProps={animationProps}
      />
    );
  }
}

const EnhancedDrawer = defaultProps<DrawerProps>({
  classPrefix: 'drawer'
})(Drawer);

export default EnhancedDrawer;
