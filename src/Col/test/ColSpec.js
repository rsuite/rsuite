import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Col from '../Col';

describe('Col', () => {
  testStandardProps(<Col />);

  it('Should render a Col', () => {
    const title = 'Test';
    const instance = getDOMNode(<Col md={1}>{title}</Col>);
    assert.equal(instance.className, 'rs-col rs-col-md-1');
    assert.equal(instance.textContent, title);
  });

  it('Should set col of zero', () => {
    const instance = getDOMNode(<Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0} />);
    const classes = instance.className;

    assert.include(classes, 'rs-col-xs-0');
    assert.include(classes, 'rs-col-sm-0');
    assert.include(classes, 'rs-col-md-0');
    assert.include(classes, 'rs-col-lg-0');
    assert.include(classes, 'rs-col-xl-0');
    assert.include(classes, 'rs-col-xxl-0');
  });

  it('Should set Offset of zero', () => {
    const instance = getDOMNode(
      <Col xsOffset={0} smOffset={0} mdOffset={0} lgOffset={0} xlOffset={0} xxlOffset={0} />
    );

    const classes = instance.className;

    assert.include(classes, 'rs-col-xs-offset-0');
    assert.include(classes, 'rs-col-sm-offset-0');
    assert.include(classes, 'rs-col-md-offset-0');
    assert.include(classes, 'rs-col-lg-offset-0');
    assert.include(classes, 'rs-col-xl-offset-0');
    assert.include(classes, 'rs-col-xxl-offset-0');
  });

  it('Should set Pull of zero', () => {
    const instance = getDOMNode(
      <Col xsPull={0} smPull={0} mdPull={0} lgPull={0} xlPull={0} xxlPull={0} />
    );

    const classes = instance.className;

    assert.include(classes, 'rs-col-xs-pull-0');
    assert.include(classes, 'rs-col-sm-pull-0');
    assert.include(classes, 'rs-col-md-pull-0');
    assert.include(classes, 'rs-col-lg-pull-0');
    assert.include(classes, 'rs-col-xl-pull-0');
    assert.include(classes, 'rs-col-xxl-pull-0');
  });

  it('Should set Push of zero', () => {
    const instance = getDOMNode(
      <Col xsPush={0} smPush={0} mdPush={0} lgPush={0} xlPush={0} xxlPush={0} />
    );

    const classes = instance.className;

    assert.include(classes, 'rs-col-xs-push-0');
    assert.include(classes, 'rs-col-sm-push-0');
    assert.include(classes, 'rs-col-md-push-0');
    assert.include(classes, 'rs-col-lg-push-0');
    assert.include(classes, 'rs-col-xl-push-0');
    assert.include(classes, 'rs-col-xxl-push-0');
  });

  it('Should set Hidden to true', () => {
    const instance = getDOMNode(<Col xsHidden smHidden mdHidden lgHidden xlHidden xxlHidden />);
    const classes = instance.className;
    assert.include(classes, 'rs-hidden-xs');
    assert.include(classes, 'rs-hidden-sm');
    assert.include(classes, 'rs-hidden-md');
    assert.include(classes, 'rs-hidden-lg');
    assert.include(classes, 'rs-hidden-xl');
    assert.include(classes, 'rs-hidden-xxl');
  });
});
