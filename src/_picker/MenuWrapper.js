// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { defaultProps } from '../utils';

const placementProps = [
  'placement',
  'shouldUpdatePosition',
  'arrowOffsetLeft',
  'arrowOffsetTop',
  'positionLeft',
  'positionTop'
];

type Props = {
  classPrefix?: string,
  className?: string
};

class MenuWrapper extends React.Component<Props> {
  render() {
    const { className, classPrefix, ...rest } = this.props;
    return <div {..._.omit(rest, placementProps)} className={classNames(classPrefix, className)} />;
  }
}

const enhance = defaultProps({
  classPrefix: 'picker-menu'
});

export default enhance(MenuWrapper);
