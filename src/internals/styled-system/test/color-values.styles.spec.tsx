import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Box from '../../../Box';
import Text from '../../../Text';
import Button from '../../../Button';
import CustomProvider from '../../../CustomProvider';

import '../../../Box/styles/index.scss';
import '../../../Text/styles/index.scss';
import '../../../Button/styles/index.scss';

const components = { Box, Text, Button };
const gray500 = {
  light: 'rgb(147, 147, 147)',
  dark: 'rgb(92, 96, 102)',
  'high-contrast': 'rgb(92, 96, 102)'
};

describe('CSS color values in system props', () => {
  let originalDirection: string;
  let originalBodyClass: string;
  beforeEach(() => {
    originalDirection = document.documentElement.dir;
    originalBodyClass = document.body.className;
  });
  afterEach(() => {
    cleanup();
    document.documentElement.dir = originalDirection;
    document.body.className = originalBodyClass;
  });

  for (const theme of ['light', 'dark', 'high-contrast'] as const) {
    for (const dir of ['ltr', 'rtl'] as const) {
      for (const name of ['Box', 'Text', 'Button'] as const) {
        const Component = components[name];
        const renderColors = (colors: string[]) => {
          document.documentElement.dir = dir;
          render(
            <CustomProvider theme={theme} rtl={dir === 'rtl'}>
              <div
                style={
                  {
                    '--application-color': '#13579b',
                    '--rs-color-red': '#123456'
                  } as React.CSSProperties
                }
              >
                {colors.map((color, index) => (
                  <Component
                    key={color}
                    data-testid={`color-${index}`}
                    c={color}
                    bgc={color}
                    tdc={color}
                  >
                    {color}
                  </Component>
                ))}
              </div>
            </CustomProvider>
          );
        };
        const expectColor = (index: number, expected: string) => {
          const style = getComputedStyle(screen.getByTestId(`color-${index}`));
          expect(style.color).toBe(expected);
          expect(style.backgroundColor).toBe(expected);
          expect(style.textDecorationColor).toBe(expected);
        };

        it(`renders CSS named gray on ${name} in ${theme}/${dir}`, () => {
          renderColors(['gray']);
          expectColor(0, 'rgb(128, 128, 128)');
        });

        it(`retains shades, custom aliases and CSS values on ${name} in ${theme}/${dir}`, () => {
          renderColors(['gray.500', 'red', '#2468ac', 'var(--application-color)']);
          expectColor(0, gray500[theme]);
          expectColor(1, 'rgb(18, 52, 86)');
          expectColor(2, 'rgb(36, 104, 172)');
          expectColor(3, 'rgb(19, 87, 155)');
        });
      }
    }
  }
});
