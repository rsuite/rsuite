import React from 'react';
import PropTypes from 'prop-types';
import Slide from '../Animation/Slide';
import Modal, {
  ModalProps,
  ModalBodyProps,
  ModalHeaderProps,
  ModalFooterProps,
  ModalTitleProps
} from '../Modal';
import { TypeAttributes, RsRefForwardingComponent } from '../@types/common';
import { useClassNames } from '../utils';
import deprecateComponent from '../utils/deprecateComponent';

export interface DrawerProps extends ModalProps {
  /** The placement of Drawer */
  placement?: TypeAttributes.Placement4;
}

const defaultProps: Partial<DrawerProps> = {
  classPrefix: 'drawer',
  placement: 'right',
  animation: Slide
};

const DrawerBody: RsRefForwardingComponent<
  'div',
  ModalBodyProps
> = React.forwardRef((props, ref) => <Modal.Body classPrefix="drawer-body" {...props} ref={ref} />);

const DrawerHeader: RsRefForwardingComponent<
  'div',
  ModalHeaderProps
> = React.forwardRef((props, ref) => (
  <Modal.Header classPrefix="drawer-header" {...props} ref={ref} />
));

const DrawerActions: RsRefForwardingComponent<
  'div',
  ModalFooterProps
> = React.forwardRef((props, ref) => (
  <Modal.Footer classPrefix="drawer-actions" {...props} ref={ref} />
));

const DrawerFooter: RsRefForwardingComponent<
  'div',
  ModalFooterProps
> = React.forwardRef((props, ref) => (
  <Modal.Footer classPrefix="drawer-footer" {...props} ref={ref} />
));

const DrawerTitle: RsRefForwardingComponent<
  'div',
  ModalTitleProps
> = React.forwardRef((props, ref) => (
  <Modal.Title classPrefix="drawer-title" {...props} ref={ref} />
));

interface DrawerComponent extends React.FC<DrawerProps> {
  Body: typeof DrawerBody;
  Header: typeof DrawerHeader;
  Actions: typeof DrawerActions;
  Title: typeof DrawerTitle;
  /**
   * @deprecated use <Drawer.Actions> instead
   */
  Footer: typeof DrawerFooter;
}

const Drawer: DrawerComponent = (React.forwardRef((props: DrawerProps, ref) => {
  const { className, placement, classPrefix, ...rest } = props;
  const { merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, prefix(placement));

  const animationProps = {
    placement
  };

  return (
    <Modal
      {...rest}
      ref={ref}
      drawer
      classPrefix={classPrefix}
      className={classes}
      animationProps={animationProps}
    />
  );
}) as unknown) as DrawerComponent;

DrawerBody.displayName = 'DrawerBody';
DrawerHeader.displayName = 'DrawerHeader';
DrawerActions.displayName = 'DrawerActions';
DrawerFooter.displayName = 'DrawerFooter';
DrawerTitle.displayName = 'DrawerTitle';

Drawer.Body = DrawerBody;
Drawer.Header = DrawerHeader;
Drawer.Actions = DrawerActions;
Drawer.Footer = deprecateComponent(
  DrawerFooter,
  '<Drawer.Footer> has been deprecated, use <Drawer.Actions> instead.'
);
Drawer.Title = DrawerTitle;

Drawer.displayName = 'Drawer';
Drawer.defaultProps = defaultProps;
Drawer.propTypes = {
  classPrefix: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  children: PropTypes.node,
  className: PropTypes.string
};

export default Drawer;
