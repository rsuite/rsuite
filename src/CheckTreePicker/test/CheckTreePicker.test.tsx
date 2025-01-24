import React from 'react';
import CheckTreePicker from '../CheckTreePicker';
import type { PickerHandle } from '@/internals/Picker';

<CheckTreePicker caretAs={() => <div />} data={[]} />;

// Check ref type
const ref = React.useRef<PickerHandle>();
<CheckTreePicker data={[]} ref={ref} />;
ref.current?.open?.();
