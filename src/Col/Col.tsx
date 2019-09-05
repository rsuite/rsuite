import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import { prefix, defaultProps } from '../utils';
import { defaultClassPrefix } from '../utils/prefix';

import { ColProps } from './Col.d';

const Sizes = ['xs', 'sm', 'md', 'lg'];
const omitKeys = [];

const getValue = _.curry((obj: any, key: string): number => {
  omitKeys.push(key);
  return obj[key];
});

class Col extends React.Component<ColProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,

    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,

    xsOffset: PropTypes.number,
    smOffset: PropTypes.number,
    mdOffset: PropTypes.number,
    lgOffset: PropTypes.number,

    xsPush: PropTypes.number,
    smPush: PropTypes.number,
    mdPush: PropTypes.number,
    lgPush: PropTypes.number,
    xsPull: PropTypes.number,
    smPull: PropTypes.number,
    mdPull: PropTypes.number,
    lgPull: PropTypes.number,

    xsHidden: PropTypes.bool,
    smHidden: PropTypes.bool,
    mdHidden: PropTypes.bool,
    lgHidden: PropTypes.bool,

    componentClass: PropTypes.elementType
  };
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

      classes[defaultClassPrefix(`hidden-${size}`)] = hidden;
      classes[addPrefix(`${size}-${col}`)] = col >= 0;
      classes[addPrefix(`${size}-offset-${offset}`)] = offset >= 0;
      classes[addPrefix(`${size}-push-${push}`)] = push >= 0;
      classes[addPrefix(`${size}-pull-${pull}`)] = pull >= 0;
    });

    const elementProps = _.omit(props, omitKeys);

    return <Component {...elementProps} className={classNames(className, classPrefix, classes)} />;
  }
}

export default defaultProps<ColProps>({
  classPrefix: 'col',
  componentClass: 'div'
})(Col);
