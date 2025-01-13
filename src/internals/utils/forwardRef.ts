import {
  ElementType,
  PropsWithoutRef,
  ForwardRefRenderFunction,
  forwardRef as reactForwardRef
} from 'react';
import type { InternalRefForwardingComponent } from '../types';

/**
 * A utility function to wrap components with `React.forwardRef`.
 * It extends the type signature for better integration with custom components.
 *
 * @param component - The component to wrap, with `props` and `ref` types explicitly defined.
 * @returns A forward-ref component with extended type inference.
 */
export function forwardRef<
  T extends ElementType,
  P = any,
  Subcomponents extends Record<string, React.ElementType | any> = Record<string, never>,
  OmitKeys extends keyof any = never
>(component: ForwardRefRenderFunction<any, PropsWithoutRef<P>>, subcomponents?: Subcomponents) {
  const forwardedComponent = reactForwardRef(
    component
  ) as unknown as InternalRefForwardingComponent<T, P, OmitKeys> & Subcomponents;

  // Attach subcomponents if provided
  if (subcomponents) {
    Object.assign(forwardedComponent, subcomponents);
  }

  return forwardedComponent;
}
