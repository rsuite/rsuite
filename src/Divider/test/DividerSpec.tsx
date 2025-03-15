import React from 'react';
import Divider from '../Divider';
import Button from '../../Button';
import { testStandardProps, testStyleProps } from '@test/utils';
import { render, screen } from '@testing-library/react';

describe('Divider', () => {
  testStandardProps(<Divider />);
  testStyleProps(Divider, {
    sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
    colors: ['red', 'green', 'blue', 'yellow', 'violet'],
    spacing: ['xs', 'sm', 'md', 'lg', 'xl']
  });

  it('Should render a Divider', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).to.have.class('rs-divider');
  });

  it('Should be vertical', () => {
    render(<Divider vertical />);
    expect(screen.getByRole('separator')).to.have.attribute('data-orientation', 'vertical');
  });

  it('Should have a children', () => {
    render(<Divider>label</Divider>);
    expect(screen.getByRole('separator')).to.have.attribute('data-with-label', 'true');
    expect(screen.getByRole('separator')).to.have.text('label');
  });

  it('Should render with different appearances', () => {
    const { rerender } = render(<Divider appearance="dashed" />);
    expect(screen.getByRole('separator')).to.have.attribute('data-appearance', 'dashed');

    rerender(<Divider appearance="dotted" />);
    expect(screen.getByRole('separator')).to.have.attribute('data-appearance', 'dotted');
  });

  describe('Label', () => {
    it('Should render with text label', () => {
      render(<Divider label="Test Label" />);
      expect(screen.getByRole('separator')).to.have.attribute('data-with-label', 'true');
      expect(screen.getByRole('separator')).to.have.text('Test Label');
    });

    it('Should render with component label', () => {
      render(<Divider label={<Button>Click Me</Button>} />);
      expect(screen.getByRole('separator')).to.have.attribute('data-with-label', 'true');
      expect(screen.getByRole('button')).to.exist;
    });

    it('Should render with different label positions', () => {
      const { rerender } = render(<Divider label="Left" labelPosition="left" />);
      expect(screen.getByRole('separator')).to.have.attribute('data-position', 'left');

      rerender(<Divider label="Right" labelPosition="right" />);
      expect(screen.getByRole('separator')).to.have.attribute('data-position', 'right');

      rerender(<Divider label="Center" />);
      expect(screen.getByRole('separator')).to.not.have.attribute('data-position');
    });
  });
});
