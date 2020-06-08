import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { prefix, getUnhandledProps, defaultProps, createChainedFunction } from '../utils';
import DefaultToggleButton from './DefaultToggleButton';

export interface PickerToggleProps {
  classPrefix?: string;
  hasValue?: boolean;
  cleanable?: boolean;
  className?: string;
  children?: React.ReactNode;
  caret?: boolean;
  componentClass: React.ElementType;
  onClean?: (event: React.MouseEvent) => void;
  active?: boolean;
  tabIndex: number;
}

interface PickerToggleState {
  active?: boolean;
}

class PickerToggle extends React.Component<PickerToggleProps, PickerToggleState> {
  static propTypes = {
    classPrefix: PropTypes.string,
    hasValue: PropTypes.bool,
    cleanable: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    caret: PropTypes.bool,
    componentClass: PropTypes.elementType,
    onClean: PropTypes.func,
    active: PropTypes.bool
  };

  static defaultProps = {
    componentClass: DefaultToggleButton,
    tabIndex: 0,
    caret: true
  };

  toggleRef: React.RefObject<any>;

  constructor(props: PickerToggleProps) {
    super(props);
    this.state = {
      active: false
    };

    this.toggleRef = React.createRef();
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleClean = (event: React.MouseEvent<HTMLSpanElement>) => {
    this.props.onClean?.(event);
    event.stopPropagation();
    this.handleBlur();
  };

  handleFocus = () => {
    this.setState({ active: true });
  };

  handleBlur = () => {
    this.setState({ active: false });
  };
  getToggleNode = () => {
    return this.toggleRef.current;
  };
  onFocus = () => {
    if (typeof this.toggleRef?.current?.focus === 'function') {
      this.toggleRef.current.focus();
    }
  };

  renderToggleClean() {
    return (
      <span
        className={this.addPrefix('clean')}
        role="button"
        tabIndex={-1}
        onClick={this.handleClean}
      >
        ✕
      </span>
    );
  }

  render() {
    const {
      componentClass: Component,
      children,
      className,
      hasValue,
      cleanable,
      classPrefix,
      caret,
      active,
      tabIndex,
      ...rest
    } = this.props;

    const classes = classNames(classPrefix, className, {
      active: active || this.state.active
    });
    const unhandled = getUnhandledProps(PickerToggle, rest);

    return (
      <Component
        {...unhandled}
        role="combobox"
        tabIndex={tabIndex}
        className={classes}
        ref={this.toggleRef}
        onFocus={createChainedFunction(this.handleFocus, _.get(unhandled, 'onFocus'))}
        onBlur={createChainedFunction(this.handleBlur, _.get(unhandled, 'onBlur'))}
      >
        <span className={this.addPrefix(hasValue ? 'value' : 'placeholder')}>{children}</span>
        {hasValue && cleanable && this.renderToggleClean()}
        {caret && <span className={this.addPrefix('caret')} />}
      </Component>
    );
  }
}

const enhance = defaultProps<PickerToggleProps>({
  classPrefix: 'picker-toggle'
});

export default enhance(PickerToggle);
