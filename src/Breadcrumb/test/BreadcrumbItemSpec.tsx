import React from 'react';
import { getDOMNode, getInstance } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Breadcrumb from '../Breadcrumb';
import BreadcrumbItem from '../BreadcrumbItem';
import Sinon from 'sinon';
import { fireEvent } from '@testing-library/react';

describe('Breadcrumb.Item', () => {
  testStandardProps(<BreadcrumbItem />);

  it('Should render `a` as inner element when is not active', () => {
    const instance = getDOMNode(<Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>);

    expect(instance).to.not.have.class('rs-breadcrumb-item-active');
  });

  it('Should render `span.active` with `active` attribute set.', () => {
    const instance = getDOMNode(<Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>);

    expect(instance).to.have.class('rs-breadcrumb-item-active');
    expect(instance.tagName).to.equal('SPAN');
  });

  it('Should render `span.active` when active and has href', () => {
    const instance = getDOMNode(
      <Breadcrumb.Item href="#" active>
        Active Crumb
      </Breadcrumb.Item>
    );

    expect(instance).to.have.class('rs-breadcrumb-item-active');
    expect(instance.tagName).to.equal('SPAN');
    expect(instance).to.not.have.attribute('href');
  });

  it('Should spread additional props onto inner element', () => {
    const onClick = Sinon.spy();

    const instance = getDOMNode(
      <Breadcrumb.Item href="#" onClick={onClick}>
        Crumb
      </Breadcrumb.Item>
    );

    fireEvent.click(instance);

    expect(onClick).to.have.been.calledOnce;
  });

  it('Should apply id onto the anchor', () => {
    const instance = getInstance(
      <Breadcrumb.Item href="#" id="test-link-id">
        Crumb
      </Breadcrumb.Item>
    );

    expect(instance.id).to.equal('test-link-id');
  });

  it('Should apply `href` property onto `a` inner element', () => {
    const instance = getInstance(
      <Breadcrumb.Item href="http://rsuitejs.com/">Crumb</Breadcrumb.Item>
    );

    expect(instance).to.have.attribute('href', 'http://rsuitejs.com/');
  });

  it('Should apply `title` property onto `a` inner element', () => {
    const instance = getInstance(
      <Breadcrumb.Item title="test-title" href="http://rsuitejs.com/">
        Crumb
      </Breadcrumb.Item>
    );

    expect(instance).to.have.attribute('title', 'test-title');
  });

  it('Should set `target` attribute on `anchor`', () => {
    const instance = getInstance(
      <Breadcrumb.Item target="_blank" href="http://rsuitejs.com/">
        Crumb
      </Breadcrumb.Item>
    );

    expect(instance).to.have.attribute('target', '_blank');
  });

  it('Should be rendered as an a element, only if the href prop is set', () => {
    const span = getDOMNode(<Breadcrumb.Item />);
    const link = getDOMNode(<Breadcrumb.Item href="#" />);

    expect(span.tagName).to.equal('SPAN');
    expect(link.tagName).to.equal('A');
  });
});
