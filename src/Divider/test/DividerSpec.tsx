import React from 'react';
import { render } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Divider from '../Divider';

describe('Divider', () => {
  testStandardProps(<Divider />);

  it('Should render a Divider', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).to.have.class('rs-divider');
    expect(container.firstChild).to.have.class('rs-divider-horizontal');
  });

  it('Should be vertical', () => {
    const { container } = render(<Divider vertical />);
    expect(container.firstChild).to.have.class('rs-divider-vertical');
    expect(container.firstChild).to.have.attr('aria-orientation', 'vertical');
  });

  it('Should hava a children', () => {
    const { container } = render(<Divider>abc</Divider>);
    expect(container.firstChild).to.have.class('rs-divider-with-text');
  });
});
