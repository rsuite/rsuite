import React, { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import Dropdown from '../Dropdown';

describe('Dropdown selectable menu roles', () => {
  const roles = ['menuitem', 'menuitemradio', 'menuitemcheckbox'] as const;
  const inputs = ['pointer', 'Enter', 'Space'] as const;

  describe.each(roles)('%s', role => {
    it.each(inputs)('activates using %s', async input => {
      const onSelect = vi.fn();
      const onClose = vi.fn();

      function Example() {
        const [checked, setChecked] = useState(false);
        return (
          <Dropdown title="Options" onClose={onClose}>
            <Dropdown.Item
              role={role}
              active={checked}
              onSelect={() => {
                onSelect();
                setChecked(true);
              }}
            >
              Option
            </Dropdown.Item>
          </Dropdown>
        );
      }

      render(<Example />);
      const toggle = screen.getByRole('button', { name: 'Options' });
      if (input === 'pointer') {
        await userEvent.click(toggle);
      } else {
        toggle.focus();
        await userEvent.keyboard('{Enter}');
      }

      const menu = screen.getByRole('menu');
      const item = screen.getByRole(role);
      if (role !== 'menuitem') {
        expect(item.getAttribute('aria-checked')).toBe('false');
      }
      if (input === 'pointer') {
        await userEvent.click(screen.getByText('Option'));
      } else {
        await waitFor(() => {
          expect(document.activeElement).toBe(menu);
          expect(menu.getAttribute('aria-activedescendant')).toBe(item.id);
        });
        await userEvent.keyboard(`{${input}}`);
      }

      expect(onSelect).toHaveBeenCalledTimes(1);
      if (role !== 'menuitem') {
        expect(item.getAttribute('aria-checked')).toBe('true');
      }
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(menu.hidden).toBe(true);
      expect(document.activeElement).toBe(toggle);
    });
  });

  it('keeps a submenu open for a disabled choice and closes it for an enabled choice', () => {
    const onSelect = vi.fn();
    const onDisabledSelect = vi.fn();
    render(
      <Dropdown title="Options">
        <Dropdown.Menu title="Formatting">
          <Dropdown.Item role="menuitemcheckbox" disabled onSelect={onDisabledSelect}>
            Disabled
          </Dropdown.Item>
          <Dropdown.Item role="menuitemradio" onSelect={onSelect}>
            Enabled
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    const toggle = screen.getByRole('button', { name: 'Options' });
    fireEvent.keyDown(toggle, { key: 'Enter' });
    const menu = screen.getByRole('menu', { name: 'Options' });
    fireEvent.keyDown(menu, { key: 'ArrowRight' });
    const submenu = screen.getByRole('menu', { name: 'Formatting' });

    fireEvent.click(screen.getByText('Disabled'));
    expect(onDisabledSelect).not.toHaveBeenCalled();
    expect(submenu.hidden).toBe(false);
    expect(menu.hidden).toBe(false);

    fireEvent.click(screen.getByText('Enabled'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(submenu.hidden).toBe(true);
    expect(menu.hidden).toBe(true);
    expect(document.activeElement).toBe(toggle);
  });
});
