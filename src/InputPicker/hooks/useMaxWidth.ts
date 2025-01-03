import React, { useState, useEffect } from 'react';
import getWidth from 'dom-lib/getWidth';
import type { OverlayTriggerHandle } from '@/internals/Picker/PickerToggleTrigger';

function useMaxWidth(triggerRef: React.RefObject<OverlayTriggerHandle>) {
  const [maxWidth, setMaxWidth] = useState(100);

  useEffect(() => {
    // In multiple selection, you need to set a maximum width for the input.
    if (triggerRef.current?.root) {
      setMaxWidth(getWidth(triggerRef.current?.root));
    }
  }, []);

  return maxWidth;
}

export default useMaxWidth;
