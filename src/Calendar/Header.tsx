import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, getUnhandledProps, defaultProps } from '../utils';
import IntlContext from '../IntlProvider/IntlContext';
import FormattedDate from '../IntlProvider/FormattedDate';

export interface HeaderProps {
  date: Date;
  showMonth?: boolean;
  showDate?: boolean;
  showTime?: boolean;
  format?: string;
  classPrefix?: string;
  className?: string;
  disabledBackward?: boolean;
  disabledForword?: boolean;
  showMeridian?: boolean;
  onMoveForword?: () => void;
  onMoveBackward?: () => void;
  onToggleMonthDropdown?: (event: React.MouseEvent) => void;
  onToggleTimeDropdown?: (event: React.MouseEvent) => void;
  onToggleMeridian?: (event: React.MouseEvent) => void;
  disabledDate?: (date: Date) => boolean;
  disabledTime?: (date: Date) => boolean;
  renderTitle?: (date: Date) => React.ReactNode;
  renderToolbar?: (date: Date) => React.ReactNode;
}

class Header extends React.PureComponent<HeaderProps> {
  static contextType = IntlContext;
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    onMoveForword: PropTypes.func,
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
    disabledForword: PropTypes.bool,
    showMeridian: PropTypes.bool,
    renderTitle: PropTypes.func,
    renderToolbar: PropTypes.func
  };
  static defaultProps = {
    date: new Date()
  };
  getTimeFormat() {
    const { format, showMeridian } = this.props;
    const timeFormat = [];

    if (!format) {
      return '';
    }

    if (/(H|h)/.test(format)) {
      timeFormat.push(showMeridian ? 'hh' : 'HH');
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
    const { formattedDayPattern, formattedMonthPattern } = this.context || {};
    if (showDate) {
      return formattedDayPattern || 'YYYY-MM-DD';
    } else if (showMonth) {
      return formattedMonthPattern || 'YYYY-MM';
    }

    return 'YYYY';
  }
  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);
  renderTitle() {
    const { date, renderTitle } = this.props;

    if (renderTitle) {
      return renderTitle(date);
    }

    return date && <FormattedDate date={date} formatStr={this.getDateFormat()} />;
  }
  render() {
    const {
      date,
      onMoveForword,
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
      disabledForword,
      renderToolbar,
      showMeridian,
      ...rest
    } = this.props;

    const dateTitleClasses = classNames(this.addPrefix('title'), this.addPrefix('title-date'), {
      [this.addPrefix('error')]: disabledDate?.(date)
    });

    const timeTitleClasses = classNames(this.addPrefix('title'), this.addPrefix('title-time'), {
      [this.addPrefix('error')]: disabledTime?.(date)
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
          tabIndex={-1}
          onClick={disabledBackward ? undefined : onMoveBackward}
        />
        <span
          role="button"
          tabIndex={-1}
          className={dateTitleClasses}
          onClick={onToggleMonthDropdown}
        >
          {this.renderTitle()}
        </span>
        <i
          className={forwardClass}
          role="button"
          tabIndex={-1}
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
              tabIndex={-1}
              className={timeTitleClasses}
              onClick={onToggleTimeDropdown}
            >
              {date && <FormattedDate date={date} formatStr={this.getTimeFormat()} />}
            </span>

            {showMeridian ? (
              <span
                role="button"
                tabIndex={-1}
                className={this.addPrefix('meridian')}
                onClick={onToggleMeridian}
              >
                {date && <FormattedDate date={date} formatStr="A" />}
              </span>
            ) : null}
          </div>
        )}

        {renderToolbar?.(date)}
      </div>
    );
  }
}

const enhance = defaultProps<HeaderProps>({
  classPrefix: 'calendar-header'
});
export default enhance(Header);
