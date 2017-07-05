import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

    const Component = this.props.componentClass;
    const classes = {};

    Object.values(SIZES).forEach((size) => {
      let offset = this.props[`${size}Offset`];
      let push = this.props[`${size}Push`];
      let pull = this.props[`${size}Pull`];

      classes[`hidden-${size}`] = this.props[`${size}Hidden`];
      classes[`col-${size}-${this.props[size]}`] = (this.props[size] > 0);
      classes[`col-${size}-offset-${offset}`] = (offset > 0);
      classes[`col-${size}-push-${push}`] = (push > 0);
      classes[`col-${size}-pull-${pull}`] = (pull > 0);
    });

    return (
      <Component {...this.props} className={classNames(this.props.className, classes)}>
        {this.props.children}
      </Component>
    );
  }
}

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

export default Col;
