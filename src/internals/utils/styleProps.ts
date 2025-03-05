import { Sizes } from '@/internals/types';
import { Color } from '../types/colours';

type StyleValue<T = Color | Sizes | number | string> = T;
type PresetChecker<T = StyleValue> = (value: T) => boolean;
type ValueTransformer<T = StyleValue> = (value: T) => string | undefined;

interface StylePropConfig<T = StyleValue> {
  prop: string;
  useGlobalVar?: boolean;
  presetChecker?: PresetChecker<T>;
  valueTransformer?: ValueTransformer<T>;
}

export const createStyleValueSetter = <T = StyleValue>(config: StylePropConfig<T>) => {
  const { valueTransformer: t, presetChecker, useGlobalVar } = config;
  return (value?: T, component?: string, prop: string = config.prop) => {
    if (typeof value === 'undefined' || !component) {
      return;
    }

    if (presetChecker?.(value)) {
      return useGlobalVar
        ? `var(--rs-${prop}-${value})`
        : `var(--rs-${component}-${prop}-${value})`;
    } else if (Array.isArray(value)) {
      // If value is an array, join it with spaces,
      // .eg, gap=[10, 20] -> '10px 20px'
      return value.map(item => (t ? t(item) : item)).join(' ');
    }

    return t ? t(value) : value;
  };
};

export const createStyleGetter = <T = StyleValue>(config: StylePropConfig<T>) => {
  const setValue = createStyleValueSetter(config);

  return (value?: T, component?: string, prop: string = config.prop) => {
    if (typeof value === 'undefined' || !component) {
      return;
    }

    return {
      [`--rs-${component}-${prop}`]: setValue(value, component, prop)
    };
  };
};
