import React from 'react';
import PlaceholderParagraph from '../PlaceholderParagraph';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Placeholder.Paragraph', () => {
  testStandardProps(<PlaceholderParagraph />);

  it('Should hava a `rs-placeholder-paragraph` class', () => {
    render(<PlaceholderParagraph data-testid="p" />);

    expect(screen.getByTestId('p')).to.have.class('rs-placeholder');
    expect(screen.getByTestId('p')).to.have.class('rs-placeholder-paragraph');
  });

  it('Should render 5 rows', () => {
    render(<PlaceholderParagraph rows={5} data-testid="p" />);

    expect(screen.getByTestId('p').lastElementChild?.children).to.have.length(5);
  });

  it('Height of rows should be 50px', () => {
    render(<PlaceholderParagraph rowHeight={50} data-testid="p" />);

    expect(screen.getByTestId('p')).to.have.style('--rs-placeholder-row-height', '50px');
  });

  it('Should has a 50px gap between rows', () => {
    render(<PlaceholderParagraph rowSpacing={50} data-testid="p" />);

    expect(screen.getByTestId('p')).to.have.style('--rs-placeholder-row-spacing', '50px');
  });

  it('Should render graph', () => {
    render(<PlaceholderParagraph graph data-testid="p" />);

    expect(screen.getByTestId('p').firstElementChild).to.have.attr('data-shape', 'square');
  });

  it('Should render circle graph', () => {
    render(<PlaceholderParagraph graph="circle" data-testid="p" />);

    expect(screen.getByTestId('p').firstElementChild).to.have.attr('data-shape', 'circle');
  });

  it('Should render image graph', () => {
    render(<PlaceholderParagraph graph="image" data-testid="p" />);

    expect(screen.getByTestId('p').firstElementChild).to.have.attr('data-shape', 'image');
  });

  it('Should be active', () => {
    render(<PlaceholderParagraph active data-testid="p" />);

    expect(screen.getByTestId('p')).to.have.attr('data-active', 'true');
  });
});
