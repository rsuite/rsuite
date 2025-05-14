import React from 'react';
import sinon from 'sinon';
import Menu from '../Menu';
import PageIcon from '@rsuite/icons/Page';
import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

afterEach(() => {
  sinon.restore();
});

describe('Menu', () => {
  testStandardProps(<Menu />);

  it('Should render a menu with items', () => {
    render(
      <Menu>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
      </Menu>
    );

    expect(screen.getByRole('menu')).to.exist;
    expect(screen.getAllByRole('menuitem')).to.have.lengthOf(2);
  });

  describe('activeKey', () => {
    it('Should activate menu item when activeKey matches', () => {
      render(
        <Menu activeKey="2">
          <Menu.Item eventKey="1">Item 1</Menu.Item>
          <Menu.Item eventKey="2">Item 2</Menu.Item>
          <Menu.Item eventKey="3">Item 3</Menu.Item>
        </Menu>
      );

      const activeItem = screen.getByText('Item 2').closest('.rs-menu-item');
      const inactiveItem1 = screen.getByText('Item 1').closest('.rs-menu-item');
      const inactiveItem2 = screen.getByText('Item 3').closest('.rs-menu-item');

      expect(activeItem).to.have.class('rs-menu-item-active');
      expect(inactiveItem1).to.not.have.class('rs-menu-item-active');
      expect(inactiveItem2).to.not.have.class('rs-menu-item-active');
    });

    it('Should not activate any item when activeKey does not match', () => {
      render(
        <Menu activeKey="4">
          <Menu.Item eventKey="1">Item 1</Menu.Item>
          <Menu.Item eventKey="2">Item 2</Menu.Item>
        </Menu>
      );

      const items = screen.getAllByRole('menuitem');
      items.forEach(item => {
        expect(item).to.not.have.class('rs-menu-item-active');
      });
    });
  });

  describe('onSelect', () => {
    it('Should call onSelect with eventKey when item is clicked', () => {
      const onSelect = sinon.spy();

      render(
        <Menu onSelect={onSelect}>
          <Menu.Item eventKey="1">Item 1</Menu.Item>
          <Menu.Item eventKey="2">Item 2</Menu.Item>
        </Menu>
      );

      fireEvent.click(screen.getByText('Item 1'));
      expect(onSelect).to.have.been.calledOnce;
      expect(onSelect.firstCall.args[0]).to.equal('1');
      expect(onSelect.firstCall.args[1]).to.exist;
    });

    it('Should not call onSelect when clicking a disabled item', () => {
      const onSelect = sinon.spy();

      render(
        <Menu onSelect={onSelect}>
          <Menu.Item eventKey="1" disabled>
            Item 1
          </Menu.Item>
        </Menu>
      );

      fireEvent.click(screen.getByText('Item 1'));
      expect(onSelect).to.not.have.been.called;
    });

    it('Should call onSelect with undefined when item has no eventKey', () => {
      const onSelect = sinon.spy();

      render(
        <Menu onSelect={onSelect}>
          <Menu.Item>Item without key</Menu.Item>
        </Menu>
      );

      fireEvent.click(screen.getByText('Item without key'));
      expect(onSelect).to.have.been.calledWith(undefined);
    });

    it('Should handle both Menu onSelect and MenuItem onSelect', () => {
      const menuOnSelect = sinon.spy();
      const itemOnSelect = sinon.spy();

      render(
        <Menu onSelect={menuOnSelect}>
          <Menu.Item eventKey="1" onSelect={itemOnSelect}>
            Item 1
          </Menu.Item>
        </Menu>
      );

      fireEvent.click(screen.getByText('Item 1'));
      expect(menuOnSelect).to.have.been.calledWith('1');
      expect(itemOnSelect).to.have.been.calledWith('1');
    });
  });

  it('Should render menu items with icons', () => {
    render(
      <Menu>
        <Menu.Item icon={<PageIcon />}>Item with icon</Menu.Item>
      </Menu>
    );

    expect(screen.getByRole('menuitem').querySelector('svg')).to.exist;
  });

  it('Should render menu items with shortcuts', () => {
    const shortcut = '⌘ N';
    render(
      <Menu>
        <Menu.Item shortcut={shortcut}>Item with shortcut</Menu.Item>
      </Menu>
    );

    expect(screen.getByText(shortcut)).to.exist;
  });

  it('Should render menu items with descriptions', () => {
    const description = 'Item description';
    render(
      <Menu>
        <Menu.Item description={description}>Item with description</Menu.Item>
      </Menu>
    );

    expect(screen.getByText(description)).to.exist;
  });

  it('Should render menu separator', () => {
    render(
      <Menu>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Separator />
        <Menu.Item>Item 2</Menu.Item>
      </Menu>
    );

    expect(screen.getByRole('separator')).to.exist;
  });
});
