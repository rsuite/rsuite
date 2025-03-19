import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Text, { TextProps } from '../Text';

describe('Text', () => {
  testStandardProps(<Text />);

  const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];

  sizes.forEach(size => {
    it(`Should render size ${size}`, () => {
      render(<Text size={size}>Text</Text>);
      expect(screen.getByText('Text')).to.attr(
        'style',
        `--rs-font-size: var(--rs-font-size-${size});`
      );
    });
  });

  it('Should render font size 24px', () => {
    render(<Text size={24}>Text</Text>);
    expect(screen.getByText('Text')).to.attr('style', `--rs-font-size: 24px;`);
  });

  it('Should be muted', () => {
    render(<Text muted>Text</Text>);
    expect(screen.getByText('Text')).to.have.class('rs-text-muted');
  });

  ['uppercase', 'lowercase', 'capitalize'].forEach(transform => {
    it(`Should transform text to ${transform}`, () => {
      render(<Text transform={transform as TextProps['transform']}>Text</Text>);
      expect(screen.getByText('Text')).to.have.class(`rs-text-${transform}`);
    });
  });

  ['left', 'center', 'right', 'justify'].forEach(align => {
    it(`Should align text to ${align}`, () => {
      render(<Text align={align as TextProps['align']}>Text</Text>);
      expect(screen.getByText('Text')).to.have.class(`rs-text-${align}`);
    });
  });

  ['thin', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold'].forEach(weight => {
    it(`Should set font weight to ${weight}`, () => {
      render(<Text weight={weight as TextProps['weight']}>Text</Text>);
      expect(screen.getByText('Text')).to.have.class(`rs-text-${weight}`);
    });
  });

  it('Should truncate text to 2 lines', () => {
    render(<Text maxLines={2}>Text</Text>);
    expect(screen.getByText('Text')).to.have.class('rs-text-ellipsis');
    expect(screen.getByText('Text')).to.have.style('--rs-text-max-lines', '2');
  });

  describe('Custom colors', () => {
    it('Should render with hex color', () => {
      const { container } = render(<Text color="#FF5733">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-box-c: #FF5733');
    });

    it('Should render with rgb color', () => {
      const { container } = render(<Text color="rgb(255, 87, 51)">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-box-c: rgb(255, 87, 51)');
    });

    it('Should render with rgba color', () => {
      const { container } = render(<Text color="rgba(255, 87, 51, 0.5)">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-box-c: rgba(255, 87, 51, 0.5)');
    });

    it('Should render with hsl color', () => {
      const { container } = render(<Text color="hsl(9, 100%, 60%)">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-box-c: hsl(9, 100%, 60%)');
    });

    it('Should render with hsla color', () => {
      const { container } = render(<Text color="hsla(9, 100%, 60%, 0.5)">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-box-c: hsla(9, 100%, 60%, 0.5)');
    });

    it('Should render with named color', () => {
      const { container } = render(<Text color="tomato">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-box-c: tomato');
    });

    it('Should update color when prop changes', () => {
      const { container, rerender } = render(<Text color="#FF5733">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-box-c: #FF5733');

      rerender(<Text color="rgb(51, 255, 87)">Text</Text>);
      expect(element).to.have.attr('style').contains('--rs-box-c: rgb(51, 255, 87)');
    });
  });
});
