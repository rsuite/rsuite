import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getStyle, addStyle } from 'dom-lib';
import _ from 'lodash';

import Transition, { transitionPropTypes } from './Transition';
import createChainedFunction from '../utils/createChainedFunction';
import { CollapseProps } from './Animation.d';

type Dimension = 'height' | 'width';

const triggerBrowserReflow = node => _.get(node, 'offsetHeight');

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function defaultGetDimensionValue(dimension: Dimension, elem: Element): number {
  const value = _.get(elem, `offset${_.capitalize(dimension)}`);
  const margins = MARGINS[dimension];

  return (
    value + parseInt(getStyle(elem, margins[0]), 10) + parseInt(getStyle(elem, margins[1]), 10)
  );
}

function getScrollDimensionValue(elem: Element, dimension: Dimension) {
  const value = _.get(elem, `scroll${_.capitalize(dimension)}`);
  return `${value}px`;
}

class Collapse extends React.Component<CollapseProps> {
  static propTypes = {
    ...transitionPropTypes,
    dimension: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    getDimensionValue: PropTypes.func,
    role: PropTypes.string
  };
  static displayName = 'Collapse';
  static defaultProps = {
    timeout: 300,
    dimension: 'height',
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

  dimension(): Dimension {
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
        {..._.pick(this.props, Object.keys(transitionPropTypes))}
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
