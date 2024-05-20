import { useState } from 'react';
import { useEventCallback } from '@/internals/hooks';

interface UseMonthViewProps {
  onToggleMonthDropdown?: (toggle: boolean) => void;
}

function useMonthView(props: UseMonthViewProps) {
  const { onToggleMonthDropdown } = props;
  const [monthView, setMonthView] = useState(false);

  /**
   * The callback triggered after the month selection box is opened or closed.
   */
  const toggleMonthView = useEventCallback((show: boolean) => {
    onToggleMonthDropdown?.(show);
    setMonthView(show);
  });

  return {
    monthView,
    setMonthView,
    toggleMonthView
  };
}

export default useMonthView;
