import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getUnhandledProps, prefix, useCustom } from '../utils';
import FormattedDate from '../IntlProvider/FormattedDate';
import { CalendarLocaleTypes } from './types';

export interface HeaderProps {
  date: Date;
  showMonth?: boolean;
  showDate?: boolean;
  showTime?: boolean;
  format?: string;
  classPrefix?: string;
  className?: string;
  disabledBackward?: boolean;
  disabledForward?: boolean;
  showMeridian?: boolean;
  onMoveForward?: () => void;
  onMoveBackward?: () => void;
  onToggleMonthDropdown?: (event: React.MouseEvent) => void;
  onToggleTimeDropdown?: (event: React.MouseEvent) => void;
  onToggleMeridian?: (event: React.MouseEvent) => void;
  disabledDate?: (date: Date) => boolean;
  disabledTime?: (date: Date) => boolean;
  renderTitle?: (date: Date) => React.ReactNode;
  renderToolbar?: (date: Date) => React.ReactNode;
}

const defaultProps = {
  date: new Date(),
  classPrefix: 'calendar-header'
};

const Header = React.forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const {
    date,
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
    disabledDate,
    disabledTime,
    disabledBackward,
    disabledForward,
    renderToolbar,
    showMeridian,
    format,
    ...rest
  } = props;
  const { locale } = useCustom<CalendarLocaleTypes>('Calendar');
  const { formattedDayPattern, formattedMonthPattern } = locale;

  const getTimeFormat = () => {
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
  };

  const getDateFormat = () => {
    if (showDate) {
      return formattedDayPattern || 'yyyy-MM-dd';
    } else if (showMonth) {
      return formattedMonthPattern || 'yyyy-MM';
    }

    return 'yyyy';
  };

  const addPrefix = (name: string) => prefix(classPrefix)(name);

  const renderTitle = () => {
    return (
      props.renderTitle?.(date) ??
      (date && <FormattedDate date={date} formatStr={getDateFormat()} />)
    );
  };

  const dateTitleClasses = classNames(addPrefix('title'), addPrefix('title-date'), {
    [addPrefix('error')]: disabledDate?.(date)
  });

  const timeTitleClasses = classNames(addPrefix('title'), addPrefix('title-time'), {
    [addPrefix('error')]: disabledTime?.(date)
  });

  const backwardClass = classNames(addPrefix('backward'), {
    [addPrefix('btn-disabled')]: disabledBackward
  });

  const forwardClass = classNames(addPrefix('forward'), {
    [addPrefix('btn-disabled')]: disabledForward
  });

  const monthToolbar = (
    <div className={addPrefix('month-toolbar')}>
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
  const classes = classNames(classPrefix, className, {
    [addPrefix('has-month')]: hasMonth,
    [addPrefix('has-time')]: showTime
  });
  const unhandled = getUnhandledProps(Header, rest);

  return (
    <div {...unhandled} ref={ref} className={classes}>
      {hasMonth && monthToolbar}
      {showTime && (
        <div className={addPrefix('time-toolbar')}>
          <span
            role="button"
            tabIndex={-1}
            className={timeTitleClasses}
            onClick={onToggleTimeDropdown}
          >
            {date && <FormattedDate date={date} formatStr={getTimeFormat()} />}
          </span>

          {showMeridian ? (
            <span
              role="button"
              tabIndex={-1}
              className={addPrefix('meridian')}
              onClick={onToggleMeridian}
            >
              {date && <FormattedDate date={date} formatStr="a" />}
            </span>
          ) : null}
        </div>
      )}

      {renderToolbar?.(date)}
    </div>
  );
});

Header.propTypes = {
  date: PropTypes.instanceOf(Date),
  onMoveForward: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  onToggleMeridian: PropTypes.func,
  showMonth: PropTypes.bool,
  showDate: PropTypes.bool,
  showTime: PropTypes.bool,
  format: PropTypes.string,
  disabledDate: PropTypes.func,
  disabledTime: PropTypes.func,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  disabledBackward: PropTypes.bool,
  disabledForward: PropTypes.bool,
  showMeridian: PropTypes.bool,
  renderTitle: PropTypes.func,
  renderToolbar: PropTypes.func
};
Header.defaultProps = defaultProps;

export default Header;
