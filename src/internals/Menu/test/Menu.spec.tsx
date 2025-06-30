import React from 'react';
import userEvent from '@testing-library/user-event';
import Menu from '../Menu';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';

describe('<Menu>', () => {
  it('Should open menu initially when defaultOpen=true', () => {
    render(
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

    expect(screen.getByRole('menu')).not.to.have.attribute('hidden');
  });

  it('Should display/hide menu according to controlled `open` prop', () => {
    const { rerender } = render(
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

    expect(screen.getByRole('menu')).not.to.have.attribute('hidden');

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

    expect(screen.queryByRole('menu')).not.to.exist;
  });

  it('Closes menu and moves focus to button when clicking outside', async () => {
    render(
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

    const button = screen.getByTestId('button');
    const menu = screen.getByTestId('menu');

    fireEvent.click(button);

    await waitFor(() => {
      expect(menu).not.to.have.attribute('hidden');
    });

    const focusSpy = vi.spyOn(button, 'focus');

    userEvent.click(screen.getByTestId('div'));

    await waitFor(() => {
      expect(menu).to.have.attribute('hidden');
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  it('Closes menu but dont move focus to button when clicking on a focusable element outside', async () => {
    render(
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

    const button = screen.getByTestId('button');
    const menu = screen.getByTestId('menu');

    fireEvent.click(button);

    await waitFor(() => {
      expect(menu).not.to.have.attribute('hidden');
    });

    const focusSpy = vi.spyOn(button, 'focus');

    userEvent.click(screen.getByTestId('outside-button'));

    await waitFor(() => {
      expect(menu).to.have.attribute('hidden');
      expect(focusSpy).not.toHaveBeenCalled();
    });
  });
  it('Closes menu when focus is moving outside of menu', () => {
    render(
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

    const button = screen.getByTestId('button');
    const menu = screen.getByTestId('menu');

    fireEvent.click(button);
    expect(menu).not.to.have.attribute('hidden');

    fireEvent.blur(screen.getByTestId('container'));
    expect(menu).to.have.attribute('hidden');
  });

  it('Should call onToggleMenu when focus or blur', () => {
    const onToggleMenu = vi.fn();
    render(
      <div>
        <Menu
          renderMenuButton={(buttonProps, buttonRef) => (
            <button ref={buttonRef} {...buttonProps} data-testid="button">
              Button
            </button>
          )}
          renderMenuPopup={({ open, ...popupProps }, popupRef) => (
            <ul ref={popupRef} {...popupProps} hidden={!open} />
          )}
          onToggleMenu={onToggleMenu}
        >
          {(containerProps, containerRef) => <div ref={containerRef} {...containerProps} />}
        </Menu>
        <input data-testid="input" />
      </div>
    );

    const button = screen.getByTestId('button');
    const input = screen.getByTestId('input');

    userEvent.click(button);

    expect(button).to.have.focus;
    expect(onToggleMenu).toHaveBeenNthCalledWith(1, true, expect.any(Object));

    userEvent.click(input);

    expect(input).to.have.focus;
    expect(onToggleMenu).toHaveBeenNthCalledWith(2, false, expect.any(Object));
  });
});
