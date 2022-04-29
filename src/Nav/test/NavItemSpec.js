import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getByTestId, screen } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Nav from '../Nav';
import Navbar from '../../Navbar';
import Sidenav from '../../Sidenav';

describe('<Nav.Item>', () => {
  testStandardProps(<Nav.Item />);

  it('Should render a <a>', () => {
    let title = 'Test';
    let instance = getDOMNode(<Nav.Item>{title}</Nav.Item>);
    assert.equal(instance.tagName, 'A');
    assert.equal(instance.textContent, title);
  });

  it('Should call onSelect callback with correct eventKey', done => {
    let key = 'Test';
    let doneOp = eventKey => {
      try {
        assert.equal(eventKey, key);
        done();
      } catch (err) {
        done(err);
      }
    };

    let instance = getDOMNode(<Nav.Item onSelect={doneOp} eventKey={key} />);
    ReactTestUtils.Simulate.click(instance);
  });

  it('Should call onClick callback', done => {
    let doneOp = () => {
      done();
    };
    let instance = getDOMNode(<Nav.Item onSelect={doneOp} />);
    ReactTestUtils.Simulate.click(instance);
  });

  it('Should be active', () => {
    let instance = getDOMNode(<Nav.Item active />);
    assert.include(instance.className, 'rs-nav-item-active');
  });

  it('Should be disabled', () => {
    let instance = getDOMNode(<Nav.Item disabled />);
    assert.include(instance.className, 'rs-nav-item-disabled');
  });

  it('Should not call onSelect callback when the `NavItem` is disabled', () => {
    const onHideSpy = sinon.spy();

    let instance = getDOMNode(<Nav.Item onSelect={onHideSpy} disabled />);
    ReactTestUtils.Simulate.click(instance);
    assert.ok(!onHideSpy.calledOnce);
  });

  it('Should not call onClick callback when the `NavItem` is disabled', () => {
    const onHideSpy = sinon.spy();

    let instance = getDOMNode(<Nav.Item onClick={onHideSpy} disabled />);
    ReactTestUtils.Simulate.click(instance);
    assert.ok(!onHideSpy.calledOnce);
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
        ReactTestUtils.Simulate.focus(getByTestId('nav-item'));
      });

      expect(screen.getByRole('tooltip'), 'Tooltip').not.to.be.null;
    });
  });
});
