import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, createTestContainer, innerText } from '@test/testUtils';

import NavItem from '../NavItem';

describe('NavItem', () => {
  it('Should render a <a>', () => {
    let title = 'Test';
    let instance = getDOMNode(<NavItem>{title}</NavItem>);
    assert.equal(instance.tagName, 'A');
    assert.equal(innerText(instance), title);
  });

  it('Should call onSelect callback', done => {
    let key = 'Test';
    let doneOp = eventKey => {
      if (eventKey === key) {
        done();
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
    let instance = getDOMNode(<NavItem divider />);
    assert.include(instance.className, 'rs-nav-item-divider');
  });

  it('Should render a panel', () => {
    let instance = getDOMNode(<NavItem panel />);
    assert.include(instance.className, 'rs-nav-item-panel');
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

  it('Should render a tooltip', () => {
    const itemRef = React.createRef();

    ReactTestUtils.act(() => {
      ReactDOM.render(
        <NavItem ref={itemRef} tooltip>
          item
        </NavItem>,
        createTestContainer()
      );
    });

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.focus(itemRef.current.root);
    });

    assert.equal(itemRef.current.overlay.getAttribute('role'), 'tooltip');
  });
});
