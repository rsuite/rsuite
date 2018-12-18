// @flow

import * as React from 'react';
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
  'topLeft',
  'topRight',
  'leftBottom',
  'rightBottom',
  'auto',
  'autoVerticalLeft',
  'autoVerticalRight',
  'autoHorizontalBottom'
];

type Props = {
  classPrefix?: string,
  className?: string,
  getPositionInstance?: () => any,
  getToggleInstance?: () => any,
  placement?: string,
  autoWidth?: boolean
};

class MenuWrapper extends React.Component<Props> {
  menuElement = null;
  bindMenuRef = ref => {
    this.menuElement = ref;
  };
  componentDidMount() {
    const { autoWidth } = this.props;
    if (resizePlacement.includes(this.props.placement)) {
      bindElementResize(this.menuElement, this.handleResize);
    }
    if (autoWidth) {
      this.updateMenuStyle();
    }
  }
  componentWillUnmount() {
    if (this.menuElement) {
      unbindElementResize(this.menuElement);
    }
  }
  updateMenuStyle() {
    const { getToggleInstance } = this.props;

    if (this.menuElement && getToggleInstance) {
      const instance = getToggleInstance();
      if (instance && instance.toggle) {
        const width = getWidth(instance.toggle);
        addStyle(this.menuElement, 'min-width', `${width}px`);
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
        ref={this.bindMenuRef}
        className={classNames(classPrefix, className)}
      />
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'picker-menu'
});

export default enhance(MenuWrapper);
