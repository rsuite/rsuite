import * as React from 'react';
/* eslint-disable react/no-find-dom-node */
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import _ from 'lodash';
import { addStyle, getWidth } from 'dom-lib';
import { defaultProps } from '../utils';
import bindElementResize, { unbind as unbindElementResize } from 'element-resize-event';

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

export interface MenuWrapperProps {
  classPrefix?: string;
  className?: string;
  placement?: string;
  autoWidth?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  getPositionInstance?: () => any;
  getToggleInstance?: () => any;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

class MenuWrapper extends React.Component<MenuWrapperProps> {
  menuElementRef: React.RefObject<HTMLDivElement>;

  constructor(props: MenuWrapperProps) {
    super(props);
    this.menuElementRef = React.createRef();
  }

  componentDidMount() {
    const { autoWidth } = this.props;
    if (resizePlacement.includes(this.props.placement)) {
      bindElementResize(this.menuElementRef.current, this.handleResize);
    }
    if (autoWidth) {
      this.updateMenuStyle();
    }
  }
  componentWillUnmount() {
    if (this.menuElementRef.current) {
      unbindElementResize(this.menuElementRef.current);
    }
  }
  updateMenuStyle() {
    const { getToggleInstance } = this.props;

    if (this.menuElementRef.current && getToggleInstance) {
      const instance = getToggleInstance();
      if (instance?.toggleRef?.current) {
        const width = getWidth(findDOMNode(instance.toggleRef.current));
        addStyle(this.menuElementRef.current, 'min-width', `${width}px`);
      }
    }
  }
  handleResize = () => {
    const { getPositionInstance } = this.props;
    const instance = getPositionInstance ? getPositionInstance() : null;
    if (instance) {
      instance.updatePosition(true);
    }
  };
  render() {
    const { className, classPrefix, ...rest } = this.props;
    return (
      <div
        {..._.omit(rest, omitProps)}
        ref={this.menuElementRef}
        className={classNames(classPrefix, className)}
      />
    );
  }
}

const enhance = defaultProps<MenuWrapperProps>({
  classPrefix: 'picker-menu'
});

export default enhance(MenuWrapper);
