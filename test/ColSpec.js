import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Col from '../src/Col';

describe('Col', () => {

  it('Should render a Col', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <Col md={1}>{title}</Col>
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'col-md-1');
    assert.equal(ReactDOM.findDOMNode(instance).innerHTML, title);
  });

  it('Should set col of zero', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Col xs={0} sm={0} md={0} lg={0} />
    );

    let instanceClassName = ReactDOM.findDOMNode(instance).className;
    assert.ok(instanceClassName.match(/\bcol-xs-0\b/));
    assert.ok(instanceClassName.match(/\bcol-sm-0\b/));
    assert.ok(instanceClassName.match(/\bcol-md-0\b/));
    assert.ok(instanceClassName.match(/\bcol-lg-0\b/));
  });


  it('Should set Offset of zero', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Col xsOffset={0} smOffset={0} mdOffset={0} lgOffset={0} />
    );

    let instanceClassName = ReactDOM.findDOMNode(instance).className;
    assert.ok(instanceClassName.match(/\bcol-xs-offset-0\b/));
    assert.ok(instanceClassName.match(/\bcol-sm-offset-0\b/));
    assert.ok(instanceClassName.match(/\bcol-md-offset-0\b/));
    assert.ok(instanceClassName.match(/\bcol-lg-offset-0\b/));
  });

  it('Should set Pull of zero', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Col xsPull={0} smPull={0} mdPull={0} lgPull={0} />
    );

    let instanceClassName = ReactDOM.findDOMNode(instance).className;
    assert.ok(instanceClassName.match(/\bcol-xs-pull-0\b/));
    assert.ok(instanceClassName.match(/\bcol-sm-pull-0\b/));
    assert.ok(instanceClassName.match(/\bcol-md-pull-0\b/));
    assert.ok(instanceClassName.match(/\bcol-lg-pull-0\b/));
  });

  it('Should set Push of zero', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Col xsPush={0} smPush={0} mdPush={0} lgPush={0} />
    );

    let instanceClassName = ReactDOM.findDOMNode(instance).className;
    assert.ok(instanceClassName.match(/\bcol-xs-push-0\b/));
    assert.ok(instanceClassName.match(/\bcol-sm-push-0\b/));
    assert.ok(instanceClassName.match(/\bcol-md-push-0\b/));
    assert.ok(instanceClassName.match(/\bcol-lg-push-0\b/));
  });

  it('Should set Hidden to true', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Col xsHidden smHidden mdHidden lgHidden />
    );

    let instanceClassName = ReactDOM.findDOMNode(instance).className;
    assert.ok(instanceClassName.match(/\bhidden-xs\b/));
    assert.ok(instanceClassName.match(/\bhidden-sm\b/));
    assert.ok(instanceClassName.match(/\bhidden-md\b/));
    assert.ok(instanceClassName.match(/\bhidden-lg\b/));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Col className="custom" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Col style={{ fontSize }} />
    );
    assert.equal(ReactDOM.findDOMNode(instance).style.fontSize, fontSize);
  });

});
