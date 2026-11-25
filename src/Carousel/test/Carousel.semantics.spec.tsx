import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Carousel from '../Carousel';
import CustomProvider from '../../CustomProvider';
import zhCN from '../../locales/zh_CN';

const slides = [<div key="first">First</div>, <div key="second">Second</div>];

describe('Carousel container and slide semantics', () => {
  it('names the active slide position inside a described carousel group', () => {
    render(<Carousel aria-label="Featured stories">{slides}</Carousel>);
    const carousel = screen.getByRole('group', { name: 'Featured stories' });
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    const slide = within(carousel).getByRole('group', { name: '1 of 2' });
    expect(slide).toHaveAttribute('aria-roledescription', 'slide');
    expect(within(carousel).getAllByRole('group')).toHaveLength(1);
    expect(within(carousel).getByRole('radio', { name: 'Slide 1 of 2' })).toBeChecked();
  });

  it('uses visible labels and explicit slide names', () => {
    render(
      <>
        <h2 id="gallery-title">Destinations</h2>
        <Carousel aria-labelledby="gallery-title" defaultActiveIndex={1}>
          <article aria-label="Mountain view">Mountain</article>
          <article aria-labelledby="city-title">
            <h3 id="city-title">City skyline</h3>
          </article>
        </Carousel>
      </>
    );
    const carousel = screen.getByRole('group', { name: 'Destinations' });
    expect(within(carousel).getByRole('group', { name: 'City skyline' })).toBeTruthy();
    fireEvent.click(within(carousel).getByRole('radio', { name: 'Mountain view' }));
    expect(within(carousel).getByRole('group', { name: 'Mountain view' })).toBeTruthy();
    expect(within(carousel).queryByRole('group', { name: 'City skyline' })).toBeNull();
  });

  it('preserves an explicit landmark role and role description', () => {
    render(
      <Carousel role="region" aria-label="Destinations" aria-roledescription="image gallery">
        {slides}
      </Carousel>
    );
    expect(screen.getByRole('region', { name: 'Destinations' })).toHaveAttribute(
      'aria-roledescription',
      'image gallery'
    );
  });

  it('does not add a role description to an explicitly presentational container', () => {
    const { container } = render(<Carousel role="presentation">{slides}</Carousel>);
    expect(container.firstElementChild).toHaveAttribute('role', 'presentation');
    expect(container.firstElementChild).not.toHaveAttribute('aria-roledescription');
  });

  it('merges translated descriptions with a partial component locale', () => {
    render(
      <CustomProvider locale={zhCN}>
        <Carousel
          aria-label="精选内容"
          locale={{ carouselRoleDescription: '内容画廊', slidePosition: '{0}/{1} ({0})' }}
        >
          {slides}
        </Carousel>
      </CustomProvider>
    );
    const carousel = screen.getByRole('group', { name: '精选内容' });
    expect(carousel).toHaveAttribute('aria-roledescription', '内容画廊');
    expect(within(carousel).getByRole('group', { name: '1/2 (1)' })).toHaveAttribute(
      'aria-roledescription',
      '幻灯片'
    );
  });

  it('keeps older provider Carousel translations valid', () => {
    render(
      <CustomProvider
        locale={{ Carousel: { selectSlide: 'Choose a story', slideLabel: 'Story {0}' } }}
      >
        <Carousel aria-label="Stories">{slides}</Carousel>
      </CustomProvider>
    );
    const carousel = screen.getByRole('group', { name: 'Stories' });
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    expect(within(carousel).getByRole('group', { name: '1 of 2' })).toHaveAttribute(
      'aria-roledescription',
      'slide'
    );
    expect(within(carousel).getByRole('radiogroup', { name: 'Choose a story' })).toBeTruthy();
  });

  it('numbers flattened slides and updates the active group after selection', () => {
    render(
      <Carousel aria-label="Stories">
        {null}
        <>{slides}</>
        {false}
        <div>Third</div>
      </Carousel>
    );
    const carousel = screen.getByRole('group', { name: 'Stories' });
    expect(within(carousel).getByRole('group', { name: '1 of 3' })).toBeTruthy();
    fireEvent.click(within(carousel).getByRole('radio', { name: 'Slide 3 of 3' }));
    expect(within(carousel).getByRole('group', { name: '3 of 3' })).toBeTruthy();
    expect(within(carousel).getAllByRole('group')).toHaveLength(1);
  });

  it('preserves native image and SVG semantics inside slide groups', () => {
    render(
      <Carousel aria-label="Pictures">
        <img alt="Lake" />
        <svg role="img" aria-label="Map" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="5" />
        </svg>
      </Carousel>
    );
    const carousel = screen.getByRole('group', { name: 'Pictures' });
    expect(within(carousel).getByRole('img', { name: 'Lake' }).tagName).toBe('IMG');
    expect(within(carousel).getByRole('group', { name: '1 of 2' })).toBeTruthy();
    fireEvent.click(within(carousel).getByRole('radio', { name: 'Map' }));
    expect(within(carousel).getByRole('img', { name: 'Map' }).tagName).toBe('svg');
    expect(within(carousel).getByRole('group', { name: 'Map' })).toBeTruthy();
  });
});
