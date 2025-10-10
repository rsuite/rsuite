import React from 'react';
/**
 * Transforms a pattern string by replacing placeholders with corresponding data values.
 *
 * @example
 * tplTransform('Show {0} data', <i>100</i>);
 * // output: Show <span><i>100</i></span> data
 */
export declare function tplTransform(pattern: string, ...data: any[]): (React.JSX.Element | null)[];
export default tplTransform;
