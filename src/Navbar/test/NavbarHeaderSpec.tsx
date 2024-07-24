import React from 'react';
import sinon, { SinonStub } from 'sinon';
import NavbarHeader from '../NavbarHeader';
import { render } from '@testing-library/react';

describe('NavbarHeader (deprecated)', () => {
  beforeEach(() => {
    sinon.stub(console, 'warn').callsFake(() => null);
  });

  afterEach(() => {
    (console.warn as SinonStub).restore();
  });

  it('Should render a header', () => {
    const title = 'Test';
    const { container } = render(<NavbarHeader>{title}</NavbarHeader>);
    expect(container.firstChild).to.have.tagName('DIV');
    expect(container.firstChild).to.have.class('rs-navbar-header');
    expect(container.firstChild?.textContent).to.equal(title);
  });

  it('Should have a custom className', () => {
    const { container } = render(<NavbarHeader className="custom" />);
    expect(container.firstChild).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const { container } = render(<NavbarHeader style={{ fontSize }} />);
    const instance = container.firstChild as HTMLElement;
    expect(instance.style.fontSize).equal(fontSize);
  });

  it('Should have a custom className prefix', () => {
    const { container } = render(<NavbarHeader classPrefix="custom-prefix" />);
    const instance = container.firstChild as HTMLElement;
    expect(instance.className).match(/\bcustom-prefix\b/);
  });

  it('Should warn deprecation message', () => {
    render(<NavbarHeader />);
    assert.ok(/deprecated/i.test((console.warn as SinonStub).firstCall.args[0]));
  });
});
