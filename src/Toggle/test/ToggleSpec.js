import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toggle from '../Toggle';
import { innerText, getDOMNode } from '@test/testUtils';

Enzyme.configure({ adapter: new Adapter() });

describe('Toggle', () => {
  it('Should output a toggle', () => {
    const instance = getDOMNode(<Toggle />);
    assert.equal(instance.className, 'rs-btn-toggle');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Toggle disabled />);
    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be checked', () => {
    const instance = getDOMNode(<Toggle checked />);
    assert.ok(instance.className.match(/\bbtn-toggle-checked\b/));
  });

  it('Should apply size class', () => {
    const instance = getDOMNode(<Toggle size="lg" />);
    assert.ok(instance.className.match(/\bbtn-toggle-lg\b/));
  });

  it('Should output a `off` in inner ', () => {
    const instance = getDOMNode(<Toggle unCheckedChildren="off" />);
    assert.equal(innerText(instance), 'off');
  });

  it('Should output a `on` in inner ', () => {
    const instance = getDOMNode(<Toggle checkedChildren="on" checked />);
    assert.equal(innerText(instance), 'on');
  });

  it('Should call onChange callback ', done => {
    const doneOp = checked => {
      if (checked) {
        done();
      }
    };
    const instance = getDOMNode(<Toggle onChange={doneOp} />);
    ReactTestUtils.Simulate.click(instance);
  });

  it('Should call onChange callback and the correct arguments returned', done => {
    const doneOp = checked => {
      if (checked) {
        done();
      }
    };

    const instance = mount(<Toggle checked={true} defaultChecked={true} onChange={doneOp} />);

    instance.setProps({
      checked: false
    });
    instance.simulate('click');

    instance.unmount();
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Toggle className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Toggle style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Toggle classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
