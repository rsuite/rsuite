import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import moment from 'moment';

import Calendar from '../../src/Calendar';

describe('Calendar', () => {
  it('Should render a div with `calendar` class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Calendar pageDate={moment()} />);

    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\bcalendar\b/));
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <Calendar format="YYYY-MM-DD" pageDate={moment()} onSelect={doneOp} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-calendar-table-cell-is-today'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Calendar className="custom" pageDate={moment()} />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Calendar style={{ fontSize }} pageDate={moment()} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
