import React from 'react';
import TimePicker from '../TimePicker';
import type { PickerHandle } from '@/internals/Picker';

// Check ref type
const ref = React.useRef<PickerHandle>();
<TimePicker ref={ref} />;
ref.current?.open?.();
