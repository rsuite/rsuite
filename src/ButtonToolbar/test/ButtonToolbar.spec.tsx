import React from 'react';
import Button from '../../Button';
import ButtonToolbar from '../ButtonToolbar';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('ButtonToolbar', () => {
  testStandardProps(<ButtonToolbar />);

  it('Should output a button toolbar', () => {
    render(<ButtonToolbar />);

    expect(screen.getByRole('toolbar')).to.tagName('DIV');
    expect(screen.getByRole('toolbar')).to.have.class('rs-btn-toolbar');
  });

  it('Should render a stack component', () => {
    render(
      <ButtonToolbar>
        <Button />
      </ButtonToolbar>
    );

    expect(screen.getByRole('toolbar')).to.have.class('rs-stack');
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
