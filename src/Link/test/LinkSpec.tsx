import React from 'react';
import sinon from 'sinon';
import Link from '../Link';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Link', () => {
  testStandardProps(<Link>Link</Link>);

  it('Should output an anchor', () => {
    render(<Link>Title</Link>);

    const link = screen.getByRole('link');
    expect(link).to.have.text('Title');
    expect(link).to.have.tagName('A');
    expect(link).to.have.class('rs-link');
  });

  it('Should call onClick callback', () => {
    const onClick = sinon.spy();

    render(<Link onClick={onClick}>Title</Link>);

    fireEvent.click(screen.getByRole('link'));

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should be disabled', () => {
    const { rerender } = render(<Link disabled>Title</Link>);

    const link = screen.getByText('Title');
    expect(link).to.have.attr('data-disabled', 'true');

    const onClick = sinon.spy();
    rerender(
      <Link disabled onClick={onClick}>
        Title
      </Link>
    );

    fireEvent.click(screen.getByText('Title'));
    expect(onClick).to.not.have.been.calledOnce;
  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    render(<Link className="custom-class">Title</Link>);

    expect(screen.getByRole('link')).to.have.class('custom-class');
    expect(screen.getByRole('link')).to.have.class('rs-link');
  });

  it('Should have correct underline attribute', () => {
    const { rerender } = render(<Link underline="always">Title</Link>);
    expect(screen.getByRole('link')).to.have.attr('data-underline', 'always');

    rerender(<Link underline="hover">Title</Link>);
    expect(screen.getByRole('link')).to.have.attr('data-underline', 'hover');

    rerender(<Link underline="not-hover">Title</Link>);
    expect(screen.getByRole('link')).to.have.attr('data-underline', 'not-hover');

    rerender(<Link underline="never">Title</Link>);
    expect(screen.getByRole('link')).to.have.attr('data-underline', 'never');
  });

  it('Should show anchor icon when showAnchorIcon is true', () => {
    render(<Link showAnchorIcon>Title</Link>);

    const link = screen.getByRole('link');
    expect(link.querySelector('.rs-link-icon')).to.exist;
  });

  it('Should use custom anchor icon when provided', () => {
    const customIcon = <span className="custom-icon">Icon</span>;
    render(
      <Link anchorIcon={customIcon} showAnchorIcon>
        Title
      </Link>
    );

    const link = screen.getByRole('link');
    expect(link).to.contain.text('TitleIcon');
    expect(link.querySelector('.custom-icon')).to.exist;
  });

  it('Should have external link attributes when external is true', () => {
    render(<Link external>Title</Link>);

    const link = screen.getByRole('link');
    expect(link).to.have.attr('target', '_blank');
    expect(link).to.have.attr('rel', 'noopener noreferrer');
  });

  it('Should access the underlying <a> element via `ref` attribute', () => {
    const linkRef = React.createRef<HTMLAnchorElement>();

    render(<Link ref={linkRef}>Text</Link>);

    expect(linkRef.current).to.be.instanceOf(HTMLAnchorElement);
  });

  it('Should render with custom component via `as` prop', () => {
    render(
      <Link as="span" role="link">
        Title
      </Link>
    );

    expect(screen.getByRole('link')).to.have.tagName('SPAN');
  });
});
