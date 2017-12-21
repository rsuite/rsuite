import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Grid from '../src/Grid';
import { globalKey } from '../src/utils/prefix';

describe('Grid', () => {

  it('Should render a container', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid>{title}</Grid>
    );
    assert.equal(findDOMNode(instance).className, `${globalKey}container`);
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should render a fluid container', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid fluid>{title}</Grid>
    );
    assert.equal(findDOMNode(instance).className, `${globalKey}container-fluid`);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
