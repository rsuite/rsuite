import React from 'react';
import Box from '../Box';
import { render } from '@testing-library/react';
import { testStandardProps, getStyle } from '@test/utils';

describe('Box', () => {
  testStandardProps(<Box />);

  it('Should render a div by default', () => {
    const { container } = render(<Box>Content</Box>);
    const box = container.firstChild as HTMLElement;

    expect(box.tagName).to.equal('DIV');
    expect(box).to.have.class('rs-box');
    expect(box).to.have.text('Content');
  });

  it('Should render with custom element', () => {
    const { container } = render(<Box as="section">Content</Box>);
    const box = container.firstChild as HTMLElement;

    expect(box.tagName).to.equal('SECTION');
  });

  it('Should render with componentAs prop', () => {
    const { container } = render(
      <Box as="div" componentAs="section">
        Content
      </Box>
    );
    const box = container.firstChild as HTMLElement;

    expect(box.tagName).to.equal('SECTION');
  });

  it('Should render with visible prop', () => {
    const { container } = render(<Box visible="sm">Content</Box>);
    const box = container.firstChild as HTMLElement;

    expect(box).to.have.class('rs-box-visible-sm');
  });

  it('Should render with hidden prop', () => {
    const { container } = render(<Box hidden="md">Content</Box>);
    const box = container.firstChild as HTMLElement;

    expect(box).to.have.class('rs-box-hidden-md');
  });

  it('Should render with display prop', () => {
    const { container } = render(<Box display="flex">Content</Box>);
    const box = container.firstChild as HTMLElement;

    expect(getStyle(box, '--rs-box-display')).to.equal('flex');
  });

  it('Should render with multiple props', () => {
    const { container } = render(
      <Box visible="sm" hidden="md" display="flex" className="custom-class">
        Content
      </Box>
    );
    const box = container.firstChild as HTMLElement;

    expect(box).to.have.class('rs-box-visible-sm');
    expect(box).to.have.class('rs-box-hidden-md');
    expect(box).to.have.class('custom-class');
    expect(getStyle(box, '--rs-box-display')).to.equal('flex');
  });

  it('Should forward ref to the element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Box ref={ref}>Content</Box>);

    expect(ref.current).to.exist;
    expect(ref.current?.tagName).to.equal('DIV');
  });
});
