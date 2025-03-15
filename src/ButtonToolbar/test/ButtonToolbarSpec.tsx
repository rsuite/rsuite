import React from 'react';
import Button from '../../Button';
import ButtonToolbar from '../ButtonToolbar';
import { render, screen } from '@testing-library/react';
import { testStandardProps, getCssVarValue } from '@test/utils';

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

    expect(screen.getByRole('toolbar')).to.have.class('rs-stack');
    expect(getCssVarValue(screen.getByRole('toolbar'), '--rs-stack-spacing')).to.equal('10px');
    expect(getCssVarValue(screen.getByRole('toolbar'), '--rs-stack-wrap')).to.equal('wrap');
  });

  it('Should not have flex property when changing `as`', () => {
    render(
      <ButtonToolbar as="div">
        <Button />
      </ButtonToolbar>
    );

    expect(getCssVarValue(screen.getByRole('toolbar'), '--rs-stack-spacing')).to.not.equal('10px');
    expect(getCssVarValue(screen.getByRole('toolbar'), '--rs-stack-wrap')).to.not.equal('nowrap');
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
