import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import Menu from '../Menu';

afterEach(() => {
  sinon.restore();
});

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

    expect(screen.getByRole('menu')).to.be.visible;
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

    expect(screen.getByRole('menu')).to.be.visible;

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
      expect(menu).to.be.visible;
    });

    sinon.spy(button, 'focus');

    userEvent.click(screen.getByTestId('div'));

    await waitFor(() => {
      expect(menu).not.to.be.visible;
      expect(button.focus).to.have.been.called;
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
      expect(menu).to.be.visible;
    });

    sinon.spy(button, 'focus');

    userEvent.click(screen.getByTestId('outside-button'));

    await waitFor(() => {
      expect(menu).not.to.be.visible;
      expect(button.focus).not.to.have.been.called;
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
    expect(menu).to.be.visible;

    fireEvent.blur(screen.getByTestId('container'));
    expect(menu).not.to.be.visible;
  });

  it('Should call onToggleMenu when focus or blur', () => {
    const onToggleMenuSpy = sinon.spy();
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
          onToggleMenu={onToggleMenuSpy}
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
    expect(onToggleMenuSpy.firstCall).to.have.been.calledWith(true);

    userEvent.click(input);

    expect(input).to.have.focus;
    expect(onToggleMenuSpy.secondCall).to.have.been.calledWith(false);
  });
});
