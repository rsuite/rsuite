export type CharacterType = 0 | 0.5 | 1;
export declare const transformValueToCharacterMap: (value: number, max: number, allowHalf: boolean) => CharacterType[];
export declare const transformCharacterMapToValue: (characterMap: CharacterType[]) => number;
