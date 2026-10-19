import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import PinInput from '../PinInput';

import '../styles/index.scss';

describe('PinInput styles', () => {
  for (const dir of ['ltr', 'rtl'] as const) {
    for (const attached of [false, true]) {
      it.each([
        ['xs', 24],
        ['sm', 30],
        ['md', 36],
        ['lg', 42]
      ] as const)(
        `lays out %s segments in ${dir} (${attached ? 'attached' : 'separated'})`,
        (size, width) => {
          const { container } = render(
            <PinInput dir={dir} attached={attached} size={size} defaultValue="1234" />
          );
          const segments = Array.from(
            container.querySelectorAll<HTMLInputElement>('input:not([type="hidden"])')
          );
          const bounds = segments.map(segment => segment.getBoundingClientRect());

          expect(bounds).toHaveLength(4);
          for (const bound of bounds) {
            expect(bound.width).toBeCloseTo(width, 1);
            expect(bound.top).toBeCloseTo(bounds[0].top, 1);
          }
          for (let index = 1; index < bounds.length; index++) {
            const previous = bounds[index - 1];
            const current = bounds[index];
            const distance =
              dir === 'ltr' ? current.left - previous.right : previous.left - current.right;

            if (attached) {
              expect(distance).toBeGreaterThanOrEqual(-1.5);
              expect(distance).toBeLessThanOrEqual(0.5);
            } else {
              expect(distance).toBeCloseTo(8, 1);
            }
          }
        }
      );
    }
  }
});
