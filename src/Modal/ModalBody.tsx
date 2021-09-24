import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { ModalContext } from './Modal';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import IconButton from '../IconButton';
import Close from '@rsuite/icons/Close';

export type ModalBodyProps = WithAsProps;

const defaultProps: Partial<ModalBodyProps> = {
  as: 'div',
  classPrefix: 'modal-body'
};

const ModalBody: RsRefForwardingComponent<'div', ModalBodyProps> = React.forwardRef(
  (props: ModalBodyProps, ref) => {
    const { as: Component, classPrefix, className, style, children, ...rest } = props;
    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <ModalContext.Consumer>
        {context => {
          const bodyStyles = context?.getBodyStyles?.();
          return (
            <Component {...rest} ref={ref} style={{ ...bodyStyles, ...style }} className={classes}>
              {context?.isDrawer && (
                <IconButton
                  icon={<Close />}
                  appearance="subtle"
                  size="sm"
                  className={prefix('close')}
                  onClick={context?.onModalClose}
                />
              )}
              {children}
            </Component>
          );
        }}
      </ModalContext.Consumer>
    );
  }
);

ModalBody.displayName = 'ModalBody';
ModalBody.defaultProps = defaultProps;
ModalBody.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string
};

export default ModalBody;
