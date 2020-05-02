import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from '../Animation/Transition';
import { getOffset, on } from 'dom-lib';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import { RippleProps } from './Ripple.d';

interface RippleState {
  rippling: boolean;
  position: React.CSSProperties;
}

class Ripple extends React.Component<RippleProps, RippleState> {
  static propTypes = {
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    onMouseDown: PropTypes.func
  };
  triggerRef: React.RefObject<HTMLElement>;

  constructor(props: RippleProps) {
    super(props);
    this.state = {
      rippling: false,
      position: {}
    };

    this.triggerRef = React.createRef();
  }
  mousedownListener: {
    off: () => void;
  } = null;

  componentDidMount() {
    if (this.triggerRef.current) {
      this.mousedownListener = on(
        this.triggerRef.current.parentNode,
        'mousedown',
        this.handleMouseDown
      );
    }
  }
  componentWillUnmount() {
    if (this.mousedownListener) {
      this.mousedownListener.off();
    }
  }

  getPosition = (event: React.MouseEvent) => {
    const offset = getOffset(this.triggerRef.current);
    const offsetX = (event.pageX || 0) - offset.left;
    const offsetY = (event.pageY || 0) - offset.top;

    const radiusX = Math.max(offset.width - offsetX, offsetX);
    const radiusY = Math.max(offset.height - offsetY, offsetY);
    const radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2));

    return {
      width: radius * 2,
      height: radius * 2,
      left: offsetX - radius,
      top: offsetY - radius
    };
  };

  handleMouseDown = (event: React.MouseEvent) => {
    const position = this.getPosition(event);
    const { onMouseDown } = this.props;

    this.setState({
      rippling: true,
      position
    });

    onMouseDown?.(position, event);
  };

  handleRippled = () => {
    this.setState({
      rippling: false
    });
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  render() {
    const { className, classPrefix, ...rest } = this.props;
    const classes = classNames(this.addPrefix('pond'), className);
    const { position, rippling } = this.state;
    const unhandled = getUnhandledProps(Ripple, rest);

    return (
      <span {...unhandled} className={classes} ref={this.triggerRef}>
        <Transition
          in={rippling}
          enteringClassName={this.addPrefix('rippling')}
          onEntered={this.handleRippled}
        >
          {(props, ref) => {
            const { className, ...transitionRest } = props;
            return (
              <span
                {...transitionRest}
                ref={ref}
                className={classNames(classPrefix, className)}
                style={position}
              />
            );
          }}
        </Transition>
      </span>
    );
  }
}

export default defaultProps<RippleProps>({
  classPrefix: 'ripple'
})(Ripple);
