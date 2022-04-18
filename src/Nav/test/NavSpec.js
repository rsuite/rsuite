import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Nav from '../Nav';
import Dropdown from '../../Dropdown';

describe('<Nav>', () => {
  testStandardProps(<Nav />);

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

  it('Should call onSelect callback with correct arguments', () => {
    const onSelectSpy = sinon.spy();
    const { getByTestId } = render(
      <Nav onSelect={onSelectSpy}>
        <Nav.Item eventKey="1" data-testid="item">
          Nav item
        </Nav.Item>

        <Nav.Menu title="Dropdown">
          <Nav.Item eventKey="2-1" data-testid="dropdown-item">
            Dropdown item
          </Nav.Item>
        </Nav.Menu>
      </Nav>
    );

    userEvent.click(getByTestId('item'));
    expect(onSelectSpy, 'Works with <Nav.Item>').to.have.been.calledWith('1', sinon.match.any);

    onSelectSpy.resetHistory();
    userEvent.click(getByTestId('dropdown-item'));
    expect(onSelectSpy, 'Works with <Nav.Dropdown.Item>').to.have.been.calledWith(
      '2-1',
      sinon.match.any
    );
  });

  it('Should highlight <Nav.Dropdown.Item> with `activeKey`', () => {
    const { getByTestId } = render(
      <Nav activeKey="2-1">
        <Nav.Menu title="Dropdown">
          <Nav.Item eventKey="2-1" data-testid="dropdown-item">
            Dropdown item
          </Nav.Item>
        </Nav.Menu>
      </Nav>
    );

    expect(getByTestId('dropdown-item').getAttribute('aria-checked')).to.equal('true');
  });

  it('Should work with Dropdown', () => {
    const instance = getDOMNode(
      <Nav>
        <Nav.Menu title="Dropdown">
          <Nav.Item>Dropdown item</Nav.Item>
        </Nav.Menu>
      </Nav>
    );

    expect(instance.querySelector('.rs-dropdown'), 'Dropdown').not.to.be.null;
  });

  describe('[Deprecated] Legacy Nav.Dropdown API', () => {
    it('Should call onSelect callback with correct arguments', () => {
      const onSelectSpy = sinon.spy();
      const { getByTestId } = render(
        <Nav onSelect={onSelectSpy}>
          <Nav.Item eventKey="1" data-testid="item">
            Nav item
          </Nav.Item>

          <Nav.Dropdown title="Dropdown">
            <Nav.Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Nav.Dropdown.Item>
          </Nav.Dropdown>
        </Nav>
      );

      userEvent.click(getByTestId('item'));
      expect(onSelectSpy, 'Works with <Nav.Item>').to.have.been.calledWith('1', sinon.match.any);

      onSelectSpy.resetHistory();
      userEvent.click(getByTestId('dropdown-item'));
      expect(onSelectSpy, 'Works with <Nav.Dropdown.Item>').to.have.been.calledWith(
        '2-1',
        sinon.match.any
      );
    });

    it('Should highlight <Nav.Dropdown.Item> with `activeKey`', () => {
      const { getByTestId } = render(
        <Nav activeKey="2-1">
          <Nav.Dropdown title="Dropdown">
            <Nav.Dropdown.Item eventKey="2-1" data-testid="dropdown-item">
              Dropdown item
            </Nav.Dropdown.Item>
          </Nav.Dropdown>
        </Nav>
      );

      expect(getByTestId('dropdown-item').getAttribute('aria-checked')).to.equal('true');
    });

    it('Should work with Dropdown', () => {
      const instance = getDOMNode(
        <Nav>
          <Nav.Dropdown title="Dropdown">
            <Nav.Dropdown.Item>Dropdown item</Nav.Dropdown.Item>
          </Nav.Dropdown>
        </Nav>
      );

      expect(instance.querySelector('.rs-dropdown'), 'Dropdown').not.to.be.null;
    });
  });

  describe('[Deprecated] Usage of <Dropdown> within <Nav>', () => {
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
});
