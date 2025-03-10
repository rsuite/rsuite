import { Sizes } from '@/internals/types';
import { createStyleGetter, getCssValue } from './style-sheet';

export const isPresetSize = (size?: Sizes | number | string | null) => {
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
