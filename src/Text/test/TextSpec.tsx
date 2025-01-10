import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Text, { TextProps } from '../Text';

describe('Text', () => {
  testStandardProps(<Text />, {
    colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  });

  const fontSizeMap = { sm: 12, md: 14, lg: 16, xl: 18, xxl: 20 };

  Object.keys(fontSizeMap).forEach(size => {
    it(`Should render font size ${size}`, () => {
      render(<Text size={size}>Text</Text>);
      expect(screen.getByText('Text')).to.have.style('font-size', `${fontSizeMap[size]}px`);
    });
  });

  it('Should render font size 24px', () => {
    render(<Text size={24}>Text</Text>);
    expect(screen.getByText('Text')).to.have.style('font-size', '24px');
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
    expect(screen.getByText('Text')).to.have.style('-webkit-line-clamp', '2');
  });

  describe('Custom colors', () => {
    it('Should render with hex color', () => {
      const { container } = render(<Text color="#FF5733">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-text-color: #ff5733');
    });

    it('Should render with rgb color', () => {
      const { container } = render(<Text color="rgb(255, 87, 51)">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-text-color: rgb(255, 87, 51)');
    });

    it('Should render with rgba color', () => {
      const { container } = render(<Text color="rgba(255, 87, 51, 0.5)">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-text-color: rgba(255, 87, 51, 0.5)');
    });

    it('Should render with hsl color', () => {
      const { container } = render(<Text color="hsl(9, 100%, 60%)">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-text-color: hsl(9, 100%, 60%)');
    });

    it('Should render with hsla color', () => {
      const { container } = render(<Text color="hsla(9, 100%, 60%, 0.5)">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-text-color: hsla(9, 100%, 60%, 0.5)');
    });

    it('Should render with named color', () => {
      const { container } = render(<Text color="tomato">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-text-color: tomato');
    });

    it('Should update color when prop changes', () => {
      const { container, rerender } = render(<Text color="#FF5733">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.attr('style').contains('--rs-text-color: #ff5733');

      rerender(<Text color="rgb(51, 255, 87)">Text</Text>);
      expect(element).to.have.attr('style').contains('--rs-text-color: rgb(51, 255, 87)');
    });

    it('Should handle preset colors correctly', () => {
      const { container } = render(<Text color="red">Text</Text>);
      const element = container.firstChild as HTMLElement;
      expect(element).to.have.class('rs-text-red');
      expect(element).to.not.have.attr('style');
    });
  });
});
