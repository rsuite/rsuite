import React, { useRef, useMemo } from 'react';
import contains from 'dom-lib/contains';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { getStarStatus } from './utils';
import { useStyles, useEventCallback } from '@/internals/hooks';
import type { StarStatus } from './types';
interface CharacterProps extends BoxProps {
  vertical?: boolean;
  status?: StarStatus;
  disabled?: boolean;
  onMouseMove?: (key: 'before' | 'after', event: React.MouseEvent) => void;
  onClick?: (key: 'before' | 'after', event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const getKey = (element: HTMLElement | null, target: EventTarget | null): 'before' | 'after' => {
  return element && target && contains(element, target as HTMLElement) ? 'before' : 'after';
};

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
      onKeyDown,
      onMouseMove: handleMouseMove
    };
  }, [disabled, handleClick, onKeyDown, handleMouseMove]);

  return (
    <Box
      as={as}
      ref={ref}
      className={merge(className, withPrefix())}
      tabIndex={disabled ? -1 : 0}
      data-status={getStarStatus(status)}
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
