import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Text from '..';
import '../styles/index.scss';

const sizes = [
  ['xs', 12, 16],
  ['sm', 14, 20],
  ['md', 16, 24],
  ['lg', 18, 28],
  ['xl', 20, 28],
  ['2xl', 24, 32],
  ['3xl', 30, 36],
  ['4xl', 36, 40],
  ['5xl', 48, 48],
  ['6xl', 60, 60]
] as const;

describe('Text styles', () => {
  [16, 20].forEach(rootFontSize => {
    sizes.forEach(([size, fontSize, lineHeight]) => {
      it(`preserves ${size} line boxes with a ${rootFontSize}px root font`, () => {
        const root = document.documentElement;
        const originalFontSize = root.style.fontSize;

        try {
          root.style.fontSize = `${rootFontSize}px`;
          render(
            <>
              <Text size={size} data-testid="single-line">
                First line
              </Text>
              <Text size={size} data-testid="two-lines">
                First line
                <br />
                Second line
              </Text>
            </>
          );

          const scale = rootFontSize / 16;
          const singleLine = screen.getByTestId('single-line');
          const twoLines = screen.getByTestId('two-lines');
          const singleLineHeight = singleLine.getBoundingClientRect().height;
          const twoLinesHeight = twoLines.getBoundingClientRect().height;

          expect(getComputedStyle(singleLine).fontSize).to.equal(`${fontSize * scale}px`);
          // An inline expression bypasses PostCSS and provides the browser's native result.
          // Inspect actual line boxes: computed line-height can hide rounding loss.
          singleLine.style.lineHeight = `calc(${lineHeight} / ${fontSize})`;
          twoLines.style.lineHeight = `calc(${lineHeight} / ${fontSize})`;
          expect(singleLineHeight).to.equal(singleLine.getBoundingClientRect().height);
          expect(twoLinesHeight).to.equal(twoLines.getBoundingClientRect().height);

          if (rootFontSize === 16) {
            expect(singleLineHeight).to.equal(lineHeight);
            expect(twoLinesHeight).to.equal(lineHeight * 2);
          }
        } finally {
          root.style.fontSize = originalFontSize;
        }
      });
    });
  });
});
