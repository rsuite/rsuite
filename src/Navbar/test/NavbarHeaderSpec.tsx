import React from 'react';
import sinon, { SinonStub } from 'sinon';
import NavbarHeader from '../NavbarHeader';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('NavbarHeader (deprecated)', () => {
  testStandardProps(<NavbarHeader />);
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

  it('Should warn deprecation message', () => {
    render(<NavbarHeader />);
    assert.ok(/deprecated/i.test((console.warn as SinonStub).firstCall.args[0]));
  });
});
