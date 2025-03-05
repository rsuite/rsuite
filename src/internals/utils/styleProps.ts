import { Sizes } from '@/internals/types';
import { Color } from '../types/colours';

type StyleValue<T = Color | Sizes | number | string> = T;
type PresetChecker<T = StyleValue> = (value: T) => boolean;
type ValueTransformer<T = StyleValue> = (value: T) => string | undefined;

interface StylePropConfig<T = StyleValue> {
  prop: string;
  useGlobalVar?: boolean;
  presetChecker: PresetChecker<T>;
  valueTransformer?: ValueTransformer<T>;
}

export const createStyleValueSetter = <T = StyleValue>(config: StylePropConfig<T>) => {
  return (value?: T, component?: string, prop: string = config.prop) => {
    if (typeof value === 'undefined' || !component) {
      return;
    }

    if (config.presetChecker(value)) {
      return config.useGlobalVar
        ? `var(--rs-${prop}-${value})`
        : `var(--rs-${component}-${prop}-${value})`;
    }

    return config.valueTransformer ? config.valueTransformer(value) : value;
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
