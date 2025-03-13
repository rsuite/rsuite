import { SizeEnum } from '@/internals/types';
import { createStyleGetter, getCssValue } from './style-sheet';

export const isPresetSize = (size?: SizeEnum | number | string | null) => {
  if (!size) {
    return false;
  }

  const presetSizes = [...Object.values(SizeEnum), 'full'];

  return presetSizes.includes(size as SizeEnum);
};

const sizeConfig = {
  prop: 'size',
  presetChecker: isPresetSize,
  valueTransformer: getCssValue
};

export const getSizeStyle = createStyleGetter<SizeEnum | number | string>(sizeConfig);
