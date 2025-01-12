import React, { useMemo } from 'react';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageNextIcon from '@rsuite/icons/PageNext';
import IconButton from '../IconButton';
import Button, { ButtonProps } from '../Button';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { extractTimeFormat } from '@/internals/utils/date';
import { FormattedDate } from '../CustomProvider';
import { WithAsProps } from '@/internals/types';
import { useCalendar } from './hooks';
import { useDateRangePicker } from '../DateRangePicker/hooks';

export interface CalendarHeaderProps {
  disabledBackward?: boolean;
  disabledForward?: boolean;
  renderTitle?: (date: Date) => React.ReactNode;
  renderToolbar?: (date: Date) => React.ReactNode;
}

interface CalendarHeaderPrivateProps extends CalendarHeaderProps, WithAsProps {
  showDate?: boolean;
  showMonth?: boolean;
  showTime?: boolean;
  disabledTime?: (date: Date) => boolean;
  onMoveBackward?: () => void;
  onMoveForward?: () => void;
  onToggleMonthDropdown?: (event: React.MouseEvent) => void;
  onToggleTimeDropdown?: (event: React.MouseEvent) => void;
}

const CalendarHeader = forwardRef<'div', CalendarHeaderPrivateProps>((props, ref) => {
  const {
    as: Component = 'div',
    className,
    classPrefix = 'calendar-header',
    disabledBackward,
    disabledForward,
    showDate,
    showMonth,
    showTime,
    disabledTime,
    onMoveBackward,
    onMoveForward,
    onToggleMonthDropdown,
    onToggleTimeDropdown,
    renderTitle: renderTitleProp,
    renderToolbar,
    ...rest
  } = props;

  const { locale, date = new Date(), format, inline, disabledDate, targetId } = useCalendar();
  const { isSelectedIdle } = useDateRangePicker();
  const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);
  const btnProps: ButtonProps = {
    appearance: 'subtle',
    size: inline ? 'sm' : 'xs'
  };

  const timeFormat = useMemo(() => {
    const defaultTimeFormat = locale?.shortTimeFormat || 'HH:mm';
    if (!format) {
      return defaultTimeFormat;
    }
    return extractTimeFormat(format) || defaultTimeFormat;
  }, [format, locale]);

  const dateFormat = useMemo(() => {
    if (showMonth) {
      return locale?.formattedMonthPattern || 'yyyy-MM';
    }

    return 'yyyy';
  }, [locale, showMonth]);

  const renderTitle = () => {
    return (
      renderTitleProp?.(date) ?? (date && <FormattedDate date={date} formatStr={dateFormat} />)
    );
  };

  const dateTitleClasses = prefix('title', 'title-date', { error: disabledDate?.(date) });
  const timeTitleClasses = prefix('title', 'title-time', { error: disabledTime?.(date) });
  const backwardClass = prefix('backward', { 'btn-disabled': disabledBackward });
  const forwardClass = prefix('forward', { 'btn-disabled': disabledForward });

  const monthToolbar = (
    <div className={prefix('month-toolbar')}>
      <IconButton
        {...btnProps}
        // TODO: aria-label should be translated by i18n
        aria-label="Previous month"
        className={backwardClass}
        onClick={disabledBackward ? undefined : onMoveBackward}
        icon={<PagePreviousIcon />}
      />
      <Button
        {...btnProps}
        aria-label="Select month"
        id={targetId ? `${targetId}-grid-label` : undefined}
        className={dateTitleClasses}
        onClick={onToggleMonthDropdown}
      >
        {renderTitle()}
      </Button>
      <IconButton
        {...btnProps}
        aria-label="Next month"
        className={forwardClass}
        onClick={disabledForward ? undefined : onMoveForward}
        icon={<PageNextIcon />}
      />
    </div>
  );

  const hasMonth = showDate || showMonth;
  const classes = merge(
    className,
    withClassPrefix({ 'has-month': hasMonth, 'has-time': showTime })
  );

  // If the date is not selected, the time cannot be selected (it only works in DateRangePicker).
  const disableSelectTime = typeof isSelectedIdle === 'undefined' ? false : !isSelectedIdle;

  return (
    <Component {...rest} ref={ref} className={classes}>
      {hasMonth && monthToolbar}
      {showTime && (
        <div className={prefix('time-toolbar')}>
          <Button
            {...btnProps}
            aria-label="Select time"
            className={timeTitleClasses}
            onClick={onToggleTimeDropdown}
            disabled={disableSelectTime}
          >
            {date && <FormattedDate date={date} formatStr={timeFormat} />}
          </Button>
        </div>
      )}

      {renderToolbar?.(date)}
    </Component>
  );
});

CalendarHeader.displayName = 'CalendarHeader';

export default CalendarHeader;
