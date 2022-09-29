import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { render, act, waitFor, fireEvent } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';
import Carousel from '../Carousel';

describe('Carousel', () => {
  testStandardProps(<Carousel />);

  it('Should button be displayed on the right', () => {
    const instance = getDOMNode(<Carousel placement="right" />);
    expect(instance.className).to.contain('carousel-placement-right');
  });

  it('Should render 2 subitems', () => {
    const instance = getDOMNode(
      <Carousel>
        <img />
        {undefined}
        <img />
      </Carousel>
    );

    expect(instance.querySelector('.rs-carousel-slider').childNodes.length).to.equal(2);
    expect(instance.querySelectorAll('.rs-carousel-label-wrapper').length).to.equal(2);
  });

  it('Should button be displayed as a bar', () => {
    const instance = getDOMNode(<Carousel shape="bar" />);
    expect(instance.className).to.contain('carousel-shape-bar');
  });

  it('Should be autoplay', async () => {
    const style = { height: 20 };
    const onSlideStartSpy = sinon.spy();
    getDOMNode(
      <Carousel
        autoplay
        autoplayInterval={500}
        onSlideStart={onSlideStartSpy}
        style={{ width: 200, height: 20 }}
      >
        <div style={style}>1</div>
        <div style={style}>2</div>
      </Carousel>
    );

    await waitFor(() => {
      expect(onSlideStartSpy).to.called;
    });
  });

  it('Should call `onSlideStart` callback', async () => {
    const onSlideStartSpy = sinon.spy();
    const instance = getDOMNode(
      <Carousel onSlideStart={onSlideStartSpy}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );

    const input = instance.querySelectorAll('.rs-carousel-label-wrapper')[1].querySelector('input');

    fireEvent.click(input);

    await waitFor(() => {
      expect(onSlideStartSpy).to.called;
    });
  });

  it('Should call `onSelect` callback', async () => {
    const onSelectSpy = sinon.spy();
    const instance = getDOMNode(
      <Carousel onSelect={onSelectSpy}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );

    const input = instance.querySelectorAll('.rs-carousel-label-wrapper')[1].querySelector('input');

    act(() => {
      Simulate.change(input);
    });

    await waitFor(() => {
      expect(onSelectSpy).to.called;
    });
  });

  it('Should call `onSlideEnd` callback', async () => {
    const onSlideEndSpy = sinon.spy();

    const instance = getDOMNode(
      <Carousel onSlideEnd={onSlideEndSpy}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );

    Simulate.transitionEnd(instance.querySelector('.rs-carousel-slider'));

    await waitFor(() => {
      expect(onSlideEndSpy).to.called;
    });
  });

  it('Should initialize with the default index position', () => {
    const instance = getDOMNode(
      <Carousel defaultActiveIndex={2}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Carousel>
    );
    expect(instance.querySelector('[aria-hidden=false]').textContent).to.equal('3');
  });

  it('Should handle active index dynamically', () => {
    const ref = React.createRef();
    const App = React.forwardRef((props, ref) => {
      const [index, setIndex] = React.useState(1);
      React.useImperativeHandle(ref, () => ({
        setIndex: newIndex => {
          setIndex(newIndex);
        }
      }));

      return (
        <Carousel activeIndex={index}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </Carousel>
      );
    });

    const { container } = render(<App ref={ref} />);

    expect(container.querySelector('[aria-hidden=false]').textContent).to.equal('2');

    act(() => {
      ref.current.setIndex(3);
    });

    expect(container.querySelector('[aria-hidden=false]').textContent).to.equal('4');
  });
});
