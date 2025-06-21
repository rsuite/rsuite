import { SizeEnum, TypographySizeEnum } from '@/internals/types';
import { createStyleGetter, getCssValue } from './style-sheet';

export const isPresetSize = (size?: SizeEnum | number | string | null) => {
  if (!size) {
    return false;
  }

  const presetSizes = [...Object.values(SizeEnum), ...Object.values(TypographySizeEnum), 'full'];

  return presetSizes.includes(size as SizeEnum);
};

const sizeConfig = {
  prop: 'size',
  presetChecker: isPresetSize,
  valueTransformer: getCssValue
};

export const getSizeStyle = createStyleGetter<SizeEnum | number | string>(sizeConfig);

const lineHeightConfig = {
  prop: 'line-height',
  presetChecker: isPresetSize,
  valueTransformer: value => (isPresetSize(value) ? value : null)
};

export const getLineHeightStyle = createStyleGetter<SizeEnum | number | string>(lineHeightConfig);
