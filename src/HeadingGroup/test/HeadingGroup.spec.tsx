import React from 'react';
import HeadingGroup from '../HeadingGroup';
import Heading from '../../Heading';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('HeadingGroup', () => {
  testStandardProps(<HeadingGroup />);

  it('Should render an hgroup element', () => {
    const { container } = render(<HeadingGroup />);
    expect(container.firstChild).to.have.tagName('HGROUP');
  });

  it('Should render with the correct class name', () => {
    const { container } = render(<HeadingGroup />);
    expect(container.firstChild).to.have.class('rs-heading-group');
  });

  it('Should render children', () => {
    render(
      <HeadingGroup>
        <Heading>Title</Heading>
        <Heading level={5}>Subtitle</Heading>
      </HeadingGroup>
    );

    expect(screen.getByRole('heading', { level: 3 })).to.have.text('Title');
    expect(screen.getByRole('heading', { level: 5 })).to.have.text('Subtitle');
  });

  it('Should accept a custom element via the `as` prop', () => {
    const { container } = render(<HeadingGroup as="div" />);
    expect(container.firstChild).to.have.tagName('DIV');
  });

  it('Should forward ref to the root element', () => {
    const ref = React.createRef<HTMLElement>();
    render(<HeadingGroup ref={ref} />);
    expect(ref.current).to.be.instanceOf(HTMLElement);
    expect(ref.current?.tagName).to.equal('HGROUP');
  });
});
