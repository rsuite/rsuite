import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Nav from '../Nav';
import Dropdown from '../../Dropdown';

describe('<Nav>', () => {
  it('Should render a nav', () => {
    const title = 'Test';
    const instance = getDOMNode(<Nav>{title}</Nav>);
    const node = instance;
    assert.ok(node.className.match(/\bnav\b/));
    assert.equal(node.textContent, title);
  });

  it('Should have a `nav-tabs` className', () => {
    const instance = getDOMNode(<Nav appearance="tabs" />);
    assert.ok(instance.className.match(/\bnav-tabs\b/));
  });

  it('Should have a `nav-justified` className', () => {
    const instance = getDOMNode(<Nav justified />);
    assert.ok(instance.className.match(/\bnav-justified\b/));
  });

  it('Should have a `navbar-right` className', () => {
    const instance = getDOMNode(<Nav pullRight />);
    assert.ok(instance.className.match(/\bnavbar-right\b/));
  });

  it('Should have a `navbar-right` className', () => {
    const instance = getDOMNode(<Nav pullRight />);
    assert.ok(instance.className.match(/\bnavbar-right\b/));
  });

  it('Should be selected second option when activeKey = 2 ', () => {
    const instance = getDOMNode(
      <Nav activeKey={2}>
        <Nav.Item eventKey={1}>1</Nav.Item>
        <Nav.Item eventKey={2}>2</Nav.Item>
      </Nav>
    );

    assert.ok(instance.querySelectorAll('a')[1].className.match(/\bnav-item-active\b/));
  });

  it('Should be selected second option when activeKey = `{ key: 2, value: 2 }` ', () => {
    const instance = getDOMNode(
      <Nav activeKey={{ key: 2, value: 2 }}>
        <Nav.Item eventKey={{ key: 1, value: 1 }}>1</Nav.Item>
        <Nav.Item eventKey={{ key: 2, value: 2 }}>2</Nav.Item>
      </Nav>
    );
    assert.ok(instance.querySelectorAll('a')[1].className.match(/\bnav-item-active\b/));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Nav className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Nav style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Nav classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should call onSelect callback with correct arguments', () => {
    const onSelectSpy = sinon.spy();
    const { getByTestId } = render(
      <Nav onSelect={onSelectSpy}>
        <Nav.Item eventKey="1" data-testid="item">
          Nav item
        </Nav.Item>

        <Dropdown title="Dropdown">
          <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
            Dropdown item
          </Dropdown.Item>
        </Dropdown>
      </Nav>
    );

    userEvent.click(getByTestId('item'));
    expect(onSelectSpy, 'Works with <Nav.Item>').to.have.been.calledWith('1', sinon.match.any);

    onSelectSpy.resetHistory();
    userEvent.click(getByTestId('dropdown-item'));
    expect(onSelectSpy, 'Works with <Dropdown.Item>').to.have.been.calledWith(
      '2-1',
      sinon.match.any
    );
  });

  it('Should highlight <Dropdown.Item> with `activeKey`', () => {
    const { getByTestId } = render(
      <Nav activeKey="2-1">
        <Dropdown title="Dropdown">
          <Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
            Dropdown item
          </Dropdown.Item>
        </Dropdown>
      </Nav>
    );

    expect(getByTestId('dropdown-item').getAttribute('aria-checked')).to.equal('true');
  });

  it('Should work with Dropdown', () => {
    const instance = getDOMNode(
      <Nav>
        <Nav.Item>Nav item</Nav.Item>
        <Dropdown title="Dropdown">
          <Dropdown.Item>Dropdown item</Dropdown.Item>
        </Dropdown>
      </Nav>
    );

    expect(instance.querySelector('.rs-dropdown'), 'Dropdown').not.to.be.null;
  });
});
