import React from 'react';
import warnOnce from './warnOnce';

/**
 * HOC for display a deprecation message from a deprecated component
 * fixme: Only display deprecation message in non-production environment
 */
export function deprecateComponent<
  P = any,
  T extends React.ComponentType<P> = React.ComponentType<P>
>(Component: T, message: string): typeof Component {
  const componentDisplayName = Component.displayName ?? Component.name;

  const Deprecated = React.forwardRef((props: any, ref: any) => {
    warnOnce(message);

    return <Component ref={ref} {...props} />;
  });

  Deprecated.displayName = `deprecated(${componentDisplayName})`;

  return Deprecated as any;
}

export default deprecateComponent;
