import React from 'react';
import { render, getByTestId, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Nav from '../Nav';
import Navbar from '../../Navbar';
import Sidenav from '../../Sidenav';

describe('<Nav.Item>', () => {
  testStandardProps(<Nav.Item />, { renderOptions: { wrapper: Nav } });

  it('Should render a <a>', () => {
    let title = 'Test';
    const { getByTestId } = render(<Nav.Item data-testid="item">{title}</Nav.Item>, {
      wrapper: Nav
    });

    const instance = getByTestId('item');

    assert.equal(instance.tagName, 'A');
    assert.equal(instance.textContent, title);
  });

  it('Should call onSelect callback with correct eventKey', () => {
    const onSelect = sinon.spy();
    const eventKey = 'Test';

    const { getByTestId } = render(
      <Nav.Item onSelect={onSelect} eventKey={eventKey} data-testid="item" />,
      {
        wrapper: Nav
      }
    );

    userEvent.click(getByTestId('item'));

    expect(onSelect).to.have.been.calledWith(eventKey);
  });

  it('Should call onClick callback', () => {
    const onClick = sinon.spy();

    const { getByTestId } = render(<Nav.Item onClick={onClick} data-testid="item" />, {
      wrapper: Nav
    });

    userEvent.click(getByTestId('item'));

    expect(onClick).to.have.been.called;
  });

  it('Should be active', () => {
    const { getByTestId } = render(<Nav.Item active data-testid="item" />, { wrapper: Nav });

    expect(getByTestId('item')).to.have.class('rs-nav-item-active');
  });

  it('Should be disabled', () => {
    const { getByTestId } = render(<Nav.Item disabled data-testid="item" />, { wrapper: Nav });

    expect(getByTestId('item')).to.have.class('rs-nav-item-disabled');
  });

  it('Should not call onSelect callback when the `NavItem` is disabled', () => {
    const onSelect = sinon.spy();

    const { getByTestId } = render(<Nav.Item onSelect={onSelect} disabled data-testid="item" />, {
      wrapper: Nav
    });

    fireEvent.click(getByTestId('item'));

    expect(onSelect).not.to.have.been.called;
  });

  it('Should not call onClick callback when the `NavItem` is disabled', () => {
    const onClick = sinon.spy();

    const { getByTestId } = render(<Nav.Item onClick={onClick} disabled data-testid="item" />, {
      wrapper: Nav
    });

    fireEvent.click(getByTestId('item'));

    expect(onClick).not.to.have.been.called;
  });

  context('Within <Navbar>', () => {
    it('Should render a navbar item with given content', () => {
      const { getByText } = render(
        <Navbar>
          <Nav>
            <Nav.Item>Item</Nav.Item>
          </Nav>
        </Navbar>
      );

      expect(getByText('Item')).to.exist;
    });
  });

  context('Within <Sidenav>', () => {
    it('Should render a sidenav item with given content', () => {
      const { getByText } = render(
        <Sidenav>
          <Nav>
            <Nav.Item>Item</Nav.Item>
          </Nav>
        </Sidenav>
      );

      expect(getByText('Item')).to.exist;
    });
    it('Should render a separator', () => {
      let instance = getDOMNode(
        <Sidenav>
          <Nav>
            <Nav.Item divider data-testid="nav-item" />
          </Nav>
        </Sidenav>
      );
      assert.include(getByTestId(instance, 'nav-item').className, 'rs-sidenav-item-divider');
    });

    it('Should render a panel', () => {
      let instance = getDOMNode(
        <Sidenav>
          <Nav>
            <Nav.Item panel data-testid="nav-item" />
          </Nav>
        </Sidenav>
      );
      assert.include(getByTestId(instance, 'nav-item').className, 'rs-sidenav-item-panel');
    });

    it('Should render a tooltip when used inside a collapsed <Sidenav>', async () => {
      const { getByTestId } = render(
        <Sidenav expanded={false}>
          <Nav>
            <Nav.Item data-testid="nav-item">item</Nav.Item>
          </Nav>
        </Sidenav>
      );

      ReactTestUtils.act(() => {
        ReactTestUtils.Simulate.mouseOver(getByTestId('nav-item'));
      });

      expect(screen.getByRole('tooltip'), 'Tooltip').not.to.be.null;
    });
  });
});
