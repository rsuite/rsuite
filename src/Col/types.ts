export interface ColConfig {
  span?: number; // Number of grid columns to span
  offset?: number; // Number of grid columns to offset from the left
  push?: number; // Number of grid columns to push to the right
  pull?: number; // Number of grid columns to pull to the left
  hidden?: boolean; // Whether to hide the grid
}

export interface DeprecatedColProps {
  /** @deprecated Use xs={{ offset: number }} instead */
  xsOffset?: number;

  /** @deprecated Use sm={{ offset: number }} instead */
  smOffset?: number;

  /** @deprecated Use md={{ offset: number }} instead */
  mdOffset?: number;

  /** @deprecated Use lg={{ offset: number }} instead */
  lgOffset?: number;

  /** @deprecated Use xl={{ offset: number }} instead */
  xlOffset?: number;

  /** @deprecated Use xxl={{ offset: number }} instead */
  xxlOffset?: number;

  /** @deprecated Use xs={{ push: number }} instead */
  xsPush?: number;

  /** @deprecated Use sm={{ push: number }} instead */
  smPush?: number;

  /** @deprecated Use md={{ push: number }} instead */
  mdPush?: number;

  /** @deprecated Use lg={{ push: number }} instead */
  lgPush?: number;

  /** @deprecated Use xl={{ push: number }} instead */
  xlPush?: number;

  /** @deprecated Use xxl={{ push: number }} instead */
  xxlPush?: number;

  /** @deprecated Use xs={{ pull: number }} instead */
  xsPull?: number;

  /** @deprecated Use sm={{ pull: number }} instead */
  smPull?: number;

  /** @deprecated Use md={{ pull: number }} instead */
  mdPull?: number;

  /** @deprecated Use lg={{ pull: number }} instead */
  lgPull?: number;

  /** @deprecated Use xl={{ pull: number }} instead */
  xlPull?: number;

  /** @deprecated Use xxl={{ pull: number }} instead */
  xxlPull?: number;

  /** @deprecated Use xs={{ hidden: true }} instead */
  xsHidden?: boolean;

  /** @deprecated Use sm={{ hidden: true }} instead */
  smHidden?: boolean;

  /** @deprecated Use md={{ hidden: true }} instead */
  mdHidden?: boolean;

  /** @deprecated Use lg={{ hidden: true }} instead */
  lgHidden?: boolean;

  /** @deprecated Use xl={{ hidden: true }} instead */
  xlHidden?: boolean;

  /** @deprecated Use xxl={{ hidden: true }} instead */
  xxlHidden?: boolean;
}
