import getPosition from 'dom-lib/getPosition';
import scrollTop from 'dom-lib/scrollTop';
import type { ClockTime } from './getClockTime';

export function scrollToTime(time: ClockTime, row: HTMLDivElement | null) {
  if (!row) return;

  const scrollToPosition = (container: HTMLElement, value: number, type: string) => {
    const node = container.querySelector(`[data-key="${type}-${value}"]`);
    if (node) {
      const position = getPosition(node as HTMLElement, container);
      if (position) {
        scrollTop(container, position.top);
      }
    }
  };

  Object.entries(time).forEach(([type, value]: [string, number]) => {
    const container = row.querySelector(`[data-type="${type}"]`) as HTMLElement;
    if (container) {
      scrollToPosition(container, value, type);
    }
  });
}
