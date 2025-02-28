import { Sizes } from '@/internals/types';
import { getCssValue } from './css';
import { createStyleGetter } from './styleProps';

export const isPresetSize = (size?: Sizes | number | string) => {
  if (!size) {
    return false;
  }

  return Object.values(Sizes).includes(size as Sizes);
};

const sizeConfig = {
  prop: 'size',
  presetChecker: isPresetSize,
  valueTransformer: getCssValue
};

export const getSizeStyle = createStyleGetter<Sizes | number | string>(sizeConfig);
