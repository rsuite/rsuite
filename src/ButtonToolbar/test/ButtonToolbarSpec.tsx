import React from 'react';
import { testStandardProps } from '@test/commonCases';
import { render } from '@testing-library/react';

import Button from '../../Button';
import ButtonToolbar from '../ButtonToolbar';

describe('ButtonToolbar', () => {
  testStandardProps(<ButtonToolbar />);

  it('Should output a button toolbar', () => {
    const { getByRole } = render(<ButtonToolbar />);

    expect(getByRole('toolbar')).to.tagName('DIV');
    expect(getByRole('toolbar')).to.have.class('rs-btn-toolbar');
  });

  it('Should have flex property by default', () => {
    const { getByRole } = render(
      <ButtonToolbar>
        <Button />
      </ButtonToolbar>
    );

    expect(getByRole('toolbar')).to.be.style('flex-wrap', 'wrap');
    expect(getByRole('toolbar')).to.be.style('gap', '10px');
    expect(getByRole('toolbar')).to.have.class('rs-stack');
    expect(getByRole('button')).to.have.class('rs-stack-item');
  });

  it('Should not have flex property when changing `as`', () => {
    const { getByRole } = render(
      <ButtonToolbar as="div">
        <Button />
      </ButtonToolbar>
    );

    expect(getByRole('toolbar')).to.not.have.style('flex-wrap', 'wrap');
    expect(getByRole('toolbar')).to.not.have.style('gap', '10px');
    expect(getByRole('button')).to.not.have.class('rs-stack-item');
  });

  it('Should render 2 buttons', () => {
    const { getAllByRole } = render(
      <ButtonToolbar>
        <Button />
        <Button />
      </ButtonToolbar>
    );

    expect(getAllByRole('button')).to.have.length(2);
  });
});
