import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from '@testing-library/react';
import { expect, it } from 'vitest';
import Box from '@/internals/Box';
import { StyleManager } from '../style-manager';

it.each([
  '',
  'account:',
  'account ',
  'account\tline',
  'account\nline',
  'account\rline',
  'account\fline',
  'account%20%',
  'account%%20%%',
  'dialog.Ω🧪/"</style>:',
  '\0',
  '\ud800'
])('applies styles with an opaque React root prefix (%j)', async identifierPrefix => {
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container, { identifierPrefix });
  try {
    await act(async () => {
      root.render(<Box c="#123456" p={{ xs: '5px', md: '19px' }} />);
    });
    const element = container.firstElementChild!;
    expect(element.classList.length).toBe(1);
    expect(getComputedStyle(element).color).toBe('rgb(18, 52, 86)');
    expect(getComputedStyle(element).paddingTop).toBe('19px');
  } finally {
    await act(async () => root.unmount());
    container.remove();
  }
  expect(StyleManager.styleMap.size).toBe(0);
  expect(StyleManager.ruleSelectors.size).toBe(0);
});
