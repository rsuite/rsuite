// @flow

import * as React from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import curry from 'lodash/curry';
import createComponent from './utils/createComponent';

/* eslint-disable */
type Props = {
  className?: string,

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
  lgHidden?: boolean
};


const Sizes = ['xs', 'sm', 'md', 'lg'];
const Component = createComponent('div');
const omitKeys = [];

const getValue = curry((obj: Object, key: string): number => {
  omitKeys.push(key);
  return obj[key];
});


class Col extends React.Component<Props> {
  render() {
    const { className, ...props } = this.props;
    const classes = {};
    const getPropValue = getValue(this.props);

    Sizes.forEach((size) => {
      let col = getPropValue(size);
      let hidden = getPropValue(`${size}Hidden`);
      let offset = getPropValue(`${size}Offset`);
      let push = getPropValue(`${size}Push`);
      let pull = getPropValue(`${size}Pull`);

      classes[`hidden-${size}`] = hidden;
      classes[`col-${size}-${col}`] = col >= 0;
      classes[`col-${size}-offset-${offset}`] = offset >= 0;
      classes[`col-${size}-push-${push}`] = push >= 0;
      classes[`col-${size}-pull-${pull}`] = pull >= 0;
    });

    const elementProps = omit(props, omitKeys);

    return (
      <Component
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}


export default Col;
