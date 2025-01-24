import React from 'react';
import InputPicker from '../InputPicker';
import type { PickerHandle } from '@/internals/Picker';

<InputPicker caretAs={() => <div />} data={[]} />;

// Check ref type
const ref = React.useRef<PickerHandle>();
<InputPicker data={[]} ref={ref} />;
ref.current?.open?.();
