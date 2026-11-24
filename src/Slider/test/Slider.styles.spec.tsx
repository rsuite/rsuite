import React from 'react';
import Slider from '../index';
import RangeSlider from '../../RangeSlider';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { toRGB, getDefaultPalette, inChrome } from '@test/utils';

import '../styles/index.scss';

const { H500 } = getDefaultPalette();

describe('Slider styles', () => {
  it('Should render the correct styles', () => {
    const { container } = render(<Slider />);

    const bar = screen.getByTestId('slider-bar');
    const handle = screen.getByTestId('slider-handle');

    expect(container.firstChild).to.have.style('position', 'relative');
    expect(bar).to.have.style('background-color', toRGB('#f2f2f5'));
    expect(handle).to.have.style('position', 'absolute');
    inChrome &&
      expect(window.getComputedStyle(handle, '::before').border).to.equal(`2px solid ${H500}`);
  });
});

describe.each(['Slider', 'RangeSlider'])('%s custom mark positions', name => {
  const marks = [
    { value: 20, label: 'First' },
    { value: 40, label: 'Middle' },
    { value: 55, label: 'Last' }
  ];

  it.each([
    { direction: 'ltr', vertical: false },
    { direction: 'rtl', vertical: false },
    { direction: 'ltr', vertical: true },
    { direction: 'rtl', vertical: true }
  ] as const)(
    'positions marks from the value origin ($direction, vertical=$vertical)',
    ({ direction, vertical }) => {
      const props = { min: 10, max: 60, step: 5, graduated: true, marks, vertical };
      const { container } = render(
        <div dir={direction} style={{ width: 260, height: 260 }}>
          {name === 'Slider' ? (
            <Slider {...props} defaultValue={40} />
          ) : (
            <RangeSlider {...props} defaultValue={[20, 55]} />
          )}
        </div>
      );

      const bar = container.querySelector('.rs-slider-bar')!;
      const bounds = bar.getBoundingClientRect();
      const size = vertical ? bounds.height : bounds.width;
      expect(size).toBeGreaterThan(200);
      const ticks = [...bar.querySelectorAll('.rs-slider-tick')];
      expect(ticks.map(tick => tick.textContent)).toEqual(marks.map(mark => mark.label));
      ticks.forEach((tick, index) => {
        const box = tick.getBoundingClientRect();
        const offset = vertical
          ? bounds.bottom - box.bottom
          : direction === 'rtl'
            ? bounds.right - box.right
            : box.left - bounds.left;
        expect(offset).toBeCloseTo((size * (marks[index].value - 10)) / 50, 0);
      });
    }
  );
});
