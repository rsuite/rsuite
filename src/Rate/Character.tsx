import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import helper from '../DOMHelper';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

const characterStatus = {
  [0]: 'empty',
  [0.5]: 'half',
  [1]: 'full'
};

interface CharacterProps extends WithAsProps {
  vertical?: boolean;
  status?: 0 | 0.5 | 1;
  disabled?: boolean;
  onMouseMove?: (key, event: React.MouseEvent) => void;
  onClick?: (key, event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const defaultProps: Partial<CharacterProps> = {
  as: 'li',
  classPrefix: 'rate-character'
};

const getKey = (a, b) => (helper.contains(a, b) ? 'before' : 'after');

const Character: RsRefForwardingComponent<'li', CharacterProps> = React.forwardRef(
  (props: CharacterProps, ref) => {
    const {
      as: Component,
      classPrefix,
      className,
      children,
      vertical,
      status,
      disabled,
      onClick,
      onKeyDown,
      onMouseMove,
      ...rest
    } = props;

    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
    const beforeRef = useRef<HTMLDivElement>();
    const classes = merge(className, withClassPrefix(characterStatus[status]));

    const handleMouseMove = useCallback(
      (event: React.MouseEvent) => {
        onMouseMove?.(getKey(beforeRef.current, event.target), event);
      },
      [onMouseMove]
    );

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        onClick?.(getKey(beforeRef.current, event.target), event);
      },
      [onClick]
    );

    return (
      <Component
        {...rest}
        ref={ref}
        className={classes}
        tabIndex={0}
        onClick={disabled ? null : handleClick}
        onKeyDown={disabled ? null : onKeyDown}
        onMouseMove={disabled ? null : handleMouseMove}
      >
        <div ref={beforeRef} className={prefix('before', { vertical })}>
          {children}
        </div>
        <div className={prefix('after')}>{children}</div>
      </Component>
    );
  }
);

Character.displayName = 'Character';
Character.defaultProps = defaultProps;
Character.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  vertical: PropTypes.bool,
  status: PropTypes.number,
  disabled: PropTypes.bool,
  onMouseMove: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func
};

export default Character;
