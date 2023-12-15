import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import ButtonGroup from '../ButtonGroup';
import Button from '../../Button';

describe('ButtonGroup', () => {
  testStandardProps(<ButtonGroup />);

  it('Should output a button group', () => {
    const { container } = render(<ButtonGroup />);

    expect(container.firstChild).to.have.tagName('DIV');
    expect(container.firstChild).to.have.class('rs-btn-group');
  });

  context('Sizes', () => {
    it('Should add size', () => {
      const { container } = render(<ButtonGroup size="lg" />);

      expect(container.firstChild).to.have.class('rs-btn-group-lg');
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
    const { container } = render(<ButtonGroup vertical />);

    expect(container.firstChild).to.have.class('rs-btn-group-vertical');
  });

  it('Should add block variation', () => {
    const { container } = render(<ButtonGroup vertical block />);

    expect(container.firstChild).to.have.class('rs-btn-group-block');
  });

  it('Should warn about block without vertical', () => {
    render(<ButtonGroup block />);
  });

  it('Should add justified variation', () => {
    const { container } = render(<ButtonGroup justified />);

    expect(container.firstChild).to.have.class('rs-btn-group-justified');
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
});
