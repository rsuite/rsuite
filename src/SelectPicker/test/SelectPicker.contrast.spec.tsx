import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import SelectPicker from '../SelectPicker';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

function textContrast(element: HTMLElement) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d')!;
  const ancestors: Element[] = [];
  for (let node: Element | null = element; node; node = node.parentElement) ancestors.unshift(node);
  context.fillStyle = 'white';
  context.fillRect(0, 0, 1, 1);
  for (const ancestor of ancestors) {
    context.fillStyle = getComputedStyle(ancestor).backgroundColor;
    context.fillRect(0, 0, 1, 1);
  }
  const luminance = () => {
    const channels = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map(channel => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const background = luminance();
  context.fillStyle = getComputedStyle(element).color;
  context.fillRect(0, 0, 1, 1);
  const foreground = luminance();
  return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
}

describe('SelectPicker option contrast', () => {
  it.each(['light', 'dark', 'high-contrast'] as const)(
    'keeps selected, keyboard-focused and hovered text readable in the %s theme',
    async theme => {
      const bodyClassName = document.body.className;
      const onKeyDown = vi.fn<(event: KeyboardEvent) => void>();
      try {
        render(
          <CustomProvider theme={theme}>
            <SelectPicker
              aria-label="Items"
              data={Array.from({ length: 30 }, (_, index) => ({
                label: `Item ${index + 1}`,
                value: String(index + 1)
              }))}
              defaultValue="2"
              responsive={false}
              virtualized
              listboxMaxHeight={180}
            />
          </CustomProvider>
        );
        const combobox = screen.getByRole('combobox', { name: 'Items' });
        combobox.addEventListener('keydown', onKeyDown);
        await act(async () => userEvent.click(combobox));
        const listbox = await screen.findByRole('listbox');
        const selected = listbox.querySelector<HTMLElement>('.rs-picker-select-menu-item-active')!;
        const selectedContrast = textContrast(selected);

        act(() => combobox.focus());
        await act(async () => userEvent.keyboard('{ArrowDown}'));
        await waitFor(() => {
          const id = combobox.getAttribute('aria-activedescendant');
          expect(id).toBeTruthy();
          expect(document.getElementById(id!)).toBeInTheDocument();
        });
        const focused = listbox.querySelector<HTMLElement>('.rs-picker-select-menu-item-focus')!;
        const focusedContrast = textContrast(focused);
        expect(onKeyDown.mock.calls.at(-1)?.[0].isTrusted).toBe(true);

        const hovered = screen.getByText('Item 1');
        await act(async () => userEvent.hover(hovered));
        expect(hovered.matches(':hover')).toBe(true);
        const hoveredContrast = textContrast(hovered);

        expect.soft(selectedContrast, 'selected option text').toBeGreaterThanOrEqual(4.5);
        expect.soft(focusedContrast, 'keyboard-focused option text').toBeGreaterThanOrEqual(4.5);
        expect.soft(hoveredContrast, 'hovered option text').toBeGreaterThanOrEqual(4.5);
      } finally {
        document.body.className = bodyClassName;
      }
    }
  );
});
