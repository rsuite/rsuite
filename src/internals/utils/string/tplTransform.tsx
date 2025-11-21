import React from 'react';

const toJSX = (node: React.ReactNode, key: string | number) =>
  typeof node !== 'undefined' ? <span key={key}>{node}</span> : null;

/**
 * Transforms a pattern string by replacing placeholders with corresponding data values.
 *
 * @example
 * tplTransform('Show {0} data', <i>100</i>);
 * // output: Show <span><i>100</i></span> data
 */
export function tplTransform(pattern: string, ...data: any[]) {
  return pattern
    .split(/\{(\d+)\}/)
    .map((item: string, index: number) =>
      index % 2 ? toJSX(data[+item], index) : toJSX(item, index)
    )
    .filter((item: string | React.ReactNode) => item !== '');
}

export default tplTransform;
