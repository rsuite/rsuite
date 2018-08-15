import React from 'react';

const toJSX = (node, key) => (typeof node !== 'undefined' ? <span key={key}>{node}</span> : null);

/**
 * tplTransform('Show {0} data', <i>100</i>);
 * output:
 * Show <span><i>100</i></span> data
 */
export default (pattern: string, ...data: Array<any>) =>
  pattern
    .split(/\{(\d+)\}/)
    .map((item, index) => (index % 2 ? toJSX(data[+item], index) : toJSX(item, index)))
    .filter(item => item !== '');
