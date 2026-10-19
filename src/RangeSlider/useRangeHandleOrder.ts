import { useState } from 'react';
import { useEventCallback } from '@/internals/hooks';
import type { Range } from './RangeSlider';

type Index = 0 | 1;
type HandleOrder = [Index, Index];
interface HandleState {
  value: Range;
  order: HandleOrder;
  pending: { handleIndex: number; peerValue: number } | null;
}

/** Keep physical thumbs attached to the value changes that the owner commits. */
export default function useRangeHandleOrder(value: Range) {
  const [state, setState] = useState<HandleState>(() => ({
    value: [...value],
    order: [0, 1],
    pending: null
  }));
  const changed = value[0] !== state.value[0] || value[1] !== state.value[1];
  let handleOrder = state.order;

  if (changed) {
    if (state.pending) {
      const { handleIndex, peerValue } = state.pending;
      // The unchanged peer identifies the moving thumb even if the owner normalizes its value.
      const peerIndex =
        value[0] === peerValue && value[1] !== peerValue
          ? 0
          : value[1] === peerValue && value[0] !== peerValue
            ? 1
            : undefined;
      if (peerIndex !== undefined) {
        const activeIndex = peerIndex === 0 ? 1 : 0;
        handleOrder = handleIndex === 0 ? [activeIndex, peerIndex] : [peerIndex, activeIndex];
      }
    }
    // Adjust with the rendered value, including while Activity has disconnected Effects.
    setState({ value: [...value], order: handleOrder, pending: null });
  }

  const prepareChange = useEventCallback((nextValue: Range, valueIndex?: Index) => {
    const unchanged = nextValue[0] === value[0] && nextValue[1] === value[1];
    const pending =
      valueIndex === undefined || unchanged
        ? null
        : {
            handleIndex: handleOrder.indexOf(valueIndex),
            peerValue: value[valueIndex === 0 ? 1 : 0]
          };
    setState(previous => {
      if (
        previous.pending?.handleIndex === pending?.handleIndex &&
        previous.pending?.peerValue === pending?.peerValue
      )
        return previous;
      return { ...previous, pending };
    });
  });

  return { handleOrder, prepareChange };
}
