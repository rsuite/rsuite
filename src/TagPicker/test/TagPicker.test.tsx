import React from 'react';
import TagPicker from '../TagPicker';
import type { PickerHandle } from '@/internals/Picker';

// Check ref type
const ref = React.useRef<PickerHandle>();
<TagPicker data={[]} ref={ref} />;
ref.current?.open?.();
