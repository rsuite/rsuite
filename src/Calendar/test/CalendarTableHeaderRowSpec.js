import React from 'react';
import { getDOMNode } from '@test/testUtils';
import TableHeaderRow from '../TableHeaderRow';

describe('Calendar-TableHeaderRow', () => {
  it('Should render a div with "table-header-row" class', () => {
    const instance = getDOMNode(<TableHeaderRow />);

    assert.equal(instance.nodeName, 'DIV');
    assert.ok(instance.className.match(/\btable-header-row\b/));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<TableHeaderRow className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<TableHeaderRow style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<TableHeaderRow classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render an empty cell for a week number column', () => {
    const instance = getDOMNode(<TableHeaderRow showWeekNumbers />);
    assert.equal(instance.childNodes.length, 8);
  });
});
