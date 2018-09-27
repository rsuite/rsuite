import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import moment from 'moment';

import { getDOMNode, getInstance } from '../TestWrapper';
import Calendar from '../../src/Calendar';

describe('Calendar', () => {
  it('Should render a div with `calendar` class', () => {
    const instance = getDOMNode(<Calendar pageDate={moment()} />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\bcalendar\b/));
  });

  it('Should output valid one day', () => {
    const instance = getDOMNode(<Calendar format="YYYY-MM-DD" pageDate={moment('2018-07-01')} />);
    assert.equal(
      instance
        .querySelectorAll('.rs-calendar-table-row')[1]
        .querySelector('.rs-calendar-table-cell-content').innerText,
      '1'
    );
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = getDOMNode(
      <Calendar format="YYYY-MM-DD" pageDate={moment()} onSelect={doneOp} />
    );
    const instanceDOM = instance;
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-calendar-table-cell-is-today'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Calendar className="custom" pageDate={moment()} />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Calendar style={{ fontSize }} pageDate={moment()} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Calendar classPrefix="custom-prefix" pageDate={moment()} />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
