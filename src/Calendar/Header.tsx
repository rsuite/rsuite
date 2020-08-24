import * as React from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import FormattedDate from '../IntlProvider/FormattedDate';
import { useCalendarContext } from './CalendarContext';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';

export interface HeaderProps extends WithAsProps {
  disabledBackward?: boolean;
  disabledForward?: boolean;
  disabledTime?: (date: Date) => boolean;
  onMoveBackward?: () => void;
  onMoveForward?: () => void;
  onToggleMeridian?: (event: React.MouseEvent) => void;
  onToggleMonthDropdown?: (event: React.MouseEvent) => void;
  onToggleTimeDropdown?: (event: React.MouseEvent) => void;
  renderTitle?: (date: Date) => React.ReactNode;
  renderToolbar?: (date: Date) => React.ReactNode;
  showDate?: boolean;
  showMeridian?: boolean;
  showMonth?: boolean;
  showTime?: boolean;
}

const defaultProps: Partial<HeaderProps> = {
  classPrefix: 'calendar-header',
  as: 'div'
};

const Header: RsRefForwardingComponent<'div', HeaderProps> = React.forwardRef(
  (props: HeaderProps, ref) => {
    const {
      as: Component,
      onMoveForward,
      onMoveBackward,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      onToggleMeridian,
      showTime,
      showDate,
      showMonth,
      classPrefix,
      className,
      disabledTime,
      disabledBackward,
      disabledForward,
      renderToolbar,
      renderTitle: propsRenderTitle,
      showMeridian,
      ...rest
    } = props;
    const { locale, date = new Date(), format, disabledDate } = useCalendarContext();
    const { prefix, withClassPrefix, merge } = useClassNames(classPrefix);

    const getTimeFormat = useCallback(() => {
      const timeFormat = [];

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
      if (showDate) {
        return locale?.formattedDayPattern || 'yyyy-MM-dd';
      } else if (showMonth) {
        return locale?.formattedMonthPattern || 'yyyy-MM';
      }

      return 'yyyy';
    }, [locale?.formattedDayPattern, locale?.formattedMonthPattern, showDate, showMonth]);

    const renderTitle = useCallback(
      () =>
        propsRenderTitle?.(date) ??
        (date && <FormattedDate date={date} formatStr={getDateFormat()} />),
      [date, getDateFormat, propsRenderTitle]
    );

    const dateTitleClasses = merge(prefix('title'), prefix('title-date'), {
      [prefix('error')]: disabledDate?.(date)
    });

    const timeTitleClasses = merge(prefix('title'), prefix('title-time'), {
      [prefix('error')]: disabledTime?.(date)
    });

    const backwardClass = merge(prefix('backward'), {
      [prefix('btn-disabled')]: disabledBackward
    });

    const forwardClass = merge(prefix('forward'), {
      [prefix('btn-disabled')]: disabledForward
    });

    const monthToolbar = (
      <div className={prefix('month-toolbar')}>
        <i
          className={backwardClass}
          role="button"
          tabIndex={-1}
          onClick={disabledBackward ? undefined : onMoveBackward}
        />
        <span
          role="button"
          tabIndex={-1}
          className={dateTitleClasses}
          onClick={onToggleMonthDropdown}
        >
          {renderTitle()}
        </span>
        <i
          className={forwardClass}
          role="button"
          tabIndex={-1}
          onClick={disabledForward ? undefined : onMoveForward}
        />
      </div>
    );

    const hasMonth = showDate || showMonth;
    const classes = merge(
      className,
      withClassPrefix({
        'has-month': hasMonth,
        'has-time': showTime
      })
    );

    return (
      <Component {...rest} ref={ref} role="row" className={classes}>
        {hasMonth && monthToolbar}
        {showTime && (
          <div className={prefix('time-toolbar')}>
            <span
              role="button"
              tabIndex={-1}
              className={timeTitleClasses}
              onClick={onToggleTimeDropdown}
            >
              {date && <FormattedDate date={date} formatStr={getTimeFormat()} />}
            </span>

            {showMeridian && (
              <span
                role="button"
                tabIndex={-1}
                className={prefix('meridian')}
                onClick={onToggleMeridian}
              >
                {date && <FormattedDate date={date} formatStr="a" />}
              </span>
            )}
          </div>
        )}

        {renderToolbar?.(date)}
      </Component>
    );
  }
);

Header.displayName = 'Header';
Header.propTypes = {
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
Header.defaultProps = defaultProps;

export default Header;
