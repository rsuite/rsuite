import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import TimeDropdown from '../TimeDropdown';

describe('Calendar-TimeDropdown', () => {
  it('Should render a div with `time-dropdown` class', () => {
    const instance = getDOMNode(<TimeDropdown />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\btime-dropdown\b/));
  });

  it('Should render 3 column', () => {
    const instance = getDOMNode(<TimeDropdown format="HH:mm:ss" />);

    assert.equal(instance.querySelectorAll('.rs-calendar-time-dropdown-column').length, 3);
  });

  it('Should render 2 column', () => {
    const instance = getDOMNode(<TimeDropdown format="HH:mm" />);

    assert.equal(instance.querySelectorAll('.rs-calendar-time-dropdown-column').length, 2);
  });

  it('Should render 1 column', () => {
    const instance = getDOMNode(<TimeDropdown format="HH" />);

    assert.equal(instance.querySelectorAll('.rs-calendar-time-dropdown-column').length, 1);
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(<TimeDropdown onSelect={doneOp} format="HH" />);

    ReactTestUtils.Simulate.click(instance.querySelector('[data-key="hours-1"]'));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(
      <TimeDropdown
        disabledHours={h => {
          return h > 10;
        }}
        format="HH"
      />
    );

    assert.equal(
      instance.querySelectorAll('.rs-calendar-time-dropdown-cell-disabled').length,
      23 - 10
    );
  });

  it('Should be hide', () => {
    const instance = getDOMNode(
      <TimeDropdown
        hideHours={h => {
          return h > 10;
        }}
        format="HH"
      />
    );

    assert.equal(instance.querySelectorAll('li').length, 11);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TimeDropdown className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TimeDropdown style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TimeDropdown classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
