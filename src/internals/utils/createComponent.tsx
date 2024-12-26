import React from 'react';
import { kebabCase } from 'lodash-es';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { useCustom } from '../../CustomProvider';

export type ComponentProps = WithAsProps & React.HTMLAttributes<HTMLDivElement>;

interface Props<TElement extends React.ElementType> extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  componentAs?: TElement;
  componentClassPrefix?: string;
}

/**
 * Create a component with `classPrefix` and `as` attributes.
 */
export function createComponent<TElement extends React.ElementType = 'div'>({
  name,
  componentAs,
  componentClassPrefix,
  ...defaultProps
}: Props<TElement>) {
  const Component: RsRefForwardingComponent<TElement, ComponentProps> = React.forwardRef(
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
