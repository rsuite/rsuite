// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import { prefix, defaultProps } from './utils';

/* eslint-disable */
type Props = {
  className?: string,
  classPrefix?: string,

  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,

  xsOffset?: number,
  smOffset?: number,
  mdOffset?: number,
  lgOffset?: number,

  xsPush?: number,
  smPush?: number,
  mdPush?: number,
  lgPush?: number,
  xsPull?: number,
  smPull?: number,
  mdPull?: number,
  lgPull?: number,

  xsHidden?: boolean,
  smHidden?: boolean,
  mdHidden?: boolean,
  lgHidden?: boolean,

  componentClass: React.ElementType
};

const Sizes = ['xs', 'sm', 'md', 'lg'];
const omitKeys = [];

const getValue = _.curry(
  (obj: Object, key: string): number => {
    omitKeys.push(key);
    return obj[key];
  }
);

class Col extends React.Component<Props> {
  render() {
    const { className, componentClass: Component, classPrefix, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = {};
    const getPropValue = getValue(this.props);

    Sizes.forEach(size => {
      let col = getPropValue(size);
      let hidden = getPropValue(`${size}Hidden`);
      let offset = getPropValue(`${size}Offset`);
      let push = getPropValue(`${size}Push`);
      let pull = getPropValue(`${size}Pull`);

      classes[addPrefix(`hidden-${size}`)] = hidden;
      classes[addPrefix(`${size}-${col}`)] = col >= 0;
      classes[addPrefix(`${size}-offset-${offset}`)] = offset >= 0;
      classes[addPrefix(`${size}-push-${push}`)] = push >= 0;
      classes[addPrefix(`${size}-pull-${pull}`)] = pull >= 0;
    });

    const elementProps = _.omit(props, omitKeys);

    return <Component {...elementProps} className={classNames(classes, className)} />;
  }
}

export default defaultProps({
  classPrefix: 'col',
  componentClass: 'div'
})(Col);
