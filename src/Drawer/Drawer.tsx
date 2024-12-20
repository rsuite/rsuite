import React from 'react';
import Slide from '../Animation/Slide';
import Modal, { ModalProps } from '../Modal';
import { TypeAttributes } from '@/internals/types';
import { useClassNames } from '@/internals/hooks';
import { deprecateComponent } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import DrawerBody from './DrawerBody';
import DrawerHeader from './DrawerHeader';
import DrawerActions from './DrawerActions';
import DrawerFooter from './DrawerFooter';
import DrawerTitle from './DrawerTitle';
export interface DrawerProps extends Omit<ModalProps, 'overflow'> {
  /** The placement of Drawer */
  placement?: TypeAttributes.Placement4;

  /** Custom close button */
  closeButton?: React.ReactNode | boolean;
}

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

/**
 * The Drawer component is used to display extra content from a main content.
 * @see https://rsuitejs.com/components/drawer
 */
const Drawer: DrawerComponent = React.forwardRef((props: DrawerProps, ref) => {
  const { propsWithDefaults } = useCustom('Drawer', props);
  const {
    className,
    placement = 'right',
    classPrefix = 'drawer',
    animation = Slide,
    closeButton = true,
    ...rest
  } = propsWithDefaults;

  const { merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, prefix(placement));

  const animationProps = {
    placement
  };

  return (
    <Modal
      {...rest}
      ref={ref}
      overflow={false}
      classPrefix={classPrefix}
      className={classes}
      animation={animation}
      animationProps={animationProps}
      isDrawer={true}
      closeButton={closeButton}
    />
  );
}) as unknown as DrawerComponent;

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

export default Drawer;
