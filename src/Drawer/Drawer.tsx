import React from 'react';
import Slide from '../Animation/Slide';
import Modal, { ModalProps } from '../Modal';
import DrawerBody from './DrawerBody';
import DrawerHeader from './DrawerHeader';
import DrawerActions from './DrawerActions';
import DrawerFooter from './DrawerFooter';
import DrawerTitle from './DrawerTitle';
import { useClassNames } from '@/internals/hooks';
import { forwardRef, deprecateComponent } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import type { PlacementCardinal } from '@/internals/types';

export interface DrawerProps extends Omit<ModalProps, 'overflow'> {
  /** The placement of Drawer */
  placement?: PlacementCardinal;

  /** Custom close button */
  closeButton?: React.ReactNode | boolean;
}

const Subcomponents = {
  Body: DrawerBody,
  Header: DrawerHeader,
  Actions: DrawerActions,
  Title: DrawerTitle,
  /**
   * @deprecated use <Drawer.Actions> instead
   */
  Footer: deprecateComponent(
    DrawerFooter,
    '<Drawer.Footer> has been deprecated, use <Drawer.Actions> instead.'
  )
};

/**
 * The Drawer component is used to display extra content from a main content.
 * @see https://rsuitejs.com/components/drawer
 */
const Drawer = forwardRef<'div', DrawerProps, typeof Subcomponents>((props, ref) => {
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

  const animationProps = { placement };

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
}, Subcomponents);

Drawer.displayName = 'Drawer';

export default Drawer;
