import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import Menu from '../Menu';

describe('<Menu>', () => {
  it('Closes menu when focus is moving outside of menu', () => {
    const { getByTestId } = render(
      <Menu
        renderMenuButton={(buttonProps, buttonRef) => (
          <button ref={buttonRef} {...buttonProps} data-testid="button">
            Button
          </button>
        )}
        renderMenuPopup={({ open, ...popupProps }, popupRef) => (
          <ul ref={popupRef} {...popupProps} hidden={!open} data-testid="menu" />
        )}
      >
        {(containerProps, containerRef) => (
          <div ref={containerRef} {...containerProps} data-testid="container" />
        )}
      </Menu>
    );

    const button = getByTestId('button');
    const menu = getByTestId('menu');

    act(() => {
      fireEvent.click(button);
    });
    expect(!menu.hidden, 'Menu is open').to.be.true;

    act(() => {
      fireEvent.blur(getByTestId('container'));
    });
    expect(menu.hidden, 'Menu is closed').to.be.true;
  });
});
