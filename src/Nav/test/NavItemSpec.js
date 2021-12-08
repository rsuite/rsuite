import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getByTestId, screen } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';

import NavItem from '../NavItem';
import Sidenav from '../../Sidenav';
import Nav from '../Nav';

describe('<Nav.Item>', () => {
  it('Should render a <a>', () => {
    let title = 'Test';
    let instance = getDOMNode(<NavItem>{title}</NavItem>);
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

    let instance = getDOMNode(<NavItem onSelect={doneOp} eventKey={key} />);
    ReactTestUtils.Simulate.click(instance);
  });

  it('Should call onClick callback', done => {
    let doneOp = () => {
      done();
    };
    let instance = getDOMNode(<NavItem onSelect={doneOp} />);
    ReactTestUtils.Simulate.click(instance);
  });

  it('Should render a separator', () => {
    let instance = getDOMNode(
      <Sidenav>
        <Nav>
          <NavItem divider data-testid="nav-item" />
        </Nav>
      </Sidenav>
    );
    assert.include(getByTestId(instance, 'nav-item').className, 'rs-sidenav-item-divider');
  });

  it('Should render a panel', () => {
    let instance = getDOMNode(
      <Sidenav>
        <Nav>
          <NavItem panel data-testid="nav-item" />
        </Nav>
      </Sidenav>
    );
    assert.include(getByTestId(instance, 'nav-item').className, 'rs-sidenav-item-panel');
  });

  it('Should be active', () => {
    let instance = getDOMNode(<NavItem active />);
    assert.include(instance.className, 'rs-nav-item-active');
  });

  it('Should be disabled', () => {
    let instance = getDOMNode(<NavItem disabled />);
    assert.include(instance.className, 'rs-nav-item-disabled');
  });

  it('Should not call onSelect callback when the `NavItem` is disabled', () => {
    const onHideSpy = sinon.spy();

    let instance = getDOMNode(<NavItem onSelect={onHideSpy} disabled />);
    ReactTestUtils.Simulate.click(instance);
    assert.ok(!onHideSpy.calledOnce);
  });

  it('Should not call onClick callback when the `NavItem` is disabled', () => {
    const onHideSpy = sinon.spy();

    let instance = getDOMNode(<NavItem onClick={onHideSpy} disabled />);
    ReactTestUtils.Simulate.click(instance);
    assert.ok(!onHideSpy.calledOnce);
  });

  it('Should have a custom className', () => {
    let instance = getDOMNode(<NavItem className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = getDOMNode(<NavItem style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<NavItem classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a tooltip when used inside a collapsed <Sidenav>', async () => {
    const { getByTestId } = render(
      <Sidenav expanded={false}>
        <Nav>
          <NavItem data-testid="nav-item">item</NavItem>
        </Nav>
      </Sidenav>
    );

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.focus(getByTestId('nav-item'));
    });

    expect(screen.getByRole('tooltip'), 'Tooltip').not.to.be.null;
  });
});
