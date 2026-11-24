import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AutoComplete from '../AutoComplete';

const data = ['a', 'ab'];

const getControlledPopup = (combobox: HTMLElement) => {
  const popupId = combobox.getAttribute('aria-controls');
  return popupId ? document.getElementById(popupId) : null;
};

describe('AutoComplete popup association', () => {
  it('associates the focused input and active option with its portaled listbox', () => {
    const { container } = render(<AutoComplete data={data} defaultValue="a" open />);
    const combobox = screen.getByRole('combobox');
    const listbox = screen.getByRole('listbox');

    expect(container.contains(listbox)).toBe(false);
    expect(document.body.contains(listbox)).toBe(true);
    expect(combobox.getAttribute('aria-expanded')).toBe('true');
    expect(getControlledPopup(combobox)).toBe(listbox);

    combobox.focus();
    fireEvent.keyDown(combobox, { key: 'ArrowDown' });

    const option = screen.getByRole('option', { name: 'ab' });
    expect(document.activeElement).toBe(combobox);
    expect(document.getElementById(combobox.getAttribute('aria-activedescendant')!)).toBe(option);
    expect(getControlledPopup(combobox)?.contains(option)).toBe(true);
  });

  it('uses the caller-provided input ID to reference the listbox', () => {
    render(<AutoComplete id="city" data={data} defaultValue="a" open />);
    const combobox = screen.getByRole('combobox');

    expect(combobox.id).toBe('city');
    expect(combobox.getAttribute('aria-controls')).toBe('city-listbox');
    expect(getControlledPopup(combobox)).toBe(screen.getByRole('listbox'));
  });

  it('associates the popup only while expanded', () => {
    const { rerender } = render(<AutoComplete data={data} defaultValue="a" open={false} />);
    const combobox = screen.getByRole('combobox');

    expect(screen.queryByRole('listbox')).toBeNull();
    expect(combobox.getAttribute('aria-controls')).toBeNull();
    expect(combobox.getAttribute('aria-expanded')).toBe('false');

    rerender(<AutoComplete data={data} defaultValue="a" open />);
    expect(getControlledPopup(combobox)).toBe(screen.getByRole('listbox'));

    rerender(<AutoComplete data={data} defaultValue="a" open={false} />);
    expect(combobox.getAttribute('aria-expanded')).toBe('false');
    expect(combobox.getAttribute('aria-controls')).toBeNull();
  });

  it.each(['readOnly', 'disabled'] as const)(
    'associates a controlled open popup even when the input is %s',
    lockedProp => {
      const props = { [lockedProp]: true };
      const { rerender } = render(<AutoComplete data={data} defaultValue="a" {...props} />);
      const combobox = screen.getByRole('combobox') as HTMLInputElement;

      expect(combobox[lockedProp]).toBe(true);
      expect(combobox.getAttribute('aria-expanded')).toBe('false');
      expect(combobox.getAttribute('aria-controls')).toBeNull();
      expect(screen.queryByRole('listbox')).toBeNull();

      rerender(<AutoComplete data={data} defaultValue="a" {...props} open />);
      expect(combobox[lockedProp]).toBe(true);
      expect(combobox.getAttribute('aria-expanded')).toBe('true');
      expect(getControlledPopup(combobox)).toBe(screen.getByRole('listbox'));
    }
  );

  it('references the original listbox when a custom renderer wraps it', () => {
    render(
      <AutoComplete
        data={data}
        defaultValue="a"
        open
        renderListbox={listbox => <section id="listbox-wrapper">{listbox}</section>}
      />
    );

    expect(getControlledPopup(screen.getByRole('combobox'))).toBe(screen.getByRole('listbox'));
    expect(getControlledPopup(screen.getByRole('combobox'))?.id).not.toBe('listbox-wrapper');
  });

  it('preserves explicit aria-controls for a replacement listbox', () => {
    render(
      <AutoComplete
        data={data}
        open
        aria-controls="custom-suggestions"
        renderListbox={() => (
          <div role="listbox" id="custom-suggestions">
            <div role="option">Custom suggestion</div>
          </div>
        )}
      />
    );

    expect(screen.getByRole('combobox').getAttribute('aria-controls')).toBe('custom-suggestions');
    expect(getControlledPopup(screen.getByRole('combobox'))).toBe(screen.getByRole('listbox'));
  });
});
