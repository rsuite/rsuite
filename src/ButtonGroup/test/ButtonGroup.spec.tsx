import React from 'react';
import ButtonGroup from '../ButtonGroup';
import Button from '../../Button';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('ButtonGroup', () => {
  testStandardProps(<ButtonGroup />);

  it('Should output a button group', () => {
    render(<ButtonGroup />);

    expect(screen.getByRole('group')).to.have.tagName('DIV');
    expect(screen.getByRole('group')).to.have.class('rs-btn-group');
  });

  describe('Sizes', () => {
    it('Should add size', () => {
      render(<ButtonGroup size="lg" />);

      expect(screen.getByRole('group')).to.have.attr('data-size', 'lg');
    });

    (['lg', 'md', 'sm', 'xs'] as const).forEach(size => {
      it(`Should apply ${size} size on child <Button>s`, () => {
        render(
          <ButtonGroup size={size}>
            <Button data-testid="button">Button</Button>
          </ButtonGroup>
        );

        expect(screen.getByTestId('button')).to.have.attr('data-size', size);
      });
    });
  });

  it('Should add vertical variation', () => {
    render(<ButtonGroup vertical />);

    expect(screen.getByRole('group')).to.have.attr('data-vertical', 'true');
  });

  it('Should add block variation', () => {
    render(<ButtonGroup vertical block />);

    expect(screen.getByRole('group')).to.have.attr('data-block', 'true');
  });

  it('Should add justified variation', () => {
    render(<ButtonGroup justified />);

    expect(screen.getByRole('group')).to.have.attr('data-justified', 'true');
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
      expect(button).to.have.attr('data-disabled', 'true');
      expect(button).to.have.attribute('disabled');
    });
  });

  it('Should add divided variation', () => {
    render(<ButtonGroup divided />);

    expect(screen.getByRole('group')).to.have.attr('data-divided', 'true');
  });
});
