import * as React from 'react';
import { PositionProperty } from 'csstype';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { on, getOffset } from 'dom-lib';
import bindElementResize, { unbind as unbindElementResize } from 'element-resize-event';
import { defaultProps, getUnhandledProps } from '../utils';
import { AffixProps } from './Affix.d';

interface Offset {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

interface AffixState {
  offset?: Offset;
  fixed?: boolean;
  containerOffset?: Offset;
}

class Affix extends React.Component<AffixProps, AffixState> {
  static propTypes = {
    top: PropTypes.number,
    onChange: PropTypes.func,
    container: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  };

  static defaultProps = {
    top: 0
  };

  mountRef: React.RefObject<any> = null;
  scrollListener = null;

  constructor(props) {
    super(props);
    this.state = {
      offset: null,
      fixed: false,
      containerOffset: null
    };
    this.mountRef = React.createRef();
  }

  componentDidMount() {
    this.updateMountNodeOffset();
    this.scrollListener = on(window, 'scroll', this.updatePosition);
    bindElementResize(this.mountRef.current, this.updateMountNodeOffset);
  }

  componentWillUnmount() {
    if (this.scrollListener) {
      this.scrollListener.off();
    }
    if (this.mountRef.current) {
      unbindElementResize(this.mountRef.current);
    }
  }
  getContainerOffset = () => {
    const { container } = this.props;
    const { containerOffset: offset } = this.state;
    if (offset) {
      return offset;
    }

    const node = typeof container === 'function' ? container() : container;
    const containerOffset = node ? getOffset(node) : null;
    this.setState({ containerOffset });

    return containerOffset;
  };

  updateMountNodeOffset = () => {
    this.setState(() => {
      return { offset: getOffset(this.mountRef.current) };
    });
  };

  updatePosition = () => {
    const { offset } = this.state;
    const { top, onChange } = this.props;
    const scrollY = window.scrollY || window.pageYOffset;
    const containerOffset = this.getContainerOffset();
    let fixed = scrollY - (offset.top - top) >= 0;

    if (containerOffset) {
      fixed = fixed && scrollY < containerOffset.top + containerOffset.height;
    }

    if (fixed !== this.state.fixed) {
      this.setState({ fixed });
      onChange?.(fixed);
    }
  };

  render() {
    const { classPrefix, children, top, ...rest } = this.props;
    const { fixed, offset } = this.state;
    const classes = classNames({
      [classPrefix]: fixed
    });

    const placeholderStyles = fixed ? { width: offset.width, height: offset.height } : undefined;
    const affixStyle = fixed
      ? {
          position: 'fixed' as PositionProperty,
          top,
          left: offset.left,
          width: offset.width,
          zIndex: 10
        }
      : null;

    const unhandledProps = getUnhandledProps(Affix, rest);

    return (
      <div ref={this.mountRef} {...unhandledProps}>
        <div className={classes} style={affixStyle}>
          {children}
        </div>
        {fixed && <div aria-hidden="true" style={placeholderStyles}></div>}
      </div>
    );
  }
}

export default defaultProps<AffixProps>({
  classPrefix: 'affix'
})(Affix);
