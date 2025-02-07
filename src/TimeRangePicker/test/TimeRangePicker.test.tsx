import React from 'react';
import TimeRangePicker from '../TimeRangePicker';
import type { PickerHandle } from '@/internals/Picker';

// Check ref type
const ref = React.useRef<PickerHandle>(null);
<TimeRangePicker ref={ref} />;
ref.current?.open?.();
