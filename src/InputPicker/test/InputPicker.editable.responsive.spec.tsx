import React from 'react';
import { getAnimationEnd } from '../../Animation/utils';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import MatchMediaMock from '@test/mocks/matchmedia-mock';
import InputPicker from '..';
import TagPicker from '../../TagPicker';

const data = [
  { label: 'Alpha', value: 'a' },
  { label: 'Beta', value: 'b' }
];

describe.each([
  { name: 'InputPicker', Picker: InputPicker },
  { name: 'TagPicker', Picker: TagPicker }
])('$name responsive input ownership', ({ Picker }) => {
  it.each([false, true])(
    'associates the appropriate input and popup (mobile: %s)',
    async mobile => {
      const originalMatchMedia = window.matchMedia;
      const originalWidth = window.innerWidth;
      const media = new MatchMediaMock();
      const host = document.createElement('div');
      document.body.append(host);
      let unmount: (() => void) | undefined;
      try {
        if (mobile) {
          Object.assign(window, { innerWidth: 390 });
          window.dispatchEvent(new Event('resize'));
        }
        const element = <Picker id="country" aria-label="Country" data={data} responsive />;
        await act(async () => {
          unmount = render(element, { container: host }).unmount;
        });
        const owner = screen.getByRole('combobox', { name: 'Country' });
        expect(owner.id).to.equal('country');
        expect(host.querySelectorAll('#country')).to.have.length(1);
        fireEvent.click(owner);
        if (mobile) {
          const dialog = screen.getByRole('dialog', { name: 'Country' });
          expect(owner).to.have.attr('aria-haspopup', 'dialog');
          expect(document.getElementById(owner.getAttribute('aria-controls')!)).to.equal(dialog);
          const input = within(dialog).getByRole('combobox', { name: 'Country' });
          expect(input.id).to.equal('country-search');
          expect(input).to.have.attr('aria-haspopup', 'listbox');
          await waitFor(() => expect(input).to.have.focus);
          fireEvent.change(input, { target: { value: 'b' } });
          expect(document.getElementById(input.getAttribute('aria-controls')!)).to.equal(
            document.querySelector('.rs-picker-listbox')
          );
          expect(input).to.have.attr(
            'aria-activedescendant',
            screen.getByRole('option', { name: 'Beta' }).id
          );
        } else {
          expect(owner).to.have.tagName('INPUT');
          expect(owner).to.have.attr('aria-haspopup', 'listbox');
          expect(document.getElementById(owner.getAttribute('aria-controls')!)).to.equal(
            document.querySelector('.rs-picker-listbox')
          );
        }
      } finally {
        await act(async () => {
          unmount?.();
        });
        host.remove();
        media.clear();
        Object.assign(window, { innerWidth: originalWidth });
        Object.defineProperty(window, 'matchMedia', {
          configurable: true,
          writable: true,
          value: originalMatchMedia
        });
      }
    }
  );
  it('preserves focus chosen by the consumer when the responsive dialog opens', async () => {
    const originalMatchMedia = window.matchMedia;
    const originalWidth = window.innerWidth;
    const media = new MatchMediaMock();
    let unmount: (() => void) | undefined;
    const onEnter = vi.fn(() => screen.getByRole('button', { name: 'Footer action' }).focus());
    try {
      Object.assign(window, { innerWidth: 390 });
      window.dispatchEvent(new Event('resize'));
      unmount = render(
        <Picker
          data={data}
          responsive
          aria-label="Country"
          onEnter={onEnter}
          renderExtraFooter={() => <button>Footer action</button>}
        />
      ).unmount;
      await act(() => userEvent.click(screen.getByRole('combobox', { name: 'Country' })));
      expect(onEnter).toHaveBeenCalledTimes(1);
      await act(async () => {
        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
      });
      expect(screen.getByRole('button', { name: 'Footer action' })).to.have.focus;
    } finally {
      unmount?.();
      media.clear();
      Object.assign(window, { innerWidth: originalWidth });
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        writable: true,
        value: originalMatchMedia
      });
    }
  });
  it('preserves focus chosen by onExited after the responsive dialog closes', async () => {
    const originalMatchMedia = window.matchMedia;
    const originalWidth = window.innerWidth;
    const media = new MatchMediaMock();
    let unmount: (() => void) | undefined;
    const onExited = vi.fn(() => screen.getByRole('button', { name: 'Next control' }).focus());
    try {
      Object.assign(window, { innerWidth: 390 });
      window.dispatchEvent(new Event('resize'));
      unmount = render(
        <>
          <Picker data={data} responsive aria-label="Country" onExited={onExited} />
          <button>Next control</button>
        </>
      ).unmount;
      await act(() => userEvent.click(screen.getByRole('combobox', { name: 'Country' })));
      const dialog = screen.getByRole('dialog', { name: 'Country' });
      const input = within(dialog).getByRole('combobox', { name: 'Country' });
      fireEvent(dialog, new Event(getAnimationEnd()));
      await waitFor(() => expect(input).to.have.focus);
      await act(() => userEvent.keyboard('{Escape}'));
      fireEvent(dialog, new Event(getAnimationEnd()));
      expect(onExited).toHaveBeenCalledTimes(1);
      await act(async () => {
        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
      });
      expect(screen.getByRole('button', { name: 'Next control' })).to.have.focus;
    } finally {
      unmount?.();
      media.clear();
      Object.assign(window, { innerWidth: originalWidth });
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        writable: true,
        value: originalMatchMedia
      });
    }
  });
  it('switches an open picker between inline input and dialog without duplicate public ids', async () => {
    const originalMatchMedia = window.matchMedia;
    const originalWidth = window.innerWidth;
    const media = new MatchMediaMock();
    try {
      Object.assign(window, { innerWidth: 1280 });
      window.dispatchEvent(new Event('resize'));
      const { unmount } = render(
        <Picker id="country" aria-label="Country" data={data} responsive open />
      );
      try {
        const inline = screen.getByRole('combobox', { name: 'Country' });
        expect(inline).to.have.tagName('INPUT');
        await act(async () => {
          Object.assign(window, { innerWidth: 390 });
          window.dispatchEvent(new Event('resize'));
        });
        const dialog = screen.getByRole('dialog', { name: 'Country' });
        const input = within(dialog).getByRole('combobox', { name: 'Country' });
        await waitFor(() => expect(input).to.have.focus);
        expect(document.querySelectorAll('#country')).to.have.length(1);
        await act(async () => {
          Object.assign(window, { innerWidth: 1280 });
          window.dispatchEvent(new Event('resize'));
        });
        await waitFor(() => expect(screen.queryByRole('dialog')).to.be.null);
        expect(screen.getByRole('combobox', { name: 'Country' })).to.have.tagName('INPUT');
        expect(document.querySelectorAll('#country')).to.have.length(1);
      } finally {
        unmount();
      }
    } finally {
      media.clear();
      Object.assign(window, { innerWidth: originalWidth });
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        writable: true,
        value: originalMatchMedia
      });
    }
  });
  it('uses the same labelledby name for the inline input and responsive dialog', async () => {
    const originalMatchMedia = window.matchMedia;
    const originalWidth = window.innerWidth;
    const media = new MatchMediaMock();
    try {
      Object.assign(window, { innerWidth: 1280 });
      window.dispatchEvent(new Event('resize'));
      const { unmount } = render(
        <>
          <span id="country-name">Country name</span>
          <Picker
            data={data}
            responsive
            open
            aria-label="Fallback"
            aria-labelledby="country-name"
          />
        </>
      );
      try {
        expect(screen.getByRole('combobox', { name: 'Country name' })).to.have.tagName('INPUT');
        await act(async () => {
          Object.assign(window, { innerWidth: 390 });
          window.dispatchEvent(new Event('resize'));
        });
        const dialog = screen.getByRole('dialog', { name: 'Country name' });
        expect(within(dialog).getByRole('combobox', { name: 'Country name' })).to.exist;
      } finally {
        unmount();
      }
    } finally {
      media.clear();
      Object.assign(window, { innerWidth: originalWidth });
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        writable: true,
        value: originalMatchMedia
      });
    }
  });
});
