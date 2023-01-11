import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { act, render } from '@testing-library/react';
import { getDOMNode, getInstance } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import sinon from 'sinon';
import Breadcrumb from '../Breadcrumb';

afterEach(() => {
  sinon.restore();
});

describe('Breadcrumb', () => {
  testStandardProps(<Breadcrumb />);

  it('Should apply id to the wrapper nav element', () => {
    const instance = getDOMNode(<Breadcrumb id="custom-id" />);

    assert.equal(instance.tagName, 'NAV');
    assert.equal(instance.id, 'custom-id');
  });

  it('Should have breadcrumb class', () => {
    const instance = getInstance(<Breadcrumb />);
    assert.include(instance.className, 'breadcrumb');
  });

  it('Should automatically collapse if there are more than 5 items', () => {
    const instance = getDOMNode(
      <Breadcrumb>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
        <Breadcrumb.Item>3</Breadcrumb.Item>
        <Breadcrumb.Item>4</Breadcrumb.Item>
        <Breadcrumb.Item>5</Breadcrumb.Item>
        <Breadcrumb.Item>6</Breadcrumb.Item>
      </Breadcrumb>
    );

    assert.equal(instance.querySelectorAll('.rs-breadcrumb-item').length, 3);
    assert.equal(instance.querySelectorAll('.rs-breadcrumb-item')[1].textContent, '...');
  });

  it('Should call onExpand callback', () => {
    const onExpand = sinon.spy();
    const instance = getDOMNode(
      <Breadcrumb onExpand={onExpand}>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
        <Breadcrumb.Item>3</Breadcrumb.Item>
        <Breadcrumb.Item>4</Breadcrumb.Item>
        <Breadcrumb.Item>5</Breadcrumb.Item>
        <Breadcrumb.Item>6</Breadcrumb.Item>
      </Breadcrumb>
    );

    act(() => {
      ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-breadcrumb-item')[1]);
    });

    expect(onExpand).to.have.been.calledOnce;
  });

  it('Should have a default separator', () => {
    const instance = getDOMNode(
      <Breadcrumb>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>
    );

    assert.equal((instance.childNodes[1] as HTMLElement).className, 'rs-breadcrumb-separator');
    assert.equal(instance.childNodes[1].textContent, '/');
  });

  it('Should have a custom separator', () => {
    const instance = getDOMNode(
      <Breadcrumb separator={<span>-</span>}>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>
    );

    assert.equal((instance.childNodes[1] as HTMLElement).className, 'rs-breadcrumb-separator');
    assert.equal((instance.childNodes[1] as HTMLElement).tagName, 'SPAN');
    assert.equal(instance.childNodes[1].textContent, '-');
  });

  it('Should not get "children with the same key" warning when generating items with array.map', () => {
    sinon.spy(console, 'error');

    const items = [{ text: 'Home', href: '/' }, { text: 'Current Page' }];

    render(
      <Breadcrumb>
        {items.map((item, index) => (
          <Breadcrumb.Item key={index} href={item.href} active={!item.href}>
            {item.text}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );

    expect(console.error).not.to.have.been.calledWith(
      sinon.match(/Warning: Encountered two children with the same key/)
    );
  });
});
