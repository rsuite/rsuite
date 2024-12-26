import React from 'react';
import sinon from 'sinon';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
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
      (container.querySelector('.rs-carousel-slider') as HTMLElement).childNodes.length
    ).to.equal(2);

    expect(container.querySelectorAll('.rs-carousel-label-wrapper').length).to.equal(2);
  });

  it('Should button be displayed as a bar', () => {
    const { container } = render(<Carousel shape="bar" />);

    expect(container.firstChild).to.have.class('rs-carousel-shape-bar');
  });

  it('Should be autoplay', async () => {
    const style = { height: 20 };
    const onSlideStart = sinon.spy();
    render(
      <Carousel
        autoplay
        autoplayInterval={500}
        onSlideStart={onSlideStart}
        style={{ width: 200, height: 20 }}
      >
        <div style={style}>1</div>
        <div style={style}>2</div>
      </Carousel>
    );

    await waitFor(() => {
      expect(onSlideStart).to.called;
    });
  });

  it('Should call `onSlideStart` callback', async () => {
    const onSlideStart = sinon.spy();
    render(
      <Carousel onSlideStart={onSlideStart}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );

    fireEvent.click(screen.getAllByRole('radio')[1]);

    await waitFor(() => {
      expect(onSlideStart).to.called;
    });
  });

  it('Should call `onSelect` callback', async () => {
    const onSelect = sinon.spy();
    render(
      <Carousel onSelect={onSelect}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );

    fireEvent.click(screen.getAllByRole('radio')[1]);

    await waitFor(() => {
      expect(onSelect).to.called;
    });
  });

  it('Should call `onSlideEnd` callback', async () => {
    const onSlideEnd = sinon.spy();

    render(
      <Carousel onSlideEnd={onSlideEnd}>
        <div>1</div>
        <div>2</div>
      </Carousel>
    );

    fireEvent.transitionEnd(screen.getByTestId('carousel-slider'));

    await waitFor(() => {
      expect(onSlideEnd).to.called;
    });
  });

  it('Should initialize with the default index position', () => {
    render(
      <Carousel defaultActiveIndex={2}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Carousel>
    );
    expect(screen.getByText('3')).to.have.attribute('aria-hidden', 'false');
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
