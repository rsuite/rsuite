import React from 'react';
import sinon, { SinonStub } from 'sinon';
import NavbarHeader from '../NavbarHeader';
import { getDOMNode } from '@test/testUtils';

describe('NavbarHeader (deprecated)', () => {
  beforeEach(() => {
    sinon.stub(console, 'warn').callsFake(() => null);
  });

  afterEach(() => {
    (console.warn as SinonStub).restore();
  });

  it('Should render a header', () => {
    const title = 'Test';
    const instance = getDOMNode(<NavbarHeader>{title}</NavbarHeader>);
    assert.equal(instance.tagName, 'DIV');
    assert.ok(instance.className.match(/\bnavbar-header\b/));
    assert.equal(instance.textContent, title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<NavbarHeader className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<NavbarHeader style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<NavbarHeader classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should warn deprecation message', () => {
    getDOMNode(<NavbarHeader />);
    assert.ok(/deprecated/i.test((console.warn as SinonStub).firstCall.args[0]));
  });
});
