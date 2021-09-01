import React from 'react';

interface ComponentEnhancer<TInner, TOutter> {
  (component: React.ComponentType<TInner>): React.ComponentClass<TOutter>;
}

export function compose<TInner, TOutter>(...funcs: Function[]): ComponentEnhancer<TInner, TOutter> {
  return funcs.reduce(
    (a, b) => (...args) => a(b(...args)),
    arg => arg
  ) as ComponentEnhancer<TInner, TOutter>;
}

export function setStatic(
  key: string,
  value: any
): <T extends React.ComponentType<any>>(component: T) => T {
  return BaseComponent => {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value;
    /* eslint-enable no-param-reassign */
    return BaseComponent;
  };
}

export function setDisplayName(
  displayName: string
): <T extends React.ComponentType<any>>(component: T) => T {
  return setStatic('displayName', displayName);
}

export function getDisplayName(component: React.ComponentType<any>): string {
  if (typeof component === 'string') {
    return component;
  }

  if (!component) {
    return undefined;
  }

  return component.displayName || component.name || 'Component';
}

export function wrapDisplayName(component: React.ComponentType<any>, wrapperName: string): string {
  return `${wrapperName}(${getDisplayName(component)})`;
}

export function setPropTypes<P>(
  propTypes: React.ValidationMap<P>
): <T extends React.ComponentType<P>>(component: T) => T {
  return setStatic('propTypes', propTypes);
}
