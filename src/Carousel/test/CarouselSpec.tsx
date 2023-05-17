import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import sinon from 'sinon';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';
import Carousel from '../Carousel';

describe('Carousel', () => {
  testStandardProps(<Carousel />);

  it('Should button be displayed on the right', () => {
    const { container } = render(<Carousel placement="right" />);

    expect(container.firstChild).to.have.class('rs-carousel-placement-right');
  });

  it('Should render 2 subitems', () => {
    const { container } = render(
      <Carousel>
        <img />
        {undefined}
        <img />
      </Carousel>
    );

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      (container.querySelector('.rs-carousel-slider') as HTMLElement).childNodes.length
    ).to.equal(2);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelectorAll('.rs-carousel-label-wrapper').length).to.equal(2);
  });

  it('Should button be displayed as a bar', () => {
    const { container } = render(<Carousel shape="bar" />);

    expect(container.firstChild).to.have.class('rs-carousel-shape-bar');
  });

  it('Should be autoplay', async () => {
    const style = { height: 20 };
    const onSlideStartSpy = sinon.spy();
    render(
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
    const { container } = render(
      <Carousel onSlideStart={onSlideStartSpy}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );

    // eslint-disable-next-line testing-library/no-container
    const input = container
      // eslint-disable-next-line testing-library/no-node-access
      .querySelectorAll('.rs-carousel-label-wrapper')[1]
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('input') as HTMLInputElement;

    fireEvent.click(input);

    await waitFor(() => {
      expect(onSlideStartSpy).to.called;
    });
  });

  it('Should call `onSelect` callback', async () => {
    const onSelectSpy = sinon.spy();
    const { container } = render(
      <Carousel onSelect={onSelectSpy}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );

    // eslint-disable-next-line testing-library/no-container
    const input = container
      // eslint-disable-next-line testing-library/no-node-access
      .querySelectorAll('.rs-carousel-label-wrapper')[1]
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('input') as HTMLInputElement;

    act(() => {
      Simulate.change(input);
    });

    await waitFor(() => {
      expect(onSelectSpy).to.called;
    });
  });

  it('Should call `onSlideEnd` callback', async () => {
    const onSlideEndSpy = sinon.spy();

    const { container } = render(
      <Carousel onSlideEnd={onSlideEndSpy}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    Simulate.transitionEnd(container.querySelector('.rs-carousel-slider') as HTMLElement);

    await waitFor(() => {
      expect(onSlideEndSpy).to.called;
    });
  });

  it('Should initialize with the default index position', () => {
    const { container } = render(
      <Carousel defaultActiveIndex={2}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Carousel>
    );
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect((container.querySelector('[aria-hidden=false]') as HTMLElement).textContent).to.equal(
      '3'
    );
  });

  it('Should handle active index dynamically', () => {
    const { rerender } = render(
      <Carousel activeIndex={1}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Carousel>
    );

    expect(screen.getByText('1')).to.have.attr('aria-hidden', 'true');
    expect(screen.getByText('2')).to.have.attr('aria-hidden', 'false');
    expect(screen.getByText('3')).to.have.attr('aria-hidden', 'true');
    expect(screen.getByText('4')).to.have.attr('aria-hidden', 'true');

    rerender(
      <Carousel activeIndex={3}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Carousel>
    );

    expect(screen.getByText('1')).to.have.attr('aria-hidden', 'true');
    expect(screen.getByText('2')).to.have.attr('aria-hidden', 'true');
    expect(screen.getByText('3')).to.have.attr('aria-hidden', 'true');
    expect(screen.getByText('4')).to.have.attr('aria-hidden', 'false');
  });

  it('Should reset index when children change', () => {
    const { rerender } = render(
      <Carousel defaultActiveIndex={2}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
      </Carousel>
    );

    expect(screen.getByText('3')).to.have.attribute('aria-hidden', 'false');

    rerender(
      <Carousel defaultActiveIndex={2}>
        <button>1</button>
      </Carousel>
    );

    expect(screen.getByText('1')).to.have.attribute('aria-hidden', 'false');
  });
});
