import React, { useRef, useCallback, useEffect } from 'react';
import omit from 'lodash/omit';
import { addStyle, getWidth } from 'dom-lib';
import { useElementResize, useClassNames } from '../utils';
import getDOMNode from '../utils/getDOMNode';
import mergeRefs from '../utils/mergeRefs';
import { StandardProps } from '../@types/common';

const omitProps = [
  'placement',
  'shouldUpdatePosition',
  'arrowOffsetLeft',
  'arrowOffsetTop',
  'positionLeft',
  'positionTop',
  'getPositionInstance',
  'getToggleInstance',
  'autoWidth'
];

const resizePlacement = [
  'topStart',
  'topEnd',
  'leftEnd',
  'rightEnd',
  'auto',
  'autoVerticalStart',
  'autoVerticalEnd',
  'autoHorizontalEnd'
];

export interface MenuWrapperProps extends StandardProps {
  placement?: string;
  autoWidth?: boolean;
  children?: React.ReactNode;
  getPositionInstance?: () => any;
  getToggleInstance?: () => any;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const MenuWrapper = React.forwardRef((props: MenuWrapperProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    as: Component = 'div',
    classPrefix = 'picker-menu',
    className,
    placement,
    getPositionInstance,
    getToggleInstance,
    ...rest
  } = props;

  const menuElementRef = useRef();
  const handleResize = useCallback(() => {
    const instance = getPositionInstance?.();
    if (instance && resizePlacement.includes(placement)) {
      instance.updatePosition(true);
    }
  }, [getPositionInstance, placement]);

  useElementResize(() => menuElementRef.current, handleResize);
  useEffect(() => {
    const instance = getToggleInstance?.();
    if (instance?.toggleRef?.current) {
      // Get the width value of the button,
      // and then set it to the menu to make their width consistent.
      const width = getWidth(getDOMNode(instance.toggleRef.current));
      addStyle(menuElementRef.current, 'min-width', `${width}px`);
    }
  }, [getToggleInstance, menuElementRef]);

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  return (
    <Component
      {...omit(rest, omitProps)}
      ref={mergeRefs(menuElementRef, ref)}
      className={classes}
    />
  );
});

MenuWrapper.displayName = 'MenuWrapper';

export default MenuWrapper;
