import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import PlaceholderParagraph from '../PlaceholderParagraph';

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

    expect(screen.getByTestId('p').lastElementChild?.lastElementChild).to.have.style(
      'height',
      '50px'
    );
  });

  it('Should has a 50px gap between rows', () => {
    render(<PlaceholderParagraph rowSpacing={50} data-testid="p" />);

    expect(screen.getByTestId('p').lastElementChild?.lastElementChild).to.have.style(
      'margin-top',
      '50px'
    );
  });

  it('Should render graph', () => {
    render(<PlaceholderParagraph graph data-testid="p" />);

    expect(screen.getByTestId('p').firstElementChild).to.have.class(
      'rs-placeholder-paragraph-graph'
    );
  });

  it('Should render circle graph', () => {
    render(<PlaceholderParagraph graph="circle" data-testid="p" />);

    expect(screen.getByTestId('p').firstElementChild).to.have.class(
      'rs-placeholder-paragraph-graph-circle'
    );
  });

  it('Should render image graph', () => {
    render(<PlaceholderParagraph graph="image" data-testid="p" />);

    expect(screen.getByTestId('p').firstElementChild).to.have.class(
      'rs-placeholder-paragraph-graph-image'
    );
  });

  it('Should be active', () => {
    render(<PlaceholderParagraph active data-testid="p" />);

    expect(screen.getByTestId('p')).to.have.class('rs-placeholder-active');
  });
});
