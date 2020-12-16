import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance } from '@test/testUtils';
import Breadcrumb from '../Breadcrumb';

describe('Breadcrumb', () => {
  it('Should apply id to the wrapper nav element', () => {
    const instance = getDOMNode(<Breadcrumb id="custom-id" />);

    assert.equal(instance.tagName, 'NAV');
    assert.equal(instance.id, 'custom-id');
  });

  it('Should have breadcrumb class', () => {
    const instance = getInstance(<Breadcrumb />);
    assert.include(instance.className, 'breadcrumb');
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

    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-breadcrumb-item')[1]);
  });

  it('Should have a default separator', () => {
    const instance = getDOMNode(
      <Breadcrumb>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>
    );

    assert.equal(instance.childNodes[1].className, 'rs-breadcrumb-separator');
    assert.equal(instance.childNodes[1].innerText, '/');
  });

  it('Should have a custom separator', () => {
    const instance = getDOMNode(
      <Breadcrumb separator={<span>-</span>}>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
      </Breadcrumb>
    );

    assert.equal(instance.childNodes[1].className, 'rs-breadcrumb-separator');
    assert.equal(instance.childNodes[1].tagName, 'SPAN');
    assert.equal(instance.childNodes[1].innerText, '-');
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
