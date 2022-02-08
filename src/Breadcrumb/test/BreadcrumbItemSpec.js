import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import Breadcrumb from '../Breadcrumb';
import BreadcrumbItem from '../BreadcrumbItem';

describe('Breadcrumb.Item', () => {
  testStandardProps(<BreadcrumbItem />);

  it('Should render `a` as inner element when is not active', () => {
    const instance = getDOMNode(<Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>);

    assert.notInclude(instance.className, 'breadcrumb-item-active');
  });

  it('Should render `span.active` with `active` attribute set.', () => {
    const instance = getDOMNode(<Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>);
    assert.include(instance.className, 'breadcrumb-item-active');
    assert.equal(instance.tagName, 'SPAN');
  });

  it('Should render `span.active` when active and has href', () => {
    const instance = getDOMNode(
      <Breadcrumb.Item href="#" active>
        Active Crumb
      </Breadcrumb.Item>
    );

    assert.include(instance.className, 'breadcrumb-item-active');

    assert.ok(instance);
    assert.notOk(instance.hasAttribute('href'));
  });

  it('Should spread additional props onto inner element', done => {
    const handleClick = () => {
      done();
    };

    const instance = getDOMNode(
      <Breadcrumb.Item href="#" onClick={handleClick}>
        Crumb
      </Breadcrumb.Item>
    );

    ReactTestUtils.Simulate.click(instance);
  });

  it('Should apply id onto the anchor', () => {
    const instance = getInstance(
      <Breadcrumb.Item href="#" id="test-link-id">
        Crumb
      </Breadcrumb.Item>
    );

    assert.equal(instance.id, 'test-link-id');
  });

  it('Should apply `href` property onto `a` inner element', () => {
    const instance = getInstance(
      <Breadcrumb.Item href="http://rsuitejs.com/">Crumb</Breadcrumb.Item>
    );

    assert.equal(instance.href, 'http://rsuitejs.com/');
  });

  it('Should apply `title` property onto `a` inner element', () => {
    const instance = getInstance(
      <Breadcrumb.Item title="test-title" href="http://rsuitejs.com/">
        Crumb
      </Breadcrumb.Item>
    );
    assert.equal(instance.title, 'test-title');
  });

  it('Should set `target` attribute on `anchor`', () => {
    const instance = getInstance(
      <Breadcrumb.Item target="_blank" href="http://rsuitejs.com/">
        Crumb
      </Breadcrumb.Item>
    );
    assert.equal(instance.target, '_blank');
  });
});
