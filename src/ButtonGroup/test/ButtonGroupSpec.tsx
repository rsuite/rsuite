import React from 'react';
import ButtonGroup from '../ButtonGroup';
import Button from '../../Button';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('ButtonGroup', () => {
  testStandardProps(<ButtonGroup />);

  it('Should output a button group', () => {
    render(<ButtonGroup />);

    expect(screen.getByRole('group')).to.have.tagName('DIV');
    expect(screen.getByRole('group')).to.have.class('rs-btn-group');
  });

  context('Sizes', () => {
    it('Should add size', () => {
      render(<ButtonGroup size="lg" />);

      expect(screen.getByRole('group')).to.have.class('rs-btn-group-lg');
    });

    (['lg', 'md', 'sm', 'xs'] as const).forEach(size => {
      it(`Should apply ${size} size on child <Button>s`, () => {
        render(
          <ButtonGroup size={size}>
            <Button data-testid="button">Button</Button>
          </ButtonGroup>
        );

        expect(screen.getByTestId('button')).to.have.class(`rs-btn-${size}`);
      });
    });
  });

  it('Should add vertical variation', () => {
    render(<ButtonGroup vertical />);

    expect(screen.getByRole('group')).to.have.class('rs-btn-group-vertical');
  });

  it('Should add block variation', () => {
    render(<ButtonGroup vertical block />);

    expect(screen.getByRole('group')).to.have.class('rs-btn-group-block');
  });

  it('Should warn about block without vertical', () => {
    render(<ButtonGroup block />);
  });

  it('Should add justified variation', () => {
    render(<ButtonGroup justified />);

    expect(screen.getByRole('group')).to.have.class('rs-btn-group-justified');
  });

  it('Should render 2 <button>', () => {
    render(
      <ButtonGroup>
        <Button>Title</Button>
        <Button>Title</Button>
      </ButtonGroup>
    );

    expect(screen.getAllByRole('button')).to.have.lengthOf(2);
  });

  it('Should disable all buttons in the group', () => {
    render(
      <ButtonGroup disabled>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    );

    screen.getAllByRole('button').forEach(button => {
      expect(button).to.have.class('rs-btn-disabled');
      expect(button).to.have.attribute('disabled');
    });
  });

  it('Should add divided variation', () => {
    render(<ButtonGroup divided />);

    expect(screen.getByRole('group')).to.have.class('rs-btn-group-divided');
  });
});
