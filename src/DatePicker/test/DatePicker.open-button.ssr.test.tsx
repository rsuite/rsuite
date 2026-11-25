import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import DatePicker from '../../DatePicker';
import DateRangePicker from '../../DateRangePicker';
import TimePicker from '../../TimePicker';
import TimeRangePicker from '../../TimeRangePicker';

describe('Date picker opening SSR', () => {
  it.each([DatePicker, DateRangePicker, TimePicker, TimeRangePicker])(
    '%s renders the opening control without invoking callbacks',
    Component => {
      const onOpen = vi.fn();
      const onClose = vi.fn();
      const html = renderToString(
        <Component openOnInputClick={false} onOpen={onOpen} onClose={onClose} />
      );
      expect(html).toContain('type="button"');
      expect(html).toContain('aria-label="Open picker"');
      expect(html).toContain('aria-haspopup="dialog"');
      expect(html).toContain('aria-expanded="false"');
      expect(html).not.toContain('aria-controls');
      expect(html).not.toContain('openOnInputClick');
      expect(onOpen).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
    }
  );
});
