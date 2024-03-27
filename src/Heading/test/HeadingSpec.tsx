import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Heading, { HeadingProps } from '../Heading';

describe('Heading', () => {
  testStandardProps(<Heading />);

  it('Should render a h3 element by default', () => {
    render(<Heading />);
    expect(screen.getByRole('heading', { level: 3 })).to.exist;
  });

  [1, 2, 3, 4, 5, 6].forEach(level => {
    it(`Should render a h${level} element when 'level' is ${level}`, () => {
      render(<Heading level={level as HeadingProps['level']} />);

      expect(screen.getByRole('heading', { level })).to.exist;
    });
  });

  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(as => {
    it(`Should render a ${as} element when 'as' is '${as}'`, () => {
      render(<Heading as={as as HeadingProps['as']} />);

      expect(screen.getByRole('heading')).to.exist;
    });
  });
});
