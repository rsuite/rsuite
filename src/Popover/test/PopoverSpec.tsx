import React from 'react';
import { testStandardProps } from '@test/utils';
import Popover from '../Popover';
import { render } from '@testing-library/react';

describe('Popover', () => {
  testStandardProps(<Popover />);

  it('Should render a Popover', () => {
    const title = 'Test';
    const { container } = render(<Popover>{title}</Popover>);

    expect(container.firstChild).to.have.tagName('DIV');
    expect(container.firstChild).to.have.class('rs-popover');
    expect(container.firstChild?.textContent).to.equal(title);
    expect(container.querySelectorAll('.rs-popover-arrow')).to.have.lengthOf(1);
  });

  it('Popover should without arrow', () => {
    const { container } = render(<Popover arrow={false}>Test</Popover>);

    expect(container.querySelectorAll('.rs-popover-arrow')).to.have.lengthOf(0);
  });

  it('Should be full', () => {
    const { container } = render(<Popover full>Test</Popover>);
    expect(container.firstChild).to.have.class('rs-popover-full');
  });

  it('Should have a id', () => {
    const { container } = render(<Popover id="popover" />);
    expect(container.firstChild).to.have.id('popover');
  });
});
