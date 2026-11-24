import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ColorArea from '../ColorArea';

describe('ColorArea pointer ownership', () => {
  it.each(['pointercancel', 'lostpointercapture'])(
    'ignores %s from another pointer and stops when its own pointer ends',
    type => {
      const onChange = vi.fn();
      const { container } = render(
        <ColorArea color={{ h: 0, s: 100, v: 100, a: 1 }} onChange={onChange} />
      );
      const area = container.firstElementChild as HTMLElement;
      vi.spyOn(area, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 100));
      vi.spyOn(area, 'setPointerCapture').mockImplementation(() => {});
      vi.spyOn(area, 'releasePointerCapture').mockImplementation(() => {});
      const pointer = (name: string, id: number, x = 25) =>
        fireEvent(
          area,
          new PointerEvent(name, {
            bubbles: true,
            pointerId: id,
            button: 0,
            isPrimary: id === 1,
            clientX: x,
            clientY: 50
          })
        );

      pointer('pointerdown', 1);
      expect(onChange).toHaveBeenCalledTimes(1);
      pointer(type, 2);
      pointer('pointermove', 1, 75);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][0]).toEqual({ h: 0, s: 75, v: 50, a: 1 });
      pointer(type, 1);
      pointer('pointermove', 1, 90);
      expect(onChange).toHaveBeenCalledTimes(2);
    }
  );
});
