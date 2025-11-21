import React from 'react';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';

function renderMenuItem(ui) {
  return render(
    <Menu
      renderMenuPopup={(props, ref) => (
        <ul ref={ref} {...props}>
          {ui}
        </ul>
      )}
    >
      {(containerProps, containerRef) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { children, ...rest } = containerProps;

        return <div ref={containerRef} {...rest} data-testid="container" />;
      }}
    </Menu>
  );
}

describe('Menu - MenuItem', () => {
  it('Should not be active when activeDecsendant is empty', () => {
    const renderProp = vi.fn((props, ref) => <li ref={ref} {...props}></li>);

    renderMenuItem(<MenuItem>{renderProp}</MenuItem>);

    expect(renderProp).not.toHaveBeenCalledWith(expect.objectContaining({ active: true }));
  });
});
