import React from 'react';
import sinon from 'sinon';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Breadcrumb from '../Breadcrumb';
import BreadcrumbItem from '../BreadcrumbItem';

describe('Breadcrumb.Item', () => {
  testStandardProps(<BreadcrumbItem />);

  it('Should render an anchor element when `href` is provided and `active` is false', () => {
    const { container } = render(<Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>);

    expect(container.firstChild).to.not.have.class('rs-breadcrumb-item-active');
    expect(screen.getByText('Crumb')).to.have.tagName('A');
  });

  it('Should render a span element with `active` class when `active` is true', () => {
    const { container } = render(<Breadcrumb.Item active>Crumb</Breadcrumb.Item>);

    expect(container.firstChild).to.have.class('rs-breadcrumb-item-active');
    expect(screen.getByText('Crumb')).to.have.tagName('SPAN');
  });

  it('Should render a span element when `active` is true, even if `href` is provided', () => {
    const { container } = render(
      <Breadcrumb.Item href="#" active>
        Crumb
      </Breadcrumb.Item>
    );

    expect(container.firstChild).to.have.class('rs-breadcrumb-item-active');
    expect(screen.getByText('Crumb')).to.have.tagName('SPAN');
    expect(screen.getByText('Crumb')).to.not.have.attribute('href');
  });

  it('Should pass additional props to the inner element', () => {
    const onClick = sinon.spy();

    render(
      <Breadcrumb.Item href="#" onClick={onClick}>
        Crumb
      </Breadcrumb.Item>
    );

    fireEvent.click(screen.getByText('Crumb'));

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should apply `id` to the anchor element', () => {
    const { container } = render(
      <Breadcrumb.Item href="#" id="test-link-id">
        Crumb
      </Breadcrumb.Item>
    );

    expect(container.firstChild).to.have.id('test-link-id');
  });

  it('Should apply `href` attribute to the anchor element', () => {
    render(<Breadcrumb.Item href="http://rsuitejs.com/">Crumb</Breadcrumb.Item>);

    expect(screen.getByText('Crumb')).to.have.attribute('href', 'http://rsuitejs.com/');
  });

  it('Should apply `title` attribute to the anchor element', () => {
    render(
      <Breadcrumb.Item title="test-title" href="http://rsuitejs.com/">
        Crumb
      </Breadcrumb.Item>
    );

    expect(screen.getByText('Crumb')).to.have.attribute('title', 'test-title');
  });

  it('Should apply `target` attribute to the anchor element', () => {
    render(
      <Breadcrumb.Item target="_blank" href="http://rsuitejs.com/">
        Crumb
      </Breadcrumb.Item>
    );

    expect(screen.getByText('Crumb')).to.have.attribute('target', '_blank');
  });

  it('Should render as an `a` element when `href` is set, otherwise as a `span`', () => {
    const { rerender } = render(<Breadcrumb.Item>Crumb</Breadcrumb.Item>);
    expect(screen.getByText('Crumb')).to.have.tagName('SPAN');

    rerender(<Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>);
    expect(screen.getByText('Crumb')).to.have.tagName('A');
  });

  it('Should render with a custom `as` element', () => {
    render(
      <Breadcrumb.Item as="div" href="#">
        Crumb
      </Breadcrumb.Item>
    );

    expect(screen.getByText('Crumb')).to.have.tagName('DIV');
  });

  it('Should render with a custom `wrapperAs` element', () => {
    const { container } = render(<Breadcrumb.Item wrapperAs="span">Crumb</Breadcrumb.Item>);

    expect(container.firstChild).to.have.tagName('SPAN');
  });

  it('Should render with a custom separator', () => {
    render(<Breadcrumb.Item separator={<span>separator</span>}>Crumb</Breadcrumb.Item>);

    expect(screen.getByText('separator')).to.exist;
  });
});
