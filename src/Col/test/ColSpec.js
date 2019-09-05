import React from 'react';
import { getDOMNode } from '@test/testUtils';
import Col from '../Col';
import { globalKey } from '../../utils/prefix';

describe('Col', () => {
  it('Should render a Col', () => {
    const title = 'Test';
    const instance = getDOMNode(<Col md={1}>{title}</Col>);
    assert.include(instance.className, `${globalKey}col-md-1`);
    assert.equal(instance.innerHTML, title);
  });

  it('Should set col of zero', () => {
    const instance = getDOMNode(<Col xs={0} sm={0} md={0} lg={0} />);
    const classes = instance.className;

    assert.include(classes, 'rs-col-xs-0');
    assert.include(classes, 'rs-col-sm-0');
    assert.include(classes, 'rs-col-md-0');
    assert.include(classes, 'rs-col-lg-0');
  });

  it('Should set Offset of zero', () => {
    const instance = getDOMNode(<Col xsOffset={0} smOffset={0} mdOffset={0} lgOffset={0} />);

    const classes = instance.className;

    assert.include(classes, 'rs-col-xs-offset-0');
    assert.include(classes, 'rs-col-sm-offset-0');
    assert.include(classes, 'rs-col-md-offset-0');
    assert.include(classes, 'rs-col-lg-offset-0');
  });

  it('Should set Pull of zero', () => {
    const instance = getDOMNode(<Col xsPull={0} smPull={0} mdPull={0} lgPull={0} />);

    const classes = instance.className;

    assert.include(classes, 'rs-col-xs-pull-0');
    assert.include(classes, 'rs-col-sm-pull-0');
    assert.include(classes, 'rs-col-md-pull-0');
    assert.include(classes, 'rs-col-lg-pull-0');
  });

  it('Should set Push of zero', () => {
    const instance = getDOMNode(<Col xsPush={0} smPush={0} mdPush={0} lgPush={0} />);

    const classes = instance.className;

    assert.include(classes, 'rs-col-xs-push-0');
    assert.include(classes, 'rs-col-sm-push-0');
    assert.include(classes, 'rs-col-md-push-0');
    assert.include(classes, 'rs-col-lg-push-0');
  });

  it('Should set Hidden to true', () => {
    const instance = getDOMNode(<Col xsHidden smHidden mdHidden lgHidden />);
    const classes = instance.className;
    assert.include(classes, 'rs-hidden-xs');
    assert.include(classes, 'rs-hidden-sm');
    assert.include(classes, 'rs-hidden-md');
    assert.include(classes, 'rs-hidden-lg');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Col className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Col style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Col classPrefix="custom-prefix" md={1} />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
