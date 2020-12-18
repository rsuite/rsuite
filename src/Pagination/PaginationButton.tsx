import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import SafeAnchor from '../SafeAnchor';
import Ripple from '../Ripple';
import { useClassNames, createChainedFunction } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface PaginationButtonProps
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  /** The value of the current option */
  eventKey?: number | string;

  /** Called when the button is clicked. */
  onClick?: React.MouseEventHandler;

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** A button can show it is currently the active user selection */
  active?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: number | string, event: React.MouseEvent) => void;
}

const defaultProps: Partial<PaginationButtonProps> = {
  classPrefix: 'pagination-btn',
  as: SafeAnchor
};

const PaginationButton: RsRefForwardingComponent<'a', PaginationButtonProps> = React.forwardRef(
  (props: PaginationButtonProps, ref) => {
    const {
      as: Component,
      active,
      disabled,
      className,
      classPrefix,
      children,
      eventKey,
      style,
      onSelect,
      onClick,
      ...rest
    } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ active, disabled }));

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        if (disabled) {
          return;
        }
        onSelect?.(eventKey, event);
      },
      [disabled, eventKey, onSelect]
    );

    return (
      <Component
        {...rest}
        disabled={disabled}
        onClick={createChainedFunction(onClick, handleClick)}
        active={Component !== SafeAnchor && typeof Component !== 'string' ? active : undefined}
        ref={ref}
        className={classes}
        style={style}
      >
        {children}
        {!disabled ? <Ripple /> : null}
      </Component>
    );
  }
);

PaginationButton.displayName = 'PaginationButton';
PaginationButton.defaultProps = defaultProps;
PaginationButton.propTypes = {
  classPrefix: PropTypes.string,
  eventKey: PropTypes.any,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  className: PropTypes.string,
  as: PropTypes.elementType,
  children: PropTypes.node,
  style: PropTypes.object,
  renderItem: PropTypes.func
};

export default PaginationButton;
