import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { useCustom } from '../../CustomProvider';

export type ComponentProps = WithAsProps & React.HTMLAttributes<HTMLDivElement>;

interface Props<T extends React.ElementType> extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  componentAs?: T;
  componentClassPrefix?: string;
}

/**
 * Create a component with `classPrefix` and `as` attributes.
 */
export function createComponent<T extends React.ElementType = 'div', P = ComponentProps>({
  name,
  componentAs,
  componentClassPrefix,
  ...defaultProps
}: Props<T> & Partial<P>) {
  const Component: RsRefForwardingComponent<T, Partial<P>> = React.forwardRef(
    (props: ComponentProps, ref) => {
      const { propsWithDefaults } = useCustom(name as any, props);
      const {
        as: Component = componentAs || 'div',
        classPrefix = componentClassPrefix || kebabCase(name),
        className,
        role,
        ...rest
      } = propsWithDefaults;
      const { withClassPrefix, merge } = useClassNames(classPrefix);
      const classes = merge(className, withClassPrefix());

      return <Component {...defaultProps} {...rest} role={role} ref={ref} className={classes} />;
    }
  );

  Component.displayName = name;

  return Component;
}

export default createComponent;
