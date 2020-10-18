import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getStyle, addStyle } from 'dom-lib';
import get from 'lodash/get';
import capitalize from 'lodash/capitalize';
import pick from 'lodash/pick';
import Transition, { transitionPropTypes, TransitionProps } from './Transition';
import createChainedFunction from '../utils/createChainedFunction';

export enum DIMENSION {
  HEIGHT = 'height',
  WIDTH = 'width'
}

export interface CollapseProps extends TransitionProps {
  /** The dimension used when collapsing */
  dimension?: DIMENSION | (() => DIMENSION);

  /** Function that returns the height or width of the animating DOM node */
  getDimensionValue?: (dimension: DIMENSION, elem: Element) => number;

  /** ARIA role of collapsible element */
  role?: string;
}

const triggerBrowserReflow = node => get(node, 'offsetHeight');

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function defaultGetDimensionValue(dimension: DIMENSION, elem: Element): number {
  const value = get(elem, `offset${capitalize(dimension)}`);
  const margins = MARGINS[dimension];

  return (
    value + parseInt(getStyle(elem, margins[0]), 10) + parseInt(getStyle(elem, margins[1]), 10)
  );
}

function getScrollDimensionValue(elem: Element, dimension: DIMENSION) {
  const value = get(elem, `scroll${capitalize(dimension)}`);
  return `${value}px`;
}

class Collapse extends React.Component<CollapseProps> {
  static propTypes = {
    ...transitionPropTypes,
    dimension: PropTypes.any,
    getDimensionValue: PropTypes.func,
    role: PropTypes.string
  };
  static displayName = 'Collapse';
  static defaultProps = {
    timeout: 300,
    dimension: DIMENSION.HEIGHT,
    exitedClassName: 'collapse',
    exitingClassName: 'collapsing',
    enteredClassName: 'collapse in',
    enteringClassName: 'collapsing',
    getDimensionValue: defaultGetDimensionValue
  };

  transitionRef: React.RefObject<any>;

  constructor(props) {
    super(props);
    this.transitionRef = React.createRef();
  }

  // for testing
  getTransitionInstance() {
    return this.transitionRef.current;
  }

  handleEnter = (elem: Element) => {
    const dimension = this.dimension();
    addStyle(elem, dimension, 0);
  };

  handleEntering = (elem: Element) => {
    const dimension = this.dimension();
    addStyle(elem, dimension, getScrollDimensionValue(elem, dimension));
  };

  handleEntered = (elem: Element) => {
    const dimension = this.dimension();
    addStyle(elem, dimension, 'auto');
  };

  handleExit = (elem: Element) => {
    const dimension = this.dimension();
    const { getDimensionValue } = this.props;
    const value = getDimensionValue ? getDimensionValue(dimension, elem) : 0;
    addStyle(elem, dimension, `${value}px`);
  };

  handleExiting = (elem: Element) => {
    const dimension = this.dimension();
    triggerBrowserReflow(elem);
    addStyle(elem, dimension, 0);
  };

  dimension(): DIMENSION {
    const { dimension } = this.props;

    return typeof dimension === 'function' ? dimension() : dimension;
  }

  render() {
    const {
      role,
      className,
      onExited,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting
    } = this.props;

    const enterEventHandler = createChainedFunction(this.handleEnter, onEnter);
    const enteringEventHandler = createChainedFunction(this.handleEntering, onEntering);
    const enteredEventHandler = createChainedFunction(this.handleEntered, onEntered);
    const exitEventHandler = createChainedFunction(this.handleExit, onExit);
    const exitingEventHandler = createChainedFunction(this.handleExiting, onExiting);

    return (
      <Transition
        {...pick(this.props, Object.keys(transitionPropTypes))}
        ref={this.transitionRef}
        aria-expanded={role ? this.props.in : null}
        className={classNames(className, { width: this.dimension() === 'width' })}
        onEnter={enterEventHandler}
        onEntering={enteringEventHandler}
        onEntered={enteredEventHandler}
        onExit={exitEventHandler}
        onExiting={exitingEventHandler}
        onExited={onExited}
      />
    );
  }
}

export default Collapse;
