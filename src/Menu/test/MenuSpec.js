import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from '../Menu';

afterEach(() => {
  sinon.restore();
});

describe('<Menu>', () => {
  it('Should open menu initially when defaultOpen=true', () => {
    const { getByRole } = render(
      <Menu
        defaultOpen
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

    expect(getByRole('menu')).to.be.visible;
  });

  it('Should display/hide menu according to controlled `open` prop', () => {
    const { getByRole, queryByRole, rerender } = render(
      <Menu
        open
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

    expect(getByRole('menu')).to.be.visible;

    rerender(
      <Menu
        open={false}
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

    expect(queryByRole('menu')).not.to.exist;
  });

  it('Closes menu and moves focus to button when clicking outside', async () => {
    const { getByTestId } = render(
      <div data-testid="div">
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
      </div>
    );

    const button = getByTestId('button');
    const menu = getByTestId('menu');

    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(menu).to.be.visible;
    });

    sinon.spy(button, 'focus');

    act(() => {
      userEvent.click(getByTestId('div'));
    });

    await waitFor(() => {
      expect(menu).not.to.be.visible;
      expect(button.focus).to.have.been.called;
    });
  });
  it('Closes menu but dont move focus to button when clicking on a focusable element outside', async () => {
    const { getByTestId } = render(
      <div>
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
        <button data-testid="outside-button">Another button</button>
      </div>
    );

    const button = getByTestId('button');
    const menu = getByTestId('menu');

    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(menu).to.be.visible;
    });

    sinon.spy(button, 'focus');

    act(() => {
      userEvent.click(getByTestId('outside-button'));
    });

    await waitFor(() => {
      expect(menu).not.to.be.visible;
      expect(button.focus).not.to.have.been.called;
    });
  });
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
    expect(menu).to.be.visible;

    act(() => {
      fireEvent.blur(getByTestId('container'));
    });
    expect(menu).not.to.be.visible;
  });
});
