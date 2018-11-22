// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { defaultProps } from '../utils';
import bindElementResize, { unbind as unbindElementResize } from 'element-resize-event';

const placementProps = [
  'placement',
  'shouldUpdatePosition',
  'arrowOffsetLeft',
  'arrowOffsetTop',
  'positionLeft',
  'positionTop',
  'getPositionInstance'
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
  getPositionInstance?: () => any
};

class MenuWrapper extends React.Component<Props> {
  menuElement = null;
  bindMenuRef = ref => {
    this.menuElement = ref;
  };
  componentDidMount() {
    if (resizePlacement.includes(this.props.placement)) {
      bindElementResize(this.menuElement, this.handleResize);
    }
  }
  componentWillUnmount() {
    if (this.menuElement) {
      unbindElementResize(this.menuElement);
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
        ref={this.bindMenuRef}
        {..._.omit(rest, placementProps)}
        className={classNames(classPrefix, className)}
      />
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'picker-menu'
});

export default enhance(MenuWrapper);
