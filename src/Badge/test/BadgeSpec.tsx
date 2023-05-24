import React from 'react';
import { testStandardProps } from '@test/commonCases';
import Badge from '../Badge';
import { render, screen } from '@testing-library/react';

describe('Badge', () => {
  testStandardProps(<Badge />);

  it('Should render independent', () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).to.have.class('rs-badge-independent');
  });

  it('Should render dot', () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).to.have.class('rs-badge-dot');
  });

  it('Should render content', () => {
    const content = 'NEW+';
    render(<Badge content={content} />);

    expect(screen.getByText(content)).to.exist;
  });

  it('Should be invisible', () => {
    const { container } = render(
      <Badge content={false}>
        <button data-testid="button">test</button>
      </Badge>
    );

    expect(container.firstChild).to.equal(screen.getByTestId('button'));
  });

  it('MaxCount is invalid', () => {
    const content = '999';
    render(<Badge content={content} />);

    expect(screen.getByText(content)).to.exist;
  });

  it('Should render default maxCount', () => {
    render(<Badge content={999} />);

    expect(screen.getByText('99+')).to.exist;
  });

  it('Should render customized maxCount', () => {
    const maxCount = 200;
    render(<Badge content={999} maxCount={maxCount} />);

    expect(screen.getByText(`${maxCount}+`)).to.exist;
  });

  it('Should render wrapper button', () => {
    const { container } = render(
      <Badge>
        <button>Test</button>
      </Badge>
    );

    expect(container.firstChild).to.have.class('rs-badge-wrapper');
  });
});
