import * as React from 'react';
import classNames from 'classnames';
import { prefix, defaultClassPrefix } from '../utils';
import { contains } from 'dom-lib';

const characterStatus = {
  [0]: 'empty',
  [0.5]: 'half',
  [1]: 'full'
};

interface CharacterProps {
  children?: React.ReactNode;
  vertical?: boolean;
  status?: number;
  disabled?: boolean;
  onMouseMove?: (key, event: React.MouseEvent) => void;
  onClick?: (key, event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const getKey = (a, b) => (contains(a, b) ? 'before' : 'after');

const Character = React.forwardRef(
  (
    {
      children,
      vertical,
      onClick,
      onKeyDown,
      status,
      disabled,
      onMouseMove,
      ...rest
    }: CharacterProps,
    ref: React.Ref<any>
  ) => {
    const classPrefix = defaultClassPrefix('rate-character');
    const addPrefix = prefix(classPrefix);
    const beforeRef = React.createRef<HTMLDivElement>();

    const handleMouseMove = (event: React.MouseEvent) => {
      onMouseMove?.(getKey(beforeRef.current, event.target), event);
    };

    const handleClick = (event: React.MouseEvent) => {
      onClick?.(getKey(beforeRef.current, event.target), event);
    };

    return (
      <li
        {...rest}
        ref={ref}
        tabIndex={0}
        onClick={disabled ? null : handleClick}
        onKeyDown={disabled ? null : onKeyDown}
        onMouseMove={disabled ? null : handleMouseMove}
        className={classNames(classPrefix, addPrefix(characterStatus[status]))}
      >
        <div
          ref={beforeRef}
          className={classNames(addPrefix('before'), { [addPrefix('vertical')]: vertical })}
        >
          {children}
        </div>
        <div className={addPrefix('after')}>{children}</div>
      </li>
    );
  }
);

Character.displayName = 'Character';

export default Character;
