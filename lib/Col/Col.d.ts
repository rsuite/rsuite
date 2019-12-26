import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface ColProps extends StandardProps {
  /** You can use a custom element for this component */
  componentClass?: React.ElementType;

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

declare const Col: React.ComponentType<ColProps>;

export default Col;
