import React from 'react';
import sinon, { SinonStub } from 'sinon';

import NavbarBody from '../NavbarBody';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('NavbarBody (deprecated)', () => {
  testStandardProps(<NavbarBody />);
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

  it('Should warn deprecation message', () => {
    render(<NavbarBody />);
    assert.ok(/deprecated/i.test((console.warn as SinonStub).firstCall.args[0]));
  });
});
