import React from 'react';
import sinon from 'sinon';
import { render, screen, fireEvent } from '@testing-library/react';
import SafeAnchor from '../SafeAnchor';

describe('SafeAnchor', () => {
  it('Should output a Anchor', () => {
    const { container } = render(<SafeAnchor>Title</SafeAnchor>);

    expect(container.firstChild).to.have.attr('href', '#');
    expect(container.firstChild).to.have.attr('role', 'button');
    expect(container.firstChild).to.have.text('Title');
  });

  it('Should call onClick callback', () => {
    const onClick = sinon.spy();
    render(<SafeAnchor onClick={onClick}>Title</SafeAnchor>);

    fireEvent.click(screen.getByText('Title'));

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should call onClick callback', () => {
    const onClick = sinon.spy();
    render(
      <SafeAnchor onClick={onClick} href="#">
        Title
      </SafeAnchor>
    );
    fireEvent.click(screen.getByText('Title'));

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should not prevent the default value when href is provided', () => {
    const handleClick = sinon.spy();
    render(
      <SafeAnchor onClick={handleClick} href="#foo">
        Title
      </SafeAnchor>
    );
    fireEvent.click(screen.getByText('Title'));

    expect(handleClick).to.have.been.calledOnce;
    expect(handleClick.getCall(0).args[0].isDefaultPrevented()).to.be.false;
  });

  it('Should disabled onClick callback and tabIndex = -1', () => {
    const handleClick = sinon.spy();
    const { container } = render(
      <SafeAnchor onClick={handleClick} disabled>
        Title
      </SafeAnchor>
    );
    fireEvent.click(screen.getByText('Title'));

    expect(handleClick).to.not.have.been.calledOnce;
    expect(container.firstChild).to.have.attr('tabindex', '-1');
  });

  it('Should output an anchor and has href', () => {
    const href = '/url';
    const { container } = render(<SafeAnchor href={href}>Title</SafeAnchor>);

    expect(container.firstChild).to.not.have.attr('role');
    expect(container.firstChild).to.have.attr('href', href);
  });

  it('Should have a custom className', () => {
    const { container } = render(<SafeAnchor className="custom" />);
    expect(container.firstChild).to.have.class('custom');
  });
});
