export default function adjustCaretPosition({ previousConformedValue, previousPlaceholder, currentCaretPosition, conformedValue, rawValue, placeholderChar, placeholder, indexesOfPipedChars, caretTrapIndexes }: {
    previousConformedValue?: string | undefined;
    previousPlaceholder?: string | undefined;
    currentCaretPosition?: number | undefined;
    conformedValue: any;
    rawValue: any;
    placeholderChar: any;
    placeholder: any;
    indexesOfPipedChars?: string[] | undefined;
    caretTrapIndexes?: number[] | undefined;
}): number | undefined;
