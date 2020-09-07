import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { useClassNames, SIZE } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface ColProps extends WithAsProps {
  /** The number of columns you wish to span for Extra small devices Phones (< 480px) */
  xs?: number;

  /** The number of columns you wish to span for Small devices Tablets (≥ 480px) */
  sm?: number;

  /** The number of columns you wish to span for Medium devices Desktops (≥ 992px) */
  md?: number;

  /** The number of columns you wish to span for Large devices Desktops (≥ 1200px) */
  lg?: number;

  /** Move columns to the right for Extra small devices Phones */
  xsOffset?: number;

  /** Move columns to the right for Small devices Tablets */
  smOffset?: number;

  /** Move columns to the right for Medium devices Desktops */
  mdOffset?: number;

  /** Move columns to the right for Medium devices Desktops */
  lgOffset?: number;

  /** Change the order of grid columns to the right for Extra small devices Phones */
  xsPush?: number;

  /** Change the order of grid columns to the right for Small devices Tablets */
  smPush?: number;

  /** Change the order of grid columns to the right for Medium devices Desktops */
  mdPush?: number;

  /** Change the order of grid columns to the right for Large devices Desktops */
  lgPush?: number;

  /** Change the order of grid columns to the left for Extra small devices Phones */
  xsPull?: number;

  /** Change the order of grid columns to the left for Small devices Tablets */
  smPull?: number;

  /** Change the order of grid columns to the left for Medium devices Desktops */
  mdPull?: number;

  /** Change the order of grid columns to the left for Large devices Desktops */
  lgPull?: number;

  /** Hide column on Extra small devices Phones */
  xsHidden?: boolean;

  /** Hide column on Small devices Tablets */
  smHidden?: boolean;

  /** Hide column on Medium devices Desktops */
  mdHidden?: boolean;

  /** Hide column on Large devices Desktops */
  lgHidden?: boolean;
}

const Col: RsRefForwardingComponent<'div', ColProps> = React.forwardRef((props: ColProps, ref) => {
  const { as: Component = 'div', classPrefix = 'col', className, ...rest } = props;
  const { prefix, merge, rootPrefix } = useClassNames(classPrefix);

  const colClasses = {};
  const omitKeys = {};
  const getPropValue = (key: string): number => {
    omitKeys[key] = null;
    return rest[key];
  };

  SIZE.forEach(size => {
    const col = getPropValue(size);
    const hidden = getPropValue(`${size}Hidden`);
    const offset = getPropValue(`${size}Offset`);
    const push = getPropValue(`${size}Push`);
    const pull = getPropValue(`${size}Pull`);

    colClasses[rootPrefix(`hidden-${size}`)] = hidden;
    colClasses[prefix(`${size}-${col}`)] = col >= 0;
    colClasses[prefix(`${size}-offset-${offset}`)] = offset >= 0;
    colClasses[prefix(`${size}-push-${push}`)] = push >= 0;
    colClasses[prefix(`${size}-pull-${pull}`)] = pull >= 0;
  });

  const classes = merge(className, classPrefix, colClasses);
  const unhandledProps = omit(rest, Object.keys(omitKeys));

  return <Component role="gridcell" {...unhandledProps} ref={ref} className={classes} />;
});

Col.displayName = 'Col';
Col.propTypes = {
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

  as: PropTypes.elementType
};

export default Col;
