import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Carousel from '../Carousel';
import CustomProvider from '../../CustomProvider';
import zhCN from '../../locales/zh_CN';

const slides = [<div key="first">First</div>, <div key="second">Second</div>];

describe('Carousel indicator names', () => {
  it('names the radio group and each slide position', () => {
    render(<Carousel>{slides}</Carousel>);
    const group = screen.getByRole('radiogroup', { name: 'Choose slide' });
    expect(within(group).getByRole('radio', { name: 'Slide 1 of 2' })).toBeChecked();
    expect(within(group).getByRole('radio', { name: 'Slide 2 of 2' })).not.toBeChecked();
    expect(within(group).queryAllByRole('listitem')).toHaveLength(0);
  });

  it('merges provider translations and a partial component override', () => {
    render(
      <CustomProvider locale={zhCN}>
        <Carousel locale={{ selectSlide: 'Featured stories' }}>{slides}</Carousel>
      </CustomProvider>
    );
    const group = screen.getByRole('radiogroup', { name: 'Featured stories' });
    fireEvent.click(within(group).getByRole('radio', { name: '第 2 张，共 2 张' }));
    expect(within(group).getByRole('radio', { name: '第 2 张，共 2 张' })).toBeChecked();
  });

  it('retains default names when an older provider locale has no Carousel section', () => {
    render(
      <CustomProvider locale={{ code: 'custom' }}>
        <Carousel locale={{ slideLabel: 'Item {0}/{1} ({0})' }}>{slides}</Carousel>
      </CustomProvider>
    );
    const group = screen.getByRole('radiogroup', { name: 'Choose slide' });
    expect(within(group).getByRole('radio', { name: 'Item 1/2 (1)' })).toBeChecked();
    expect(within(group).getByRole('radio', { name: 'Item 2/2 (2)' })).not.toBeChecked();
  });

  it('uses explicit slide names even while the corresponding slide is hidden', () => {
    render(
      <Carousel>
        <div aria-label="Mountain view">First</div>
        <div aria-labelledby="slide-heading">
          <h2 id="slide-heading">City skyline</h2>
        </div>
      </Carousel>
    );
    expect(screen.getByRole('radio', { name: 'Mountain view' })).toBeChecked();
    const city = screen.getByRole('radio', { name: 'City skyline' });
    expect(city).not.toBeChecked();
    fireEvent.click(city);
    expect(city).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Mountain view' })).not.toBeChecked();
  });

  it('updates names when the provider locale changes without resetting selection', () => {
    const { rerender } = render(
      <CustomProvider>
        <Carousel>{slides}</Carousel>
      </CustomProvider>
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Slide 2 of 2' }));
    rerender(
      <CustomProvider locale={zhCN}>
        <Carousel>{slides}</Carousel>
      </CustomProvider>
    );
    expect(screen.getByRole('radiogroup', { name: '选择幻灯片' })).toBeTruthy();
    expect(screen.getByRole('radio', { name: '第 2 张，共 2 张' })).toBeChecked();
  });

  it('numbers the rendered slides across fragments and empty children', () => {
    render(
      <Carousel>
        {null}
        <>
          <div>First</div>
          <div>Second</div>
        </>
        {false}
        <div>Third</div>
      </Carousel>
    );
    expect(screen.getAllByRole('radio').map(input => input.getAttribute('aria-label'))).toEqual([
      'Slide 1 of 3',
      'Slide 2 of 3',
      'Slide 3 of 3'
    ]);
  });
});
