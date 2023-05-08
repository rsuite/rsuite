import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';
import User from '@rsuite/icons/legacy/User';
import Nav from '../../Nav';

describe('<Dropdown.Item>', () => {
  it('Should render element with role="menuitem" and given content', () => {
    const content = 'Test';
    render(
      <Dropdown>
        <DropdownItem data-testid="item">{content}</DropdownItem>
      </Dropdown>
    );

    expect(screen.getByTestId('item')).to.have.attr('role', 'menuitem');
    expect(screen.getByTestId('item')).to.have.text(content);
  });

  it('Should render custom element inside a <li>', () => {
    render(
      <Dropdown>
        <DropdownItem as="a" data-testid="dropdown-item">
          Link
        </DropdownItem>
      </Dropdown>
    );

    const element = screen.getByTestId('dropdown-item');

    expect(element).to.have.tagName('A');
    // eslint-disable-next-line testing-library/no-node-access
    expect(element.parentElement).to.have.tagName('LI');
  });

  it('[Deprecated] Should render a divider with deprecation message', () => {
    const warn = sinon.spy(console, 'warn');
    render(
      <Dropdown>
        <DropdownItem divider data-testid="item" />
      </Dropdown>
    );

    expect(screen.getByTestId('item')).to.have.class('rs-dropdown-item-divider');
    expect(warn).to.have.been.calledWith(
      '[rsuite] "divider" property of Dropdown.Item component has been deprecated.\nUse Dropdown.Separator component instead.'
    );
  });

  it('Should render a panel with given content', () => {
    const content = 'Signed in as Foobar';
    render(
      <DropdownItem panel data-testid="dropdown-item">
        {content}
      </DropdownItem>
    );
    expect(screen.getByTestId('dropdown-item')).to.have.class('rs-dropdown-item-panel');
    expect(screen.getByTestId('dropdown-item')).to.have.text(content);
  });

  it('Should be active', () => {
    render(
      <Dropdown>
        <DropdownItem active data-testid="item" />
      </Dropdown>
    );

    expect(screen.getByTestId('item')).to.have.class('rs-dropdown-item-active');
  });

  it('Should be disabled', () => {
    render(
      <Dropdown>
        <DropdownItem disabled data-testid="item" />
      </Dropdown>
    );

    expect(screen.getByTestId('item')).to.have.class('rs-dropdown-item-disabled');
  });

  it('Should render a icon', () => {
    render(
      <Dropdown>
        <DropdownItem icon={<User data-testid="icon" />} data-testid="item" />
      </Dropdown>
    );

    expect(screen.getByTestId('item')).to.contain(screen.getByTestId('icon'));
  });

  it('Should call onSelect callback with correct `eventKey`', () => {
    const onSelectSpy = sinon.spy();

    render(
      <Dropdown>
        <DropdownItem onSelect={onSelectSpy} eventKey="ABC" data-testid="item">
          Title
        </DropdownItem>
      </Dropdown>
    );

    fireEvent.click(screen.getByTestId('item'));

    expect(onSelectSpy).to.have.been.calledWith('ABC');
  });

  it('Should call onClick callback', () => {
    const onClickSpy = sinon.spy();

    render(
      <Dropdown>
        <DropdownItem onClick={onClickSpy} data-testid="item">
          Title
        </DropdownItem>
      </Dropdown>
    );

    fireEvent.click(screen.getByTestId('item'));

    expect(onClickSpy).to.have.been.called;
  });

  it('Should have a custom className', () => {
    render(
      <Dropdown>
        <DropdownItem className="custom" data-testid="item" />
      </Dropdown>
    );

    expect(screen.getByTestId('item')).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';

    render(
      <Dropdown>
        <DropdownItem style={{ fontSize }} data-testid="item" />
      </Dropdown>
    );

    expect(screen.getByTestId('item')).to.have.style('font-size', fontSize);
  });

  it('Should have a custom className prefix', () => {
    render(
      <Dropdown>
        <DropdownItem classPrefix="custom-prefix" data-testid="item" />
      </Dropdown>
    );

    expect(screen.getByTestId('item').className).to.match(/\bcustom-prefix\b/);
  });

  it('Should accept a custom `id`', () => {
    const id = 'custom-id';

    render(
      <Dropdown>
        <DropdownItem id={id} data-testid="item" />
      </Dropdown>
    );

    expect(screen.getByTestId('item')).to.have.id(id);
  });

  context('[Deprecated] Within <Nav>', () => {
    it('Should warn deprecation message', () => {
      sinon.spy(console, 'warn');

      render(
        <Nav>
          <Dropdown title="Dropdown">
            <Dropdown.Item>Dropdown item</Dropdown.Item>
          </Dropdown>
        </Nav>
      );

      expect(console.warn).to.have.been.calledWith(
        'Usage of <Dropdown.Item> within <Nav> is deprecated. Replace with <Nav.Item> within <Nav.Menu>.'
      );
    });
  });
});
