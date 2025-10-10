import React from 'react';
/**
 * HOC for display a deprecation message from a deprecated component
 * fixme: Only display deprecation message in non-production environment
 */
export declare function deprecateComponent<P = any, T extends React.ComponentType<P> = React.ComponentType<P>>(Component: T, message: string): typeof Component;
export default deprecateComponent;
