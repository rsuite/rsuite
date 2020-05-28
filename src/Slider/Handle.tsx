import * as React from 'react';
import classNames from 'classnames';
import { DOMMouseMoveTracker, addStyle, getWidth } from 'dom-lib';

import Tooltip from '../Tooltip';
import { prefix, defaultProps } from '../utils';
import { StandardProps } from '../@types/common';

interface HandleProps extends StandardProps {
  classPrefix?: string;
  disabled?: boolean;
  vertical?: boolean;
  tooltip?: boolean;
  rtl?: boolean;
  position?: number;
  value?: number;
  renderTooltip?: (value: number) => React.ReactNode;
  onDragMove?: (event: React.DragEvent) => void;
  onDragStart?: (event: React.MouseEvent) => void;
  onDragEnd?: (event: React.MouseEvent) => void;
}
interface HandleState {
  active?: boolean;
}

class Handle extends React.Component<HandleProps, HandleState> {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.tooltipRef = React.createRef();
  }
  tooltipRef: React.RefObject<HTMLDivElement>;
  mouseMoveTracker = null;
  componentWillUnmount() {
    this.releaseMouseMoves();
  }

  getMouseMoveTracker() {
    return (
      this.mouseMoveTracker ||
      new DOMMouseMoveTracker(this.handleDragMove, this.handleDragEnd, document.body)
    );
  }
  releaseMouseMoves = () => {
    if (this.mouseMoveTracker) {
      this.mouseMoveTracker.releaseMouseMoves();
      this.mouseMoveTracker = null;
    }
  };
  setTooltipPosition() {
    const { tooltip } = this.props;
    const tooltipElement = this.tooltipRef.current;

    if (tooltip && tooltipElement) {
      const width = getWidth(tooltipElement);
      addStyle(tooltipElement, 'left', `-${width / 2}px`);
    }
  }
  handleDragMove = (_deltaX: number, _deltaY: number, event: React.DragEvent) => {
    if (!this.mouseMoveTracker || !this.mouseMoveTracker.isDragging()) {
      return;
    }

    this.props.onDragMove?.(event);
    this.setTooltipPosition();
  };
  handleDragEnd = (event: React.MouseEvent) => {
    this.releaseMouseMoves();
    this.setState({
      active: false
    });
    this.props.onDragEnd?.(event);
  };
  handleMouseDown = (event: React.MouseEvent) => {
    if (this.props.disabled) {
      return;
    }
    this.mouseMoveTracker = this.getMouseMoveTracker();
    this.mouseMoveTracker.captureMouseMoves(event);
    this.setState({
      active: true
    });
    this.props.onDragStart?.(event);
  };
  handleMouseEnter = () => {
    this.setTooltipPosition();
  };
  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);
  render() {
    const {
      className,
      style,
      children,
      position,
      vertical,
      tooltip,
      renderTooltip,
      rtl,
      value
    } = this.props;
    const { active } = this.state;

    const horizontalKey = rtl ? 'right' : 'left';
    const direction = vertical ? 'top' : horizontalKey;
    const styles = {
      ...style,
      [direction]: `${position}%`
    };
    const handleClasses = classNames(this.addPrefix('handle'), className, {
      active
    });

    return (
      <div
        className={handleClasses}
        role="presentation"
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        style={styles}
      >
        {tooltip && (
          <Tooltip
            htmlElementRef={this.tooltipRef}
            className={classNames(this.addPrefix('tooltip'), 'placement-top')}
          >
            {renderTooltip ? renderTooltip(value) : value}
          </Tooltip>
        )}
        {children}
      </div>
    );
  }
}

export default defaultProps<HandleProps>({
  classPrefix: 'slider'
})(Handle);
