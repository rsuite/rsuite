import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import TableHeaderRow from '../TableHeaderRow';

describe('Calendar-TableHeaderRow', () => {
  it('Should render a div with "table-header-row" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TableHeaderRow />);

    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\btable-header-row\b/));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TableHeaderRow className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<TableHeaderRow style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <TableHeaderRow classPrefix="custom-prefix" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });

  it('Should render an empty cell for a week number column', () => {
    const instance = ReactTestUtils.renderIntoDocument(<TableHeaderRow showWeekNumbers />);
    assert.equal(findDOMNode(instance).childNodes.length, 8);
  });
});
