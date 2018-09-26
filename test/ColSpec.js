import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Col from '../src/Col';
import { globalKey } from '../src/utils/prefix';

describe('Col', () => {
  it('Should render a Col', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<Col md={1}>{title}</Col>);
    assert.equal(findDOMNode(instance).className, `${globalKey}col-md-1`);
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should set col of zero', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Col xs={0} sm={0} md={0} lg={0} />);
    const classes = findDOMNode(instance).className;

    assert.include(classes, 'rs-col-xs-0');
    assert.include(classes, 'rs-col-sm-0');
    assert.include(classes, 'rs-col-md-0');
    assert.include(classes, 'rs-col-lg-0');
  });

  it('Should set Offset of zero', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Col xsOffset={0} smOffset={0} mdOffset={0} lgOffset={0} />
    );

    const classes = findDOMNode(instance).className;

    assert.include(classes, 'rs-col-xs-offset-0');
    assert.include(classes, 'rs-col-sm-offset-0');
    assert.include(classes, 'rs-col-md-offset-0');
    assert.include(classes, 'rs-col-lg-offset-0');
  });

  it('Should set Pull of zero', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Col xsPull={0} smPull={0} mdPull={0} lgPull={0} />
    );

    const classes = findDOMNode(instance).className;

    assert.include(classes, 'rs-col-xs-pull-0');
    assert.include(classes, 'rs-col-sm-pull-0');
    assert.include(classes, 'rs-col-md-pull-0');
    assert.include(classes, 'rs-col-lg-pull-0');
  });

  it('Should set Push of zero', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Col xsPush={0} smPush={0} mdPush={0} lgPush={0} />
    );

    const classes = findDOMNode(instance).className;

    assert.include(classes, 'rs-col-xs-push-0');
    assert.include(classes, 'rs-col-sm-push-0');
    assert.include(classes, 'rs-col-md-push-0');
    assert.include(classes, 'rs-col-lg-push-0');
  });

  it('Should set Hidden to true', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Col xsHidden smHidden mdHidden lgHidden />);
    const classes = findDOMNode(instance).className;
    assert.include(classes, 'rs-col-hidden-xs');
    assert.include(classes, 'rs-col-hidden-sm');
    assert.include(classes, 'rs-col-hidden-md');
    assert.include(classes, 'rs-col-hidden-lg');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Col className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Col style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Col classPrefix="custom-prefix" md={1} />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
