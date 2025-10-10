export default function createTextMaskInputElement(config?: any): {
    state: {
        previousConformedValue: undefined;
        previousPlaceholder: undefined;
    };
    update(rawValue?: any, { inputElement, mask: providedMask, guide, pipe, placeholderChar, keepCharPositions, showMask }?: any): void;
};
