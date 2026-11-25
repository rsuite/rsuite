import React from 'react';
import StatHelpText from '../StatHelpText';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('StatHelpText', () => {
  testStandardProps(<StatHelpText />);

  it('Should render a span element by default', () => {
    const { container } = render(<StatHelpText />);
    expect(container.firstChild).to.have.tagName('SPAN');
  });

  it('Should render with the correct class name', () => {
    const { container } = render(<StatHelpText />);
    expect(container.firstChild).to.have.class('rs-stat-help-text');
  });

  it('Should render children', () => {
    render(<StatHelpText>Help information</StatHelpText>);
    expect(screen.getByText('Help information')).to.exist;
  });

  it('Should accept a custom element via the `as` prop', () => {
    const { container } = render(<StatHelpText as="p" />);
    expect(container.firstChild).to.have.tagName('P');
  });

  it('Should forward ref to the root element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<StatHelpText ref={ref} />);
    expect(ref.current).to.be.instanceOf(HTMLSpanElement);
  });
});
