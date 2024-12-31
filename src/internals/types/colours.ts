export enum Colours {
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Cyan = 'cyan',
  Blue = 'blue',
  Violet = 'violet'
}

export type Color = `${Colours}`;

export const isPresetColor = (color?: Color | string) => {
  if (!color) {
    return false;
  }

  return Object.values(Colours).includes(color as Colours);
};
