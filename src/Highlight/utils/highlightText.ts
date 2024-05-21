import React from 'react';
import { getSafeRegExpString } from '@/internals/utils';
export function highlightText(
  text: string,
  props: {
    query?: string | string[];
    renderMark: (patch: string, index: number) => React.ReactNode;
  }
) {
  const { query, renderMark } = props;

  if (!query || !text) {
    return text;
  }

  const queries = Array.isArray(query) ? query : [query];

  const regx = new RegExp(queries.map(q => getSafeRegExpString(q)).join('|'), 'ig');
  const texts: React.ReactNode[] = [];

  const strArr = text.split(regx);
  const highStrArr = text.match(regx);

  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i]) {
      texts.push(strArr[i]);
    }
    if (highStrArr?.[i]) {
      texts.push(renderMark(highStrArr[i], i));
    }
  }

  return texts;
}
