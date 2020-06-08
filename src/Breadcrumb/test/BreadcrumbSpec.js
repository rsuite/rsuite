import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance } from '@test/testUtils';
import Breadcrumb from '../Breadcrumb';

describe('Breadcrumb', () => {
  it('Should apply id to the wrapper ol element', () => {
    const instance = getInstance(<Breadcrumb id="custom-id" />);
    const olNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ol');

    assert.equal(olNode.id, 'custom-id');
  });

  it('Should have breadcrumb class', () => {
    const instance = getInstance(<Breadcrumb />);
    const olNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ol');
    assert.include(olNode.className, 'breadcrumb');
  });

  it('Should have custom classes', () => {
    const instance = getDOMNode(<Breadcrumb className="custom-one custom-two" />);
    const classes = instance.className;

    assert.include(classes, 'breadcrumb');
    assert.include(classes, 'custom-one');
    assert.include(classes, 'custom-two');
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
    assert.equal(instance.querySelectorAll('.rs-breadcrumb-item')[1].innerText, '...');
  });

  it('Should call onExpand callback', done => {
    const instance = getDOMNode(
      <Breadcrumb
        onExpand={() => {
          done();
        }}
      >
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
        <Breadcrumb.Item>3</Breadcrumb.Item>
        <Breadcrumb.Item>4</Breadcrumb.Item>
        <Breadcrumb.Item>5</Breadcrumb.Item>
        <Breadcrumb.Item>6</Breadcrumb.Item>
      </Breadcrumb>
    );

    ReactTestUtils.Simulate.click(
      instance.querySelectorAll('.rs-breadcrumb-item')[1].querySelector('a')
    );
  });

  it('Should have a navigation role', () => {
    const instance = getDOMNode(<Breadcrumb />);

    assert.equal(instance.getAttribute('role'), 'navigation');
  });

  it('Should have an aria-label in ol', () => {
    const instance = getDOMNode(<Breadcrumb />);

    assert.equal(instance.getAttribute('aria-label'), 'breadcrumbs');
  });

  it('Should have a default separator', () => {
    const instance = getDOMNode(
      <Breadcrumb>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>
    );

    assert.equal(instance.querySelectorAll('li')[1].className, 'rs-breadcrumb-separator');
    assert.equal(instance.querySelectorAll('li')[1].innerText, '/');
  });

  it('Should have a custom separator', () => {
    const instance = getDOMNode(
      <Breadcrumb separator={<span>-</span>}>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>
    );

    assert.equal(instance.querySelectorAll('li')[1].className, 'rs-breadcrumb-separator');
    assert.equal(instance.querySelectorAll('li')[1].childNodes[0].tagName, 'SPAN');
    assert.equal(instance.querySelectorAll('li')[1].childNodes[0].innerText, '-');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Breadcrumb className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Breadcrumb style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Breadcrumb classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
