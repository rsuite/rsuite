import React, { useRef, useMemo } from 'react';
import contains from 'dom-lib/contains';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles, useEventCallback } from '@/internals/hooks';

const characterStatus = {
  [0]: 'empty',
  [0.5]: 'half',
  [1]: 'full'
};

function getStatus(status?: 0 | 0.5 | 1 | number) {
  if (typeof status === 'number') {
    return characterStatus[status] || 'frac';
  }
  return null;
}

interface CharacterProps extends BoxProps {
  vertical?: boolean;
  status?: 0 | 0.5 | 1 | number;
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

  const { prefix, withPrefix, merge } = useStyles(classPrefix);
  const beforeRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useEventCallback((event: React.MouseEvent) => {
    onMouseMove?.(getKey(beforeRef.current, event.target), event);
  });

  const handleClick = useEventCallback((event: React.MouseEvent) => {
    onClick?.(getKey(beforeRef.current, event.target), event);
  });

  const eventHandlers = useMemo(() => {
    if (disabled) {
      return null;
    }
    return {
      onClick: handleClick,
      onKeyDown: onKeyDown,
      onMouseMove: handleMouseMove
    };
  }, [disabled, handleClick, onKeyDown, handleMouseMove]);

  return (
    <Box
      as={as}
      ref={ref}
      className={merge(className, withPrefix())}
      tabIndex={0}
      data-status={getStatus(status)}
      {...eventHandlers}
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
