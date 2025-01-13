import React from 'react';
import DateRangePicker from '../DateRangePicker';
import type { PickerHandle } from '@/internals/Picker';

<DateRangePicker shouldDisableDate={DateRangePicker.afterToday()} />;
<DateRangePicker shouldDisableDate={DateRangePicker.beforeToday()} />;
<DateRangePicker shouldDisableDate={DateRangePicker.allowedMaxDays(3)} />;
<DateRangePicker shouldDisableDate={DateRangePicker.allowedDays(3)} />;
<DateRangePicker
  shouldDisableDate={DateRangePicker.allowedRange(new Date('2023-10-01'), new Date('2023-10-02'))}
/>;
<DateRangePicker shouldDisableDate={DateRangePicker.before(new Date('2023-10-01'))} />;
<DateRangePicker shouldDisableDate={DateRangePicker.after(new Date('2023-10-01'))} />;
<DateRangePicker
  shouldDisableDate={DateRangePicker.combine(
    DateRangePicker.afterToday(),
    DateRangePicker.allowedDays(3)
  )}
/>;

// Check ref type
const ref = React.useRef<PickerHandle>();
<DateRangePicker ref={ref} />;
ref.current?.open?.();
