// @flow

import * as React from 'react';

const toJSX = (node, key) => (<span key={key}>{node}</span>);

export default (pattern: string, ...data: Array<any>) =>
  pattern
    .split(/\{(\d+)\}/)
    .map((item, index) => ((index % 2) ? toJSX(data[+item], index) : toJSX(item, index)))
    .filter(item => item !== '');
