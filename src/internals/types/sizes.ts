export enum SizeEnum {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}

export enum TypographySizeEnum {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XL2 = '2xl',
  XL3 = '3xl',
  XL4 = '4xl',
  XL5 = '5xl',
  XL6 = '6xl'
}

export type Size = `${SizeEnum}`;
/** Basic size type (xs, sm, md, lg) */
export type BasicSize = Exclude<Size, 'xl'>;
export type TextSize = `${TypographySizeEnum}`;
export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '2xl';
export type ResponsiveValue<T> = { [key in Breakpoints]?: T };
export type WithResponsive<T> = T | ResponsiveValue<T>;
