export type RowAlignment = 'top' | 'middle' | 'bottom';

export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

/** @deprecated Use new responsive props format instead */
export interface DeprecatedColProps {
  /** @deprecated Use span={{ xs: number }} instead */
  xs?: number;

  /** @deprecated Use span={{ sm: number }} instead */
  sm?: number;

  /** @deprecated Use span={{ md: number }} instead */
  md?: number;

  /** @deprecated Use span={{ lg: number }} instead */
  lg?: number;

  /** @deprecated Use span={{ xl: number }} instead */
  xl?: number;

  /** @deprecated Use span={{ xxl: number }} instead */
  xxl?: number;

  /** @deprecated Use offset={{ xs: number }} instead */
  xsOffset?: number;

  /** @deprecated Use offset={{ sm: number }} instead */
  smOffset?: number;

  /** @deprecated Use offset={{ md: number }} instead */
  mdOffset?: number;

  /** @deprecated Use offset={{ lg: number }} instead */
  lgOffset?: number;

  /** @deprecated Use offset={{ xl: number }} instead */
  xlOffset?: number;

  /** @deprecated Use offset={{ xxl: number }} instead */
  xxlOffset?: number;

  /** @deprecated Use push={{ xs: number }} instead */
  xsPush?: number;

  /** @deprecated Use push={{ sm: number }} instead */
  smPush?: number;

  /** @deprecated Use push={{ md: number }} instead */
  mdPush?: number;

  /** @deprecated Use push={{ lg: number }} instead */
  lgPush?: number;

  /** @deprecated Use push={{ xl: number }} instead */
  xlPush?: number;

  /** @deprecated Use push={{ xxl: number }} instead */
  xxlPush?: number;

  /** @deprecated Use pull={{ xs: number }} instead */
  xsPull?: number;

  /** @deprecated Use pull={{ sm: number }} instead */
  smPull?: number;

  /** @deprecated Use pull={{ md: number }} instead */
  mdPull?: number;

  /** @deprecated Use pull={{ lg: number }} instead */
  lgPull?: number;

  /** @deprecated Use pull={{ xl: number }} instead */
  xlPull?: number;

  /** @deprecated Use pull={{ xxl: number }} instead */
  xxlPull?: number;

  /** @deprecated Use hidden={{ xs: true }} instead */
  xsHidden?: boolean;

  /** @deprecated Use hidden={{ sm: true }} instead */
  smHidden?: boolean;

  /** @deprecated Use hidden={{ md: true }} instead */
  mdHidden?: boolean;

  /** @deprecated Use hidden={{ lg: true }} instead */
  lgHidden?: boolean;

  /** @deprecated Use hidden={{ xl: true }} instead */
  xlHidden?: boolean;

  /** @deprecated Use hidden={{ xxl: true }} instead */
  xxlHidden?: boolean;
}
