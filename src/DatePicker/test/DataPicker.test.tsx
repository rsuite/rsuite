import React from 'react';
import DatePicker from '../DatePicker';
import type { PickerHandle } from '@/internals/Picker';

// Check ref type
const ref = React.useRef<PickerHandle>();
<DatePicker ref={ref} />;
ref.current?.open?.();
