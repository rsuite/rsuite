import { useContext, useMemo } from 'react';
import mergeWith from 'lodash/mergeWith';

import { ComponentOverrides, CustomContext } from './CustomProvider';

export function useProps(component: keyof ComponentOverrides, props: any) {
  const defaultProps = useContext(CustomContext).PREVIEW_components?.[component]?.defaultProps;

  return useMemo(() => {
    if (!defaultProps) return props;
    return padPropsWithDefaults(props, defaultProps);
  }, [props, defaultProps]);
}

function padPropsWithDefaults<P>(props: P, defaultProps: Partial<P>): P {
  return mergeWith({}, props, defaultProps, (objValue, srcValue) => {
    return typeof objValue === 'undefined' ? srcValue : objValue;
  });
}
