import React, { useCallback } from 'react';
import getStyle from 'dom-lib/getStyle';
import addStyle from 'dom-lib/addStyle';
import get from 'lodash/get';
import capitalize from 'lodash/capitalize';
import Transition, { TransitionProps } from './Transition';
import { useClassNames } from '@/internals/hooks';
import { createChainedFunction } from '@/internals/utils';
import { useCustom } from '../CustomProvider';

export enum DIMENSION {
  HEIGHT = 'height',
  WIDTH = 'width'
}

export interface CollapseProps extends TransitionProps {
  /** The dimension used when collapsing */
  dimension?: DIMENSION | (() => DIMENSION);

  /** Function that returns the height or width of the animating DOM node */
  getDimensionValue?: (dimension: DIMENSION, elem: Element) => number;
}

const triggerBrowserReflow = node => get(node, 'offsetHeight');

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function defaultGetDimensionValue(dimension: DIMENSION, elem: HTMLElement): number {
  const value = get(elem, `offset${capitalize(dimension)}`) ?? 0;
  const margins = MARGINS[dimension];

  return (
    value +
    parseInt(getStyle(elem, margins[0]) as string, 10) +
    parseInt(getStyle(elem, margins[1]) as string, 10)
  );
}

function getScrollDimensionValue(elem: Element, dimension: DIMENSION) {
  const value = get(elem, `scroll${capitalize(dimension)}`);
  return `${value}px`;
}

/**
 * A Collapse animation component.
 * @see https://rsuitejs.com/components/animation/#collapse
 */
const Collapse = React.forwardRef((props: CollapseProps, ref: React.Ref<any>) => {
  const { propsWithDefaults } = useCustom('Collapse', props);
  const {
    className,
    timeout = 300,
    dimension: dimensionProp = DIMENSION.HEIGHT,
    exitedClassName,
    exitingClassName,
    enteredClassName,
    enteringClassName,
    getDimensionValue = defaultGetDimensionValue,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    ...rest
  } = propsWithDefaults;

  const { prefix, merge } = useClassNames('anim');
  const dimension = typeof dimensionProp === 'function' ? dimensionProp() : dimensionProp;

  const handleEnter = useCallback(
    (elem: HTMLElement) => {
      addStyle(elem, dimension, 0);
    },
    [dimension]
  );

  const handleEntering = useCallback(
    (elem: HTMLElement) => {
      addStyle(elem, dimension, getScrollDimensionValue(elem, dimension));
    },
    [dimension]
  );

  const handleEntered = useCallback(
    (elem: HTMLElement) => {
      addStyle(elem, dimension, 'auto');
    },
    [dimension]
  );

  const handleExit = useCallback(
    (elem: HTMLElement) => {
      const value = getDimensionValue ? getDimensionValue(dimension, elem) : 0;
      addStyle(elem, dimension, `${value}px`);
    },
    [dimension, getDimensionValue]
  );

  const handleExiting = useCallback(
    (elem: HTMLElement) => {
      triggerBrowserReflow(elem);
      addStyle(elem, dimension, 0);
    },
    [dimension]
  );

  return (
    <Transition
      {...rest}
      ref={ref}
      timeout={timeout}
      className={merge(className, prefix({ 'collapse-horizontal': dimension === 'width' }))}
      exitedClassName={exitedClassName || prefix('collapse')}
      exitingClassName={exitingClassName || prefix('collapsing')}
      enteredClassName={enteredClassName || prefix('collapse', 'in')}
      enteringClassName={enteringClassName || prefix('collapsing')}
      onEnter={createChainedFunction(handleEnter, onEnter)}
      onEntering={createChainedFunction(handleEntering, onEntering)}
      onEntered={createChainedFunction(handleEntered, onEntered)}
      onExit={createChainedFunction(handleExit, onExit)}
      onExiting={createChainedFunction(handleExiting, onExiting)}
    />
  );
});

Collapse.displayName = 'Collapse';

export default Collapse;
