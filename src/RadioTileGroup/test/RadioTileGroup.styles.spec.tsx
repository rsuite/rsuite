import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import RadioTileGroup from '../RadioTileGroup';
import RadioTile from '../../RadioTile';

import '../styles/index.scss';
import '../../RadioTile/styles/index.scss';

describe('RadioTileGroup standalone styles', () => {
  for (const dir of ['ltr', 'rtl'] as const) {
    for (const inline of [false, true]) {
      it.each([10, 18])(`lays out tiles with %spx spacing in ${dir}, inline=${inline}`, spacing => {
        const { container } = render(
          <RadioTileGroup
            dir={dir}
            inline={inline}
            defaultValue="a"
            w={350}
            {...(spacing === 10 ? {} : { spacing })}
          >
            {['a', 'b', 'c'].map(value => (
              <RadioTile key={value} value={value} label={`Option ${value}`} w={80} h={60} />
            ))}
          </RadioTileGroup>
        );
        const tiles = Array.from(container.querySelectorAll('.rs-radio-tile'));
        const bounds = tiles.map(tile => tile.getBoundingClientRect());

        expect(bounds).toHaveLength(3);
        for (let index = 1; index < bounds.length; index++) {
          const previous = bounds[index - 1];
          const current = bounds[index];

          if (inline) {
            expect(current.top).toBeCloseTo(previous.top, 1);
            const gap =
              dir === 'ltr' ? current.left - previous.right : previous.left - current.right;
            expect(gap).toBeCloseTo(spacing, 1);
          } else {
            expect(current.left).toBeCloseTo(previous.left, 1);
            expect(current.top - previous.bottom).toBeCloseTo(spacing, 1);
          }
        }
      });
    }
  }
});

describe('RadioTileGroup custom roots', () => {
  for (const as of ['div', 'section'] as const) {
    for (const dir of ['ltr', 'rtl'] as const) {
      for (const inline of [false, true]) {
        it.each([10, 18])(
          `preserves ${as} layout with %spx spacing in ${dir}, inline=${inline}`,
          spacing => {
            const { container } = render(
              <RadioTileGroup
                as={as}
                dir={dir}
                inline={inline}
                defaultValue="a"
                w={350}
                {...(spacing === 10 ? {} : { spacing })}
              >
                {['a', 'b', 'c'].map(value => (
                  <RadioTile key={value} value={value} label={`Option ${value}`} />
                ))}
              </RadioTileGroup>
            );
            const bounds = Array.from(container.querySelectorAll('.rs-radio-tile')).map(tile =>
              tile.getBoundingClientRect()
            );

            expect(bounds).toHaveLength(3);
            for (let index = 1; index < bounds.length; index++) {
              const previous = bounds[index - 1];
              const current = bounds[index];
              expect(current.width).toBeGreaterThan(0);
              expect(current.height).toBeGreaterThan(0);

              if (inline) {
                expect(current.top).toBeCloseTo(previous.top, 1);
                const gap =
                  dir === 'ltr' ? current.left - previous.right : previous.left - current.right;
                expect(gap).toBeCloseTo(spacing, 1);
              } else {
                expect(current.width).toBeCloseTo(350, 1);
                expect(current.left).toBeCloseTo(previous.left, 1);
                expect(current.top - previous.bottom).toBeCloseTo(spacing, 1);
              }
            }
          }
        );
      }
    }
  }
});
