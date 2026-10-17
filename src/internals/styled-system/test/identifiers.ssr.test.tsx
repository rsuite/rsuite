import React, { useId } from 'react';
import { renderToString } from 'react-dom/server';
import { beforeAll, describe, expect, it } from 'vitest';
import Box from '@/internals/Box';

const RawIdentifier = () => <div id={useId()} />;
beforeAll(() => {
  console.info('Style identifiers SSR runtime', React.version);
  if (process.env.VITE_RSUITE_REACT_VERSION) {
    expect(React.version).toBe(process.env.VITE_RSUITE_REACT_VERSION);
  }
});
const renderClass = (identifierPrefix: string) => {
  const html = renderToString(<Box c="#123456" p={{ xs: '5px', md: '19px' }} />, {
    identifierPrefix
  });
  const className = html.match(/class="([^"]+)"/)?.[1];
  expect(className).toBeDefined();
  return className!;
};

describe('server-rendered style identifiers', () => {
  it('preserves distinct root namespaces containing colons', () => {
    expect(renderToString(<RawIdentifier />, { identifierPrefix: 'account:' })).not.toBe(
      renderToString(<RawIdentifier />, { identifierPrefix: 'account' })
    );
    expect(renderClass('account:')).not.toBe(renderClass('account'));
  });

  it.each([' ', '\t', '\n', '\r', '\f'])(
    'keeps a root prefix containing %j in one class token',
    whitespace => {
      expect(renderClass('account' + whitespace + 'details')).not.toMatch(/[\t\n\f\r ]/u);
    }
  );

  it('keeps literal encoding markers distinct from encoded whitespace', () => {
    const prefixes = ['account ', 'account%20%', 'account%%20%%', 'account\t', 'account%9%'];
    expect(new Set(prefixes.map(renderClass)).size).toBe(prefixes.length);
  });

  it('keeps HTML-normalized characters distinct without emitting null or unpaired surrogates', () => {
    const prefixes = ['\0', '\ufffd', '%0%', '\ud800', '\ud801', '%d800%'];
    const classes = prefixes.map(renderClass);
    expect(new Set(classes).size).toBe(prefixes.length);
    classes.forEach(className => {
      expect(className).not.toContain('\0');
      expect(className).not.toMatch(/[\uD800-\uDFFF]/u);
    });
  });
});
