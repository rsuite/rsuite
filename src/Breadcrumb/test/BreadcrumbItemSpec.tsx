import React from 'react';
import { testStandardProps } from '@test/commonCases';
import Breadcrumb from '../Breadcrumb';
import BreadcrumbItem from '../BreadcrumbItem';
import Sinon from 'sinon';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Breadcrumb.Item', () => {
  testStandardProps(<BreadcrumbItem />);

  it('Should render `a` as inner element when is not active', () => {
    const { container } = render(<Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>);

    expect(container.firstChild).to.not.have.class('rs-breadcrumb-item-active');
    expect(container.firstChild).to.have.tagName('a');
  });

  it('Should render `span.active` with `active` attribute set.', () => {
    const { container } = render(<Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>);

    expect(container.firstChild).to.have.class('rs-breadcrumb-item-active');
    expect(container.firstChild).to.have.tagName('SPAN');
  });

  it('Should render `span.active` when active and has href', () => {
    const { container } = render(
      <Breadcrumb.Item href="#" active>
        Active Crumb
      </Breadcrumb.Item>
    );

    expect(container.firstChild).to.have.class('rs-breadcrumb-item-active');
    expect(container.firstChild).to.have.tagName('SPAN');
    expect(container.firstChild).to.not.have.attr('href');
  });

  it('Should spread additional props onto inner element', () => {
    const onClick = Sinon.spy();

    render(
      <Breadcrumb.Item href="#" onClick={onClick}>
        Crumb
      </Breadcrumb.Item>
    );

    fireEvent.click(screen.getByText('Crumb'));

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should apply id onto the anchor', () => {
    const { container } = render(
      <Breadcrumb.Item href="#" id="test-link-id">
        Crumb
      </Breadcrumb.Item>
    );

    expect(container.firstChild).to.have.id('test-link-id');
  });

  it('Should apply `href` property onto `a` inner element', () => {
    const { container } = render(
      <Breadcrumb.Item href="http://rsuitejs.com/">Crumb</Breadcrumb.Item>
    );

    expect(container.firstChild).to.have.attribute('href', 'http://rsuitejs.com/');
  });

  it('Should apply `title` property onto `a` inner element', () => {
    const { container } = render(
      <Breadcrumb.Item title="test-title" href="http://rsuitejs.com/">
        Crumb
      </Breadcrumb.Item>
    );

    expect(container.firstChild).to.have.attribute('title', 'test-title');
  });

  it('Should set `target` attribute on `anchor`', () => {
    const { container } = render(
      <Breadcrumb.Item target="_blank" href="http://rsuitejs.com/">
        Crumb
      </Breadcrumb.Item>
    );

    expect(container.firstChild).to.have.attribute('target', '_blank');
  });

  it('Should be rendered as an a element, only if the href prop is set', () => {
    const { container, rerender } = render(<Breadcrumb.Item />);
    expect(container.firstChild).to.have.tagName('SPAN');

    rerender(<Breadcrumb.Item href="#" />);
    expect(container.firstChild).to.have.tagName('A');
  });
});
