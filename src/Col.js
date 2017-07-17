import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import elementType from 'rsuite-utils/lib/propTypes/elementType';
import { SIZES } from './utils/decorate';

/*eslint-disable */

const propTypes = {
  /**
     * class-prefix `col-xs-` `col-sm-` `col-md-`  `col-lg-`
     */
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,

  /**
   * class-prefix `col-xs-offset-` `col-sm-offset-` `col-md-offset-`  `col-lg-offset-`
   */
  xsOffset: PropTypes.number,
  smOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  lgOffset: PropTypes.number,

  /**
   * class-prefix `col-xs-push-` `col-sm-push-` `col-md-push-`  `col-lg-push-`
   */
  xsPush: PropTypes.number,
  smPush: PropTypes.number,
  mdPush: PropTypes.number,
  lgPush: PropTypes.number,

  /**
   * class-prefix `col-xs-pull-` `col-sm-pull-` `col-md-pull-`  `col-lg-pull-`
   */
  xsPull: PropTypes.number,
  smPull: PropTypes.number,
  mdPull: PropTypes.number,
  lgPull: PropTypes.number,


  /**
   * adds class `hidden-xs` `hidden-sm` `hidden-md`  `hidden-lg`
   */
  xsHidden: PropTypes.bool,
  smHidden: PropTypes.bool,
  mdHidden: PropTypes.bool,
  lgHidden: PropTypes.bool,

  componentClass: elementType
};

const defaultProps = {
  componentClass: 'div'
};



class Col extends React.Component {
  render() {
    const {
      componentClass: Component,
      className,
      ...props
    } = this.props;

    const classes = {};
    const elementProps = props;

    function getPropValue(key) {
      const value = elementProps[key];
      delete elementProps[key];
      return value;
    }

    Object.values(SIZES).forEach((size) => {
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

    return (
      <Component
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

export default Col;
