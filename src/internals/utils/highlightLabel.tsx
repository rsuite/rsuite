import React from 'react';
import { getSafeRegExpString } from './getSafeRegExpString';
import { defaultClassPrefix } from '../../utils/prefix';

function defaultRender(patch: React.ReactNode, index: number) {
  return (
    <span key={index} className={defaultClassPrefix('label-match')}>
      {patch}
    </span>
  );
}

/**
 * Highlight the search keyword in the label
 */
export function highlightLabel(
  label: string,
  options: {
    searchKeyword: string;
    render?: (patch: React.ReactNode, index: number) => React.ReactNode;
  }
) {
  const { searchKeyword, render = defaultRender } = options;
  const regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
  const labelElements: React.ReactNode[] = [];

  const strArr = label.split(regx);
  const highStrArr = label.match(regx);

  for (let i = 0; i < strArr.length; i++) {
    labelElements.push(strArr[i]);
    if (highStrArr?.[i]) {
      labelElements.push(render(highStrArr[i], i));
    }
  }

  return labelElements;
}
