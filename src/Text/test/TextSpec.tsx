import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Text, { TextProps } from '../Text';

describe('Heading', () => {
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
});
