/**
 * Check if the time should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether the time should be rendered.
 */
export declare const shouldRenderTime: (format: string) => boolean;
/**
 * Check if the month should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether the month should be rendered.
 */
export declare const shouldRenderMonth: (format: string) => boolean;
/**
 * Check if the date should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether the date should be rendered.
 */
export declare const shouldRenderDate: (format: string) => boolean;
/**
 * Check if only the time should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether only the time should be rendered.
 */
export declare const shouldOnlyRenderTime: (format: string) => boolean;
/**
 * Check if only the month should be rendered based on the format.
 */
export declare const shouldOnlyRenderMonth: (format: string) => boolean;
