import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import MonthDropdownItem from '../MonthDropdownItem';
import { format } from 'date-fns';

describe('Calendar-MonthDropdownItem', () => {
  it('Should output a  `1` ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthDropdownItem month={1} date={new Date()} />
    );

    const instanceDOM = findDOMNode(instance);

    assert.equal(instanceDOM.nodeName, 'DIV');
    assert.equal(instanceDOM.innerText, '1');
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = date => {
      if (format(date, 'YYYY-MM') === '2017-01') {
        done();
      }
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <MonthDropdownItem date={new Date()} month={1} year={2017} onSelect={doneOp} />
    );

    const instanceDOM = findDOMNode(instance);

    ReactTestUtils.Simulate.click(instanceDOM);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthDropdownItem className="custom" date={new Date()} />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthDropdownItem style={{ fontSize }} date={new Date()} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthDropdownItem classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
