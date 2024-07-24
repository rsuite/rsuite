import React from 'react';
import sinon, { SinonStub } from 'sinon';

import NavbarBody from '../NavbarBody';
import { render } from '@testing-library/react';

describe('NavbarBody (deprecated)', () => {
  beforeEach(() => {
    sinon.stub(console, 'warn').callsFake(() => null);
  });

  afterEach(() => {
    (console.warn as SinonStub).restore();
  });

  it('Should render a body', () => {
    const title = 'Test';
    const { container } = render(<NavbarBody>{title}</NavbarBody>);
    expect(container.firstChild).to.have.class('rs-navbar-body');
    expect(container.firstChild?.textContent).to.equal(title);
  });

  it('Should have a custom className', () => {
    const { container } = render(<NavbarBody className="custom" />);
    expect(container.firstChild).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const { container } = render(<NavbarBody style={{ fontSize }} />);
    const instance = container.firstChild as HTMLElement;
    expect(instance.style.fontSize).equal(fontSize);
  });

  it('Should have a custom className prefix', () => {
    const { container } = render(<NavbarBody classPrefix="custom-prefix" />);
    const instance = container.firstChild as HTMLElement;
    expect(instance.className).match(/\bcustom-prefix\b/);
  });

  it('Should warn deprecation message', () => {
    render(<NavbarBody />);
    assert.ok(/deprecated/i.test((console.warn as SinonStub).firstCall.args[0]));
  });
});
