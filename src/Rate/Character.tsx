import React, { useRef } from 'react';
import contains from 'dom-lib/contains';
import isNil from 'lodash/isNil';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles, useEventCallback } from '@/internals/hooks';

const characterStatus = {
  [0]: 'empty',
  [0.5]: 'half',
  [1]: 'full'
};

interface CharacterProps extends BoxProps {
  vertical?: boolean;
  status?: 0 | 0.5 | 1;
  disabled?: boolean;
  onMouseMove?: (key, event: React.MouseEvent) => void;
  onClick?: (key, event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const getKey = (a, b) => (contains(a, b) ? 'before' : 'after');

const Character = forwardRef<'li', CharacterProps>((props, ref) => {
  const {
    as = 'li',
    classPrefix = 'rate-character',
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

  const { merge, prefix, withPrefix } = useStyles(classPrefix);
  const beforeRef = useRef<HTMLDivElement>(null);
  const classes = merge(className, withPrefix(!isNil(status) && characterStatus[status]));

  const handleMouseMove = useEventCallback((event: React.MouseEvent) => {
    onMouseMove?.(getKey(beforeRef.current, event.target), event);
  });

  const handleClick = useEventCallback((event: React.MouseEvent) => {
    onClick?.(getKey(beforeRef.current, event.target), event);
  });

  return (
    <Box
      as={as}
      ref={ref}
      className={classes}
      tabIndex={0}
      onClick={disabled ? null : handleClick}
      onKeyDown={disabled ? null : onKeyDown}
      onMouseMove={disabled ? null : handleMouseMove}
      {...rest}
    >
      <div ref={beforeRef} className={prefix('before', { vertical })}>
        {children}
      </div>
      <div className={prefix('after')}>{children}</div>
    </Box>
  );
});

Character.displayName = 'Character';

export default Character;
