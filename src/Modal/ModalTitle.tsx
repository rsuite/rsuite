import React, { useContext } from 'react';
import { ModalContext } from './ModalContext';
import { useStyles } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import type { ComponentProps } from '@/internals/utils';

export type ModalTitleProps = ComponentProps;

const ModalTitle = forwardRef<'h4', ComponentProps>((props, ref) => {
  const { as: Component = 'h4', classPrefix = 'modal-title', className, role, ...rest } = props;
  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  const context = useContext(ModalContext);

  return (
    <Component
      id={context ? `${context.dialogId}-title` : undefined}
      {...rest}
      role={role}
      ref={ref}
      className={classes}
    />
  );
});

ModalTitle.displayName = 'Modal.Title';

export default ModalTitle;
