import React, { useEffect, useState } from 'react';
import ColorPicker from '..';

export interface ColorPickerHydrationProps {
  controlled: boolean;
  initiallyOpen: boolean;
  mobile: boolean;
  onReady?: () => void;
}

export default function ColorPickerHydrationFixture({
  controlled,
  initiallyOpen,
  mobile,
  onReady
}: ColorPickerHydrationProps) {
  const [value, setValue] = useState<string | null>('#11223380');
  const [changes, setChanges] = useState(0);
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <form>
      <label>
        Draft
        <input defaultValue="Server draft" />
      </label>
      <ColorPicker
        label="Brand"
        name="brand"
        value={controlled ? value : undefined}
        defaultValue="#11223380"
        defaultOpen={initiallyOpen}
        responsive={mobile}
        presets={[{ value: '#00ff00', label: 'Success' }]}
        onChange={next => {
          setValue(next);
          setChanges(count => count + 1);
        }}
      />
      <output data-testid="changes">{changes}</output>
    </form>
  );
}
