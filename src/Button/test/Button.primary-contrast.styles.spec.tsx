import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from '../Button';
import CustomProvider from '../../CustomProvider';
import IconButton from '../../IconButton';
import { background, contrast, rgba } from '../../../test/browser/contrast';
import '../styles/index.scss';
import '../../IconButton/styles/index.scss';

const colors = [undefined, 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'] as const;
const sizes = ['xs', 'sm', 'md', 'lg'] as const;

describe.each(['light', 'dark', 'high-contrast'] as const)(
  'Primary button contrast (%s)',
  theme => {
    it.each(colors)('keeps text, icons and loading indicators readable for %s', color => {
      render(
        <CustomProvider theme={theme}>
          {sizes.flatMap(size =>
            [false, true].map(active => (
              <div key={`${size}-${active}`}>
                <Button
                  appearance="primary"
                  color={color}
                  size={size}
                  active={active}
                  style={{ transition: 'none' }}
                >
                  Save
                </Button>
                <Button
                  appearance="primary"
                  color={color}
                  size={size}
                  active={active}
                  loading
                  style={{ transition: 'none' }}
                >
                  Save
                </Button>
                <IconButton
                  appearance="primary"
                  color={color}
                  size={size}
                  active={active}
                  icon={
                    <span className="rs-icon" data-glyph="">
                      +
                    </span>
                  }
                  style={{ transition: 'none' }}
                >
                  Save
                </IconButton>
              </div>
            ))
          )}
        </CustomProvider>
      );

      for (const button of screen.getAllByRole('button')) {
        const surface = background(button);
        if (button.dataset.loading === 'true') {
          const spinner = button.querySelector('.rs-btn-spin')!;
          const rotor = rgba(getComputedStyle(spinner, '::after').borderTopColor);
          expect(contrast(rotor, surface)).toBeGreaterThanOrEqual(3);
          expect(rgba(getComputedStyle(button).color)[3]).toBe(0);
        } else {
          expect(contrast(rgba(getComputedStyle(button).color), surface)).toBeGreaterThanOrEqual(
            4.5
          );
          const glyph = button.querySelector('[data-glyph]');
          if (glyph)
            expect(
              contrast(rgba(getComputedStyle(glyph).color), background(glyph))
            ).toBeGreaterThanOrEqual(3);
        }
      }
    });

    it('updates an opaque background token without rendering React again', () => {
      render(
        <CustomProvider theme={theme}>
          <Button appearance="primary" style={{ transition: 'none' }}>
            Save
          </Button>
        </CustomProvider>
      );
      const button = screen.getByRole('button');
      const text = button.firstChild;
      for (const color of ['#fff', '#000', '#757575', '#767676', '#ff5733']) {
        button.style.setProperty('--rs-btn-primary-bg', color);
        expect(
          contrast(rgba(getComputedStyle(button).color), background(button))
        ).toBeGreaterThanOrEqual(4.5);
        expect(button.firstChild).toBe(text);
      }
    });

    it('preserves an inherited explicit foreground token for all primary colors', () => {
      const { container } = render(
        <CustomProvider theme={theme}>
          <div data-testid="theme">
            {colors.map((color, index) => (
              <Button key={index} appearance="primary" color={color} style={{ transition: 'none' }}>
                Save
              </Button>
            ))}
          </div>
        </CustomProvider>
      );
      screen.getByTestId('theme').style.setProperty('--rs-btn-primary-text', '#14283c');
      for (const button of container.querySelectorAll('button')) {
        rgba(getComputedStyle(button).color).forEach((channel, index) => {
          expect(channel).toBeCloseTo([20, 40, 60, 1][index], 3);
        });
      }
    });
  }
);
