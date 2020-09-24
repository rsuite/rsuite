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
  eventKey?: any;

  /** Called when the button is clicked. */
  onClick?: React.MouseEventHandler;

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** A button can show it is currently the active user selection */
  active?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** You can use a custom element for this link */
  linkAs?: React.ElementType | string;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: any, event: React.MouseEvent) => void;

  /** Custom rendering item */
  renderItem?: (item: React.ReactNode) => React.ReactNode;
}

const PaginationButton: RsRefForwardingComponent<'li', PaginationButtonProps> = React.forwardRef(
  (props: PaginationButtonProps, ref) => {
    const {
      as: Component,
      linkAs: Link,
      active,
      disabled,
      className,
      classPrefix,
      children,
      eventKey,
      style,
      onSelect,
      onClick,
      renderItem,
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

    const item = (
      <Link
        {...rest}
        disabled={disabled}
        onClick={createChainedFunction(onClick, handleClick)}
        active={Link !== SafeAnchor && typeof Link !== 'string' ? active : undefined}
      >
        {children}
        <Ripple />
      </Link>
    );

    return (
      <Component ref={ref} className={classes} style={style}>
        {renderItem ? renderItem(item) : item}
      </Component>
    );
  }
);

PaginationButton.displayName = 'PaginationButton';
PaginationButton.defaultProps = {
  classPrefix: 'pagination-btn',
  linkAs: SafeAnchor,
  as: 'li'
};
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
