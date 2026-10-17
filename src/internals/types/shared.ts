import React from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import type { ReplaceProps } from './utils';

export type StatusType = 'success' | 'warning' | 'error' | 'info';
export type AppearanceType = 'default' | 'primary' | 'link' | 'subtle' | 'ghost';
export type CheckTriggerType = 'change' | 'blur' | 'none' | null;
export type DisplayStateType = 'show' | 'hide' | 'hiding';

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

// Infer the element from the call signature instead of its inherited broad default.
// Keep explicit element restrictions and required `as` props intact.
type PropsWithoutDefaultAs<P> = P extends { as: unknown }
  ? P
  : P extends { as?: infer As }
    ? ElementType extends As
      ? Omit<P, 'as'>
      : P
    : P;

export interface InternalRefForwardingComponent<
  T extends ElementType,
  P = unknown,
  OmitKeys extends keyof any = never
> {
  <As extends ElementType = T>(
    props: ReplaceProps<As, Omit<WithAsProps<As>, OmitKeys> & PropsWithoutDefaultAs<P>> & {
      ref?: React.Ref<any>;
    },
    context?: any
  ): any;
  contextTypes?: any;
  displayName?: string;
}
