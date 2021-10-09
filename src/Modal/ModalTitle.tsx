import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import type { ComponentProps } from '../utils/createComponent';
import { useClassNames } from '../utils';
import type { RsRefForwardingComponent } from '../@types/common';
import { ModalContext } from './ModalContext';

export type ModalTitleProps = ComponentProps;

const ModalTitle: RsRefForwardingComponent<'h4', ComponentProps> = React.forwardRef(
  (props: ComponentProps, ref) => {
    const { as: Component = 'h4', classPrefix = 'modal-title', className, role, ...rest } = props;
    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

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
  }
);

ModalTitle.displayName = 'Modal.Title';
ModalTitle.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node
};

export default ModalTitle;
