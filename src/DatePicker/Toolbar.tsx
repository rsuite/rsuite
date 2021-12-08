import React, { ReactNode, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { useClassNames, useUpdateEffect } from '../utils';
import { StandardProps } from '../@types/common';
import { getDefaultRanges, getRanges } from './utils';
import { InnerRange, RangeType } from './types';
import { CalendarLocale } from '../locales';

export type { RangeType } from './types';

export interface ToolbarProps<T = any, Shortcut = T> extends StandardProps {
  hideOkBtn?: boolean;
  locale?: CalendarLocale;
  calendarDate: T;
  ranges?: RangeType<Shortcut>[];
  disabledOkBtn?: (value: T) => boolean;
  disabledShortcut?: (value: T) => boolean;
  onOk?: (event: React.MouseEvent) => void;
  onClickShortcut?: (value: Shortcut, closeOverlay: boolean, event: React.MouseEvent) => void;
}

type ToolbarComponent = React.ForwardRefExoticComponent<ToolbarProps> & {
  <T = any, Shortcut = T>(props: ToolbarProps<T, Shortcut>): React.ReactElement | null;
};

/**
 * Toolbar for DatePicker and DateRangePicker
 */
const Toolbar: ToolbarComponent = React.forwardRef<HTMLDivElement, ToolbarProps>((props, ref) => {
  const {
    className,
    classPrefix = 'picker-toolbar',
    disabledOkBtn,
    disabledShortcut,
    hideOkBtn,
    onOk,
    onClickShortcut,
    calendarDate,
    ranges: rangesProp,
    locale,
    ...rest
  } = props;
  const [ranges, setRanges] = useState<InnerRange<any>[]>(getRanges(props));
  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);

  useUpdateEffect(() => {
    setRanges(getRanges({ ranges: rangesProp, calendarDate }));
  }, [calendarDate, rangesProp]);

  const hasLocaleKey = useCallback(
    (key: ReactNode) => getDefaultRanges(calendarDate).some(item => item.label === key),
    [calendarDate]
  );

  const renderOkButton = useCallback(() => {
    if (hideOkBtn) {
      return null;
    }

    const disabled = disabledOkBtn?.(calendarDate);

    return (
      <div className={prefix('right')}>
        <Button
          appearance="primary"
          size="sm"
          disabled={disabled}
          onClick={disabled ? undefined : onOk}
        >
          {locale?.ok}
        </Button>
      </div>
    );
  }, [disabledOkBtn, hideOkBtn, locale, onOk, calendarDate, prefix]);

  if (hideOkBtn && ranges.length === 0) {
    return null;
  }

  const classes = merge(className, withClassPrefix());
  return (
    <div {...rest} ref={ref} className={classes}>
      <div className={prefix('ranges')}>
        {ranges.map(({ value, closeOverlay, label }, index: number) => {
          const disabled = disabledShortcut?.(value);

          const handleClickShortcut = (event: React.MouseEvent) => {
            if (disabled) {
              return;
            }
            onClickShortcut?.(value, closeOverlay ?? false, event);
          };

          return (
            <Button
              appearance="link"
              size="sm"
              key={index}
              disabled={disabled}
              onClick={handleClickShortcut}
            >
              {hasLocaleKey(label) && typeof label === 'string' ? locale?.[label] : label}
            </Button>
          );
        })}
      </div>
      {renderOkButton()}
    </div>
  );
});

Toolbar.displayName = 'Toolbar';
Toolbar.propTypes = {
  ranges: PropTypes.array,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  calendarDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date))
  ]).isRequired,
  onClickShortcut: PropTypes.func,
  onOk: PropTypes.func,
  disabledShortcut: PropTypes.func,
  disabledOkBtn: PropTypes.func,
  hideOkBtn: PropTypes.bool
};

export default Toolbar;
