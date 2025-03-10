import type { CSSProperties, ElementType, ReactNode } from 'react';
import type { ReplaceProps } from './utils';
import { Colours } from './colours';
import React from 'react';

export enum Sizes {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}

export enum TextSize {
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

export type StatusType = 'success' | 'warning' | 'error' | 'info';
export type ColorType = `${Colours}`;
export type SizeType = `${Sizes}`;
export type AppearanceType = 'default' | 'primary' | 'link' | 'subtle' | 'ghost';
export type CheckTriggerType = 'change' | 'blur' | 'none' | null;
export type DisplayStateType = 'show' | 'hide' | 'hiding';
export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type ResponsiveValue<T> = { [key in Breakpoints]?: T };

export interface StandardProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: ReactNode;

  /** Additional style */
  style?: CSSProperties;
}

export interface WithAsProps<As extends ElementType | string = ElementType> extends StandardProps {
  /** You can use a custom element for this component */
  as?: As;
}

export interface WithAsPropsWithoutChildren<As extends ElementType | string = ElementType>
  extends Omit<StandardProps, 'children'> {
  /** You can use a custom element for this component */
  as?: As;
}

export interface InternalRefForwardingComponent<
  T extends ElementType,
  P = unknown,
  OmitKeys extends keyof any = never
> {
  <As extends ElementType = T>(
    props: ReplaceProps<As, Omit<WithAsProps<As>, OmitKeys> & P> & {
      ref?: React.Ref<any>;
    },
    context?: any
  ): any;
  contextTypes?: any;
  displayName?: string;
}
