import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';
import User from '@rsuite/icons/legacy/User';
import Nav from '../../Nav';

describe('<Dropdown.Item>', () => {
  it('Should render element with role="menuitem" and given content', () => {
    const content = 'Test';
    const { getByTestId } = render(
      <Dropdown>
        <DropdownItem data-testid="item">{content}</DropdownItem>
      </Dropdown>
    );

    expect(getByTestId('item')).to.have.attr('role', 'menuitem');
    expect(getByTestId('item')).to.have.text(content);
  });

  it('Should render custom element inside a <li>', () => {
    const { getByTestId } = render(
      <Dropdown>
        <DropdownItem as="a" data-testid="dropdown-item">
          Link
        </DropdownItem>
      </Dropdown>
    );

    const element = getByTestId('dropdown-item');

    expect(element).to.have.tagName('A');
    expect(element.parentElement).to.have.tagName('LI');
  });

  it('Should render a divider', () => {
    const { getByTestId } = render(
      <Dropdown>
        <DropdownItem divider data-testid="item" />
      </Dropdown>
    );

    expect(getByTestId('item')).to.have.class('rs-dropdown-item-divider');
  });

  it('Should render a panel with given content', () => {
    const content = 'Signed in as Foobar';
    const { getByTestId } = render(
      <DropdownItem panel data-testid="dropdown-item">
        {content}
      </DropdownItem>
    );
    expect(getByTestId('dropdown-item')).to.have.class('rs-dropdown-item-panel');
    expect(getByTestId('dropdown-item')).to.have.text(content);
  });

  it('Should be active', () => {
    const { getByTestId } = render(
      <Dropdown>
        <DropdownItem active data-testid="item" />
      </Dropdown>
    );

    expect(getByTestId('item')).to.have.class('rs-dropdown-item-active');
  });

  it('Should be disabled', () => {
    const { getByTestId } = render(
      <Dropdown>
        <DropdownItem disabled data-testid="item" />
      </Dropdown>
    );

    expect(getByTestId('item')).to.have.class('rs-dropdown-item-disabled');
  });

  it('Should render a icon', () => {
    const { getByTestId } = render(
      <Dropdown>
        <DropdownItem icon={<User data-testid="icon" />} data-testid="item" />
      </Dropdown>
    );

    expect(getByTestId('item')).to.contain(getByTestId('icon'));
  });

  it('Should call onSelect callback with correct `eventKey`', () => {
    const onSelectSpy = sinon.spy();

    const { getByTestId } = render(
      <Dropdown>
        <DropdownItem onSelect={onSelectSpy} eventKey="ABC" data-testid="item">
          Title
        </DropdownItem>
      </Dropdown>
    );

    fireEvent.click(getByTestId('item'));

    expect(onSelectSpy).to.have.been.calledWith('ABC');
  });

  it('Should call onClick callback', () => {
    const onClickSpy = sinon.spy();

    const { getByTestId } = render(
      <Dropdown>
        <DropdownItem onClick={onClickSpy} data-testid="item">
          Title
        </DropdownItem>
      </Dropdown>
    );

    fireEvent.click(getByTestId('item'));

    expect(onClickSpy).to.have.been.called;
  });

  it('Should have a custom className', () => {
    const { getByTestId } = render(
      <Dropdown>
        <DropdownItem className="custom" data-testid="item" />
      </Dropdown>
    );

    expect(getByTestId('item')).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';

    const { getByTestId } = render(
      <Dropdown>
        <DropdownItem style={{ fontSize }} data-testid="item" />
      </Dropdown>
    );

    expect(getByTestId('item')).to.have.style('font-size', fontSize);
  });

  it('Should have a custom className prefix', () => {
    const { getByTestId } = render(
      <Dropdown>
        <DropdownItem classPrefix="custom-prefix" data-testid="item" />
      </Dropdown>
    );

    expect(getByTestId('item').className).to.match(/\bcustom-prefix\b/);
  });

  it('Should accept a custom `id`', () => {
    const id = 'custom-id';

    const { getByTestId } = render(
      <Dropdown>
        <DropdownItem id={id} data-testid="item" />
      </Dropdown>
    );

    expect(getByTestId('item')).to.have.id(id);
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
