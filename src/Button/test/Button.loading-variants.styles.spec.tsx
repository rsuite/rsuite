import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from '../Button';
import IconButton from '../../IconButton';
import CustomProvider from '../../CustomProvider';
import { rgba } from '../../../test/browser/contrast';
import '../styles/index.scss';
import '../../IconButton/styles/index.scss';

const variants = (['xs', 'sm', 'md', 'lg'] as const).flatMap(size =>
  (['default', 'primary'] as const).flatMap(appearance =>
    (['button', 'circle'] as const).map(shape => ({ size, appearance, shape }))
  )
);

describe.each(['light', 'dark', 'high-contrast'] as const)(
  'Button loading variants (%s)',
  theme => {
    it.each(variants)(
      'uses its own $size/$appearance/$shape spinner styles',
      ({ size, appearance, shape }) => {
        render(
          <CustomProvider theme={theme}>
            {shape === 'circle' ? (
              <IconButton
                size={size}
                appearance={appearance}
                circle
                loading
                icon={
                  <svg width="12" height="12" aria-hidden="true">
                    <path d="M1 5h4V1h2v4h4v2H7v4H5V7H1z" />
                  </svg>
                }
                aria-label="Action"
              />
            ) : (
              <Button size={size} appearance={appearance} loading>
                <span style={{ color: 'red' }}>Action</span>
              </Button>
            )}
            <span
              data-testid="ring"
              style={{
                color: appearance === 'primary' ? 'rgba(0, 0, 0, 0.3)' : 'var(--rs-loader-ring)'
              }}
            />
            <span
              data-testid="rotor"
              style={{
                color: appearance === 'primary' ? '#000' : 'var(--rs-loader-rotor)'
              }}
            />
          </CustomProvider>
        );
        const button = screen.getByRole('button', { name: 'Action' });
        const spinner = button.querySelector('.rs-btn-spin')!;
        for (const pseudo of ['::before', '::after']) {
          const style = getComputedStyle(spinner, pseudo);
          expect(style.width).toBe(size === 'xs' ? '16px' : '18px');
          expect(style.height).toBe(size === 'xs' ? '16px' : '18px');
        }
        expect(rgba(getComputedStyle(spinner, '::before').borderTopColor)).toEqual(
          appearance === 'primary'
            ? [0, 0, 0, 0.3]
            : rgba(getComputedStyle(screen.getByTestId('ring')).color)
        );
        expect(rgba(getComputedStyle(spinner, '::after').borderTopColor)).toEqual(
          appearance === 'primary'
            ? [0, 0, 0, 1]
            : rgba(getComputedStyle(screen.getByTestId('rotor')).color)
        );
        expect(button).toHaveAttribute('aria-busy', 'true');
        expect(button).toHaveAccessibleName('Action');
        expect(getComputedStyle(button).getPropertyValue('-webkit-text-fill-color')).toBe(
          'rgba(0, 0, 0, 0)'
        );
        for (const child of button.children) {
          if (!child.classList.contains('rs-btn-spin'))
            expect(getComputedStyle(child).opacity).toBe('0');
        }
      }
    );

    it('does not inherit an ancestor button size or appearance', () => {
      render(
        <CustomProvider theme={theme}>
          <div className="rs-btn" data-size="xs" data-appearance="primary">
            <Button size="lg" appearance="default" loading>
              Action
            </Button>
          </div>
          <span data-testid="ring" style={{ color: 'var(--rs-loader-ring)' }} />
          <span data-testid="rotor" style={{ color: 'var(--rs-loader-rotor)' }} />
        </CustomProvider>
      );
      const spinner = screen.getByRole('button', { name: 'Action' }).querySelector('.rs-btn-spin')!;
      expect(getComputedStyle(spinner, '::before').width).toBe('18px');
      expect(getComputedStyle(spinner, '::after').width).toBe('18px');
      expect(getComputedStyle(spinner, '::before').borderTopColor).toBe(
        getComputedStyle(screen.getByTestId('ring')).color
      );
      expect(getComputedStyle(spinner, '::after').borderTopColor).toBe(
        getComputedStyle(screen.getByTestId('rotor')).color
      );
    });
  }
);
