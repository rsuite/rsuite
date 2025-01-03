import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import DropdownMenu from '../DropdownMenu';
import DropdownItem from '../DropdownItem';
import Dropdown from '../Dropdown';
import userEvent from '@testing-library/user-event';
import { testStandardProps } from '@test/utils';

describe('<Dropdown.Menu>', () => {
  testStandardProps(<DropdownMenu />);

  it('Should render a vertical ARIA menubar when used alone', () => {
    const { container } = render(
      <DropdownMenu>
        <DropdownItem>1</DropdownItem>
        <DropdownItem>2</DropdownItem>
      </DropdownMenu>
    );

    expect(container.firstChild).to.have.attr('role', 'menubar');
    expect(container.firstChild).to.have.attr('aria-orientation', 'vertical');

    expect(container.firstChild).to.have.class('rs-dropdown-menu');
    expect(screen.getAllByRole('menuitem')).to.have.lengthOf(2);
  });

  it('Should render a submenu when used inside <Dropdown>', () => {
    render(
      <Dropdown.Menu title="Submenu">
        <Dropdown.Item>Submenu item</Dropdown.Item>
      </Dropdown.Menu>,
      {
        wrapper: Dropdown
      }
    );

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('menuitem')).to.have.attr('aria-haspopup', 'menu');
  });

  it('Should render a submenu when used inside another <Dropdown.Menu>', () => {
    render(
      <Dropdown.Menu>
        <Dropdown.Menu title="Submenu">
          <Dropdown.Item id="submenu-item">Submenu item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Menu>
    );

    expect(screen.getByRole('menuitem')).to.have.attribute('aria-haspopup', 'menu');
  });

  // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#menu
  describe('Keyboard interaction & Focus management', () => {
    function renderMenubar(ui, focusAfterRender = true) {
      const { container } = render(ui);

      if (focusAfterRender && container.firstChild) {
        fireEvent.focus(container.firstChild);
      }

      return container.firstChild as HTMLElement;
    }

    it('When a menubar receives focus, keyboard focus is placed on the first item.', () => {
      const menubar = renderMenubar(
        <DropdownMenu>
          <DropdownItem id="first-item">First item</DropdownItem>
        </DropdownMenu>
      );
      expect(menubar).to.have.attr('aria-activedescendant', 'first-item');
    });

    it('Clicking a menuitem moves focus onto the menuitem.', () => {
      const menubar = renderMenubar(
        <DropdownMenu>
          <DropdownItem id="first-item">First item</DropdownItem>
          <DropdownItem id="second-item">Second item</DropdownItem>
        </DropdownMenu>,
        false
      );

      fireEvent.mouseDown(screen.getByText('Second item'));
      expect(menubar).to.have.attr('aria-activedescendant', 'second-item');
    });

    describe('Down Arrow', () => {
      it('Moves focus to the next item', () => {
        const menubar = renderMenubar(
          <DropdownMenu>
            <DropdownItem id="first-item">First item</DropdownItem>
            <DropdownItem id="second-item">Second item</DropdownItem>
          </DropdownMenu>
        );
        fireEvent.keyDown(menubar, { key: 'ArrowDown' });
        expect(menubar).to.have.attr('aria-activedescendant', 'second-item');
      });
    });

    describe('Up Arrow', () => {
      it('Moves focus to the previous item', () => {
        const menubar = renderMenubar(
          <DropdownMenu>
            <DropdownItem id="first-item">First item</DropdownItem>
            <DropdownItem id="second-item">Second item</DropdownItem>
          </DropdownMenu>
        );
        fireEvent.keyDown(menubar, { key: 'ArrowDown' });
        fireEvent.keyDown(menubar, { key: 'ArrowUp' });
        expect(menubar).to.have.attr('aria-activedescendant', 'first-item');
      });
    });

    describe('End', () => {
      it('Moves focus to the last item', () => {
        const menubar = renderMenubar(
          <DropdownMenu>
            <DropdownItem id="first-item">First item</DropdownItem>
            <DropdownItem>Second item</DropdownItem>
            <DropdownItem id="last-item">Third item</DropdownItem>
          </DropdownMenu>
        );
        fireEvent.keyDown(menubar, { key: 'End' });
        expect(menubar).to.have.attr('aria-activedescendant', 'last-item');
      });
    });

    describe('Home', () => {
      it('Moves focus to the first item', () => {
        const menubar = renderMenubar(
          <DropdownMenu>
            <DropdownItem id="first-item">First item</DropdownItem>
            <DropdownItem>Second item</DropdownItem>
            <DropdownItem id="last-item">Third item</DropdownItem>
          </DropdownMenu>
        );
        fireEvent.keyDown(menubar, { key: 'End' });
        fireEvent.keyDown(menubar, { key: 'Home' });
        expect(menubar).to.have.attr('aria-activedescendant', 'first-item');
      });
    });

    describe('Enter', () => {
      it('Activates the item with focus.', () => {
        const onSelectSpy = sinon.spy();
        const onSelectItemSpy = sinon.spy();

        const menubar = renderMenubar(
          <DropdownMenu onSelect={onSelectSpy}>
            <DropdownItem eventKey="active-item" onSelect={onSelectItemSpy}>
              First item
            </DropdownItem>
          </DropdownMenu>
        );

        fireEvent.keyDown(menubar, { key: 'Enter' });
        expect(onSelectItemSpy).to.have.been.called;
        expect(onSelectSpy).to.have.been.calledWith('active-item');
      });
    });

    describe('Space', () => {
      it('Activates the item with focus.', () => {
        const onSelectSpy = sinon.spy();
        const onSelectItemSpy = sinon.spy();

        const menubar = renderMenubar(
          <DropdownMenu onSelect={onSelectSpy}>
            <DropdownItem eventKey="active-item" onSelect={onSelectItemSpy}>
              First item
            </DropdownItem>
          </DropdownMenu>
        );
        fireEvent.keyDown(menubar, { key: ' ' });
        expect(onSelectItemSpy).to.have.been.called;
        expect(onSelectSpy).to.have.been.calledWith('active-item');
      });
    });
  });

  it('Should call Dropdown.Menu onSelect callback only once', () => {
    const onSelectSpy = sinon.spy();

    render(
      <DropdownMenu onSelect={onSelectSpy}>
        <DropdownItem data-testid="item-1" eventKey={1}>
          1
        </DropdownItem>
        <DropdownItem eventKey={2}>2</DropdownItem>
        <DropdownItem eventKey={3}>3</DropdownItem>
      </DropdownMenu>
    );

    fireEvent.click(screen.getByTestId('item-1'));

    expect(onSelectSpy.callCount).to.be.eq(1);
  });

  it('Should highlight menu item when hover', () => {
    render(
      <DropdownMenu>
        <DropdownItem data-testid="item-1">1</DropdownItem>
        <DropdownItem>2</DropdownItem>
        <DropdownItem>3</DropdownItem>
        <DropdownItem>4</DropdownItem>
      </DropdownMenu>
    );

    const menuItem = screen.getByTestId('item-1');

    fireEvent.mouseOver(menuItem);

    expect(menuItem).to.have.class('rs-dropdown-item-focus');

    fireEvent.mouseOut(menuItem);

    expect(menuItem).not.to.have.class('rs-dropdown-item-focus');
  });

  it('Should call onSelect callback with correct `eventKey`', () => {
    const onSelectSpy = sinon.spy();

    render(
      <DropdownMenu onSelect={onSelectSpy} activeKey={1}>
        <DropdownItem eventKey={1}>1</DropdownItem>
        <DropdownItem eventKey={2}>2</DropdownItem>
        <DropdownItem eventKey={3}>3</DropdownItem>
      </DropdownMenu>
    );

    fireEvent.click(screen.getByRole('menuitem', { name: '3' }), {
      bubbles: true
    });

    expect(onSelectSpy).to.have.been.called;
    expect(onSelectSpy).to.have.been.calledWith(3);
  });

  it('Should not move visual focus to first item when focus on an focusable element within', () => {
    render(
      <DropdownMenu data-testid="menu">
        <DropdownItem panel>
          <input data-testid="input" />
        </DropdownItem>
        <DropdownItem data-testid="item1">Item 1</DropdownItem>
      </DropdownMenu>
    );

    fireEvent.focus(screen.getByTestId('input'), { bubbles: true });

    expect(screen.getByTestId('menu')).not.to.have.attr('aria-activedescendant');
  });

  it('Should not throw error when items are unmounted and keydown event is triggered', () => {
    const { rerender } = render(
      <DropdownMenu data-testid="menu">
        <DropdownItem panel>
          <input data-testid="input" />
        </DropdownItem>
        <DropdownItem data-testid="item1">Item 1</DropdownItem>
      </DropdownMenu>
    );

    fireEvent.focus(screen.getByTestId('input'), { bubbles: true });

    rerender(
      <DropdownMenu data-testid="menu">
        <DropdownItem panel>
          <input data-testid="input" />
        </DropdownItem>
      </DropdownMenu>
    );

    userEvent.type(screen.getByTestId('input'), 'f');
  });

  it('Should have a custom className', () => {
    render(<DropdownMenu className="custom" data-testid="menu" />);
    expect(screen.getByTestId('menu'))
      .to.have.class('custom')
      .and.to.have.class('rs-dropdown-menu');
  });
});
