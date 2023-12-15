import React from 'react';
import { testStandardProps } from '@test/utils';
import { render, screen } from '@testing-library/react';

import Button from '../../Button';
import ButtonToolbar from '../ButtonToolbar';

describe('ButtonToolbar', () => {
  testStandardProps(<ButtonToolbar />);

  it('Should output a button toolbar', () => {
    render(<ButtonToolbar />);

    expect(screen.getByRole('toolbar')).to.tagName('DIV');
    expect(screen.getByRole('toolbar')).to.have.class('rs-btn-toolbar');
  });

  it('Should have flex property by default', () => {
    render(
      <ButtonToolbar>
        <Button />
      </ButtonToolbar>
    );

    expect(screen.getByRole('toolbar')).to.be.style('flex-wrap', 'wrap');
    expect(screen.getByRole('toolbar')).to.be.style('gap', '10px');
    expect(screen.getByRole('toolbar')).to.have.class('rs-stack');
    expect(screen.getByRole('button')).to.have.class('rs-stack-item');
  });

  it('Should not have flex property when changing `as`', () => {
    render(
      <ButtonToolbar as="div">
        <Button />
      </ButtonToolbar>
    );

    expect(screen.getByRole('toolbar')).to.not.have.style('flex-wrap', 'wrap');
    expect(screen.getByRole('toolbar')).to.not.have.style('gap', '10px');
    expect(screen.getByRole('button')).to.not.have.class('rs-stack-item');
  });

  it('Should render 2 buttons', () => {
    render(
      <ButtonToolbar>
        <Button />
        <Button />
      </ButtonToolbar>
    );

    expect(screen.getAllByRole('button')).to.have.length(2);
  });
});
