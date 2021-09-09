import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import Carousel from '../Carousel';

describe('Carousel', () => {
  it('Should button be displayed on the right', () => {
    const instance = getDOMNode(<Carousel placement="right" />);
    assert.ok(instance.className.match(/\bcarousel-placement-right\b/));
  });

  it('Should render 2 subitems', () => {
    const instance = getDOMNode(
      <Carousel>
        <img />
        {undefined}
        <img />
      </Carousel>
    );
    assert.equal(instance.querySelector('.rs-carousel-slider').childNodes.length, 2);
    assert.equal(instance.querySelectorAll('.rs-carousel-label-wrapper').length, 2);
  });

  it('Should button be displayed as a bar', () => {
    const instance = getDOMNode(<Carousel shape="bar" />);
    assert.ok(instance.className.match(/\bcarousel-shape-bar\b/));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Carousel className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Carousel style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Carousel classPrefix="custom-prefix" md={1} />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should be autoplay', done => {
    const style = { height: 20 };
    getDOMNode(
      <Carousel
        autoplay
        autoplayInterval={500}
        onSlideStart={() => done()}
        style={{ width: 200, height: 20 }}
      >
        <div style={style}>1</div>
        <div style={style}>2</div>
      </Carousel>
    );
  });

  it('Should call `onSlideStart` callback', done => {
    const instance = getDOMNode(
      <Carousel onSlideStart={() => done()}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );

    const input = instance.querySelectorAll('.rs-carousel-label-wrapper')[1].querySelector('input');
    ReactTestUtils.Simulate.change(input);
  });

  it('Should call `onSelect` callback', done => {
    const instance = getDOMNode(
      <Carousel onSelect={() => done()}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );

    const input = instance.querySelectorAll('.rs-carousel-label-wrapper')[1].querySelector('input');
    ReactTestUtils.Simulate.change(input);
  });

  it('Should call `onSlideEnd` callback', done => {
    const instance = getDOMNode(
      <Carousel onSlideEnd={() => done()}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );

    ReactTestUtils.Simulate.transitionEnd(instance.querySelector('.rs-carousel-slider'));
  });
});
