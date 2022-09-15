import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import IconButton from '../IconButton';
import Button, { ButtonProps } from '../Button';
import { useClassNames } from '../utils';
import { FormattedDate } from '../CustomProvider';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { useCalendarContext } from './CalendarContext';

export interface CalendarHeaderProps {
  disabledBackward?: boolean;
  disabledForward?: boolean;
  showMeridian?: boolean;
  onToggleMeridian?: (event: React.MouseEvent) => void;
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

const CalendarHeader: RsRefForwardingComponent<'div', CalendarHeaderPrivateProps> =
  React.forwardRef((props, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'calendar-header',
      disabledBackward,
      disabledForward,
      showDate,
      showMeridian,
      showMonth,
      showTime,
      disabledTime,
      onMoveBackward,
      onMoveForward,
      onToggleMeridian,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      renderTitle: renderTitleProp,
      renderToolbar,
      ...rest
    } = props;

    const { locale, date = new Date(), format, inline, disabledDate } = useCalendarContext();
    const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);
    const btnProps: ButtonProps = {
      appearance: 'subtle',
      size: inline ? 'sm' : 'xs'
    };

    const getTimeFormat = useCallback(() => {
      const timeFormat: string[] = [];

      if (!format) {
        return '';
      }

      if (/([Hh])/.test(format)) {
        timeFormat.push(showMeridian ? 'hh' : 'HH');
      }
      if (/m/.test(format)) {
        timeFormat.push('mm');
      }
      if (/s/.test(format)) {
        timeFormat.push('ss');
      }

      return timeFormat.join(':');
    }, [format, showMeridian]);

    const getDateFormat = useCallback(() => {
      if (showMonth) {
        return locale?.formattedMonthPattern || 'yyyy-MM';
      }

      return 'yyyy';
    }, [locale, showMonth]);

    const renderTitle = useCallback(
      () =>
        renderTitleProp?.(date) ??
        (date && <FormattedDate date={date} formatStr={getDateFormat()} />),
      [date, getDateFormat, renderTitleProp]
    );

    const dateTitleClasses = prefix('title', 'title-date', { error: disabledDate?.(date) });
    const timeTitleClasses = prefix('title', 'title-time', { error: disabledTime?.(date) });
    const backwardClass = prefix('backward', { 'btn-disabled': disabledBackward });
    const forwardClass = prefix('forward', { 'btn-disabled': disabledForward });

    const monthToolbar = (
      <div className={prefix('month-toolbar')}>
        <IconButton
          {...btnProps}
          className={backwardClass}
          onClick={disabledBackward ? undefined : onMoveBackward}
          icon={<AngleLeftIcon />}
        />
        <Button {...btnProps} className={dateTitleClasses} onClick={onToggleMonthDropdown}>
          {renderTitle()}
        </Button>
        <IconButton
          {...btnProps}
          className={forwardClass}
          onClick={disabledForward ? undefined : onMoveForward}
          icon={<AngleRightIcon />}
        />
      </div>
    );

    const hasMonth = showDate || showMonth;
    const classes = merge(
      className,
      withClassPrefix({ 'has-month': hasMonth, 'has-time': showTime })
    );

    return (
      <Component {...rest} ref={ref} className={classes}>
        {hasMonth && monthToolbar}
        {showTime && (
          <div className={prefix('time-toolbar')}>
            <Button {...btnProps} className={timeTitleClasses} onClick={onToggleTimeDropdown}>
              {date && <FormattedDate date={date} formatStr={getTimeFormat()} />}
            </Button>

            {showMeridian && (
              <Button {...btnProps} className={prefix('meridian')} onClick={onToggleMeridian}>
                {date && <FormattedDate date={date} formatStr="a" />}
              </Button>
            )}
          </div>
        )}

        {renderToolbar?.(date)}
      </Component>
    );
  });

CalendarHeader.displayName = 'CalendarHeader';
CalendarHeader.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  disabledBackward: PropTypes.bool,
  disabledForward: PropTypes.bool,
  disabledTime: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onMoveForward: PropTypes.func,
  onToggleMeridian: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  renderTitle: PropTypes.func,
  renderToolbar: PropTypes.func,
  showDate: PropTypes.bool,
  showMeridian: PropTypes.bool,
  showMonth: PropTypes.bool,
  showTime: PropTypes.bool
};

export default CalendarHeader;
