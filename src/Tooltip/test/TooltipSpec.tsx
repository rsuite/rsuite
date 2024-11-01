import React from 'react';
import { testStandardProps } from '@test/utils';
import Tooltip from '../Tooltip';
import { render } from '@testing-library/react';

describe('Tooltip', () => {
  testStandardProps(<Tooltip />);

  it('Should render a Tooltip', () => {
    const title = 'Test';
    const { container } = render(<Tooltip>{title}</Tooltip>);
    expect(container.firstChild).to.have.tagName('DIV');
    expect(container.firstChild).to.have.class('rs-tooltip');
    expect(container.firstChild).to.have.class('rs-tooltip-arrow');
    expect(container.firstChild).to.have.text(title);
  });

  it('Tooltip should without arrow', () => {
    const { container } = render(<Tooltip arrow={false}>Test</Tooltip>);
    expect(container.firstChild).to.have.class('rs-tooltip');
  });

  it('Should have a id', () => {
    const { container } = render(<Tooltip id="tooltip" />);
    expect(container.firstChild).to.have.id('tooltip');
  });
});
