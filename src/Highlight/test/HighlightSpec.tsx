import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Highlight from '../Highlight';

describe('Highlight', () => {
  testStandardProps(<Highlight />);

  it('Should render a div element', () => {
    const { container } = render(<Highlight />);
    expect(container.firstChild).to.be.tagName('div');
    expect(container.firstChild).to.have.class('rs-highlight');
  });

  it('Should render a custom element', () => {
    const { container } = render(<Highlight as="span" />);
    expect(container.firstChild).to.be.tagName('span');
  });

  it('Should highlight the matching text', () => {
    render(<Highlight query="React">React Suite</Highlight>);

    expect(screen.getByText('React')).to.have.class('rs-highlight-mark');
  });

  it('Should highlight the matching multiple text', () => {
    render(
      <Highlight data-testid="high" query="React">
        React Suite is a suite of React components
      </Highlight>
    );

    expect(screen.getAllByText('React')).to.have.length(2);

    expect(screen.getByTestId('high')).to.have.html(
      '<mark class="rs-highlight-mark">React</mark> Suite is a suite of <mark class="rs-highlight-mark">React</mark> components'
    );
  });

  it('Should handle multiple queries', () => {
    render(
      <Highlight data-testid="high" query={['high quality', 'high performance']}>
        React Suite is a set of react components that have high quality and high performance.
      </Highlight>
    );

    expect(screen.getByTestId('high')).to.have.html(
      'React Suite is a set of react components that have <mark class="rs-highlight-mark">high quality</mark> and <mark class="rs-highlight-mark">high performance</mark>.'
    );
  });

  it('Should handle no matches', () => {
    render(<Highlight query="foo">React Suite</Highlight>);
    expect(screen.getByText('React Suite')).to.exist;
  });

  it('Should custom render mark', () => {
    render(
      <Highlight
        query="React"
        renderMark={(patch, index) => (
          <span key={index} data-testid="mark">
            {patch}
          </span>
        )}
      >
        React Suite
      </Highlight>
    );

    expect(screen.getByTestId('mark')).to.have.text('React');
  });
});
