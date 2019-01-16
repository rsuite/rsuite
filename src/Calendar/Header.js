// @flow

import * as React from 'react';
import classNames from 'classnames';
import { prefix, getUnhandledProps, defaultProps } from '../utils';
import { format } from 'date-fns';

type Props = {
  date: Date,
  onMoveForword?: () => void,
  onMoveBackward?: () => void,
  onToggleMonthDropdown?: (event: SyntheticEvent<*>) => void,
  onToggleTimeDropdown?: (event: SyntheticEvent<*>) => void,
  showMonth?: boolean,
  showDate?: boolean,
  showTime?: boolean,
  format?: string,
  disabledDate?: (date: Date) => boolean,
  disabledTime?: (date: Date) => boolean,
  classPrefix?: string,
  className?: string,
  disabledBackward?: boolean,
  disabledForword?: boolean
};

class Header extends React.PureComponent<Props> {
  static defaultProps = {
    date: new Date()
  };
  getTimeFormat() {
    const { format } = this.props;
    const timeFormat = [];

    if (!format) {
      return '';
    }

    if (/(H|h)/.test(format)) {
      timeFormat.push('HH');
    }
    if (/m/.test(format)) {
      timeFormat.push('mm');
    }
    if (/s/.test(format)) {
      timeFormat.push('ss');
    }

    return timeFormat.join(':');
  }

  getDateFormat() {
    const { showDate, showMonth } = this.props;

    if (showDate) {
      return 'YYYY-MM-DD';
    } else if (showMonth) {
      return 'YYYY-MM';
    }

    return 'YYYY';
  }
  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);
  render() {
    const {
      date,
      onMoveForword,
      onMoveBackward,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      showTime,
      showDate,
      showMonth,
      classPrefix,
      className,
      disabledDate,
      disabledTime,
      disabledBackward,
      disabledForword,
      ...rest
    } = this.props;

    const dateTitleClasses = classNames(this.addPrefix('title'), this.addPrefix('title-date'), {
      [this.addPrefix('error')]: disabledDate && disabledDate(date)
    });

    const timeTitleClasses = classNames(this.addPrefix('title'), this.addPrefix('title-time'), {
      [this.addPrefix('error')]: disabledTime && disabledTime(date)
    });

    const backwardClass = classNames(this.addPrefix('backward'), {
      [this.addPrefix('btn-disabled')]: disabledBackward
    });

    const forwardClass = classNames(this.addPrefix('forward'), {
      [this.addPrefix('btn-disabled')]: disabledForword
    });

    const monthToolbar = (
      <div className={this.addPrefix('month-toolbar')}>
        <i
          className={backwardClass}
          role="button"
          tabIndex="-1"
          onClick={disabledBackward ? undefined : onMoveBackward}
        />
        <span
          role="button"
          tabIndex="-1"
          className={dateTitleClasses}
          onClick={onToggleMonthDropdown}
        >
          {date && format(date, this.getDateFormat())}
        </span>
        <i
          className={forwardClass}
          role="button"
          tabIndex="-1"
          onClick={disabledForword ? undefined : onMoveForword}
        />
      </div>
    );

    const hasMonth = showDate || showMonth;
    const classes = classNames(classPrefix, className, {
      [this.addPrefix('has-month')]: hasMonth,
      [this.addPrefix('has-time')]: showTime
    });
    const unhandled = getUnhandledProps(Header, rest);

    return (
      <div {...unhandled} className={classes}>
        {hasMonth && monthToolbar}
        {showTime && (
          <div className={this.addPrefix('time-toolbar')}>
            <span
              role="button"
              tabIndex="-1"
              className={timeTitleClasses}
              onClick={onToggleTimeDropdown}
            >
              {date && format(date, this.getTimeFormat())}
            </span>
          </div>
        )}
      </div>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'calendar-header'
});
export default enhance(Header);
