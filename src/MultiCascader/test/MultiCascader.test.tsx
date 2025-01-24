import React from 'react';
import MultiCascader from '../MultiCascader';
import type { PickerHandle } from '@/internals/Picker';

// Check ref type
const ref = React.useRef<PickerHandle>();
<MultiCascader data={[]} ref={ref} />;
ref.current?.open?.();
