import * as React from 'react';
import PropTypes from 'prop-types';
import { getPosition, scrollTop } from 'dom-lib';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import _ from 'lodash';
import classNames from 'classnames';

import { prefix, getUnhandledProps, defaultProps } from '../utils';
import scrollTopAnimation from '../utils/scrollTopAnimation';
import { getHours, getMinutes, getSeconds, setSeconds, setMinutes, setHours } from 'date-fns';

export interface TimeDropdownProps {
  date?: Date;
  show: boolean;
  format?: string;
  className?: string;
  classPrefix?: string;
  disabledDate?: (date: Date) => boolean;
  disabledHours?: (hour: number, date: Date) => boolean;
  disabledMinutes?: (minute: number, date: Date) => boolean;
  disabledSeconds?: (second: number, date: Date) => boolean;
  hideHours?: (hour: number, date: Date) => boolean;
  hideMinutes?: (minute: number, date: Date) => boolean;
  hideSeconds?: (second: number, date: Date) => boolean;
  onSelect?: (nextDate: Date, event: React.MouseEvent) => void;
}

type TimeType = 'hours' | 'minutes' | 'seconds';

const ranges = {
  hours: { start: 0, end: 23 },
  minutes: { start: 0, end: 59 },
  seconds: { start: 0, end: 59 }
};

class TimeDropdown extends React.PureComponent<TimeDropdownProps> {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    show: PropTypes.bool,
    format: PropTypes.string,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    disabledDate: PropTypes.func,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    hideHours: PropTypes.func,
    hideMinutes: PropTypes.func,
    hideSeconds: PropTypes.func,
    onSelect: PropTypes.func
  };
  static defaultProps = {
    show: false
  };

  componentDidMount() {
    this.updatePosition();
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  getTime(props?: TimeDropdownProps): any {
    const { format, date } = props || this.props;
    let time = date || new Date();
    let nextTime: any = {};

    if (!format) {
      return nextTime;
    }

    if (/(H|h)/.test(format)) {
      nextTime.hours = getHours(time);
    }
    if (/m/.test(format)) {
      nextTime.minutes = getMinutes(time);
    }
    if (/s/.test(format)) {
      nextTime.seconds = getSeconds(time);
    }
    return nextTime;
  }

  container = {};
  content = {};

  updatePosition(props?: TimeDropdownProps) {
    const { show } = props || this.props;
    const time = this.getTime(props);
    show && this.scrollTo(time);
  }

  scrollTo = (time: object) => {
    Object.entries(time).forEach((item: any) => {
      let container: Element = this.container[item[0]];
      let node = container.querySelector(`[data-key="${item[0]}-${item[1]}"]`);
      if (node && container) {
        let { top } = getPosition(node, container);
        scrollTopAnimation(this.container[item[0]], top, scrollTop(this.container[item[0]]) !== 0);
      }
    });
  };

  handleClick = (type: TimeType, d: number, event: React.MouseEvent) => {
    const { onSelect, date } = this.props;
    // $FlowFixMe
    let nextDate = date || new Date();

    switch (type) {
      case 'hours':
        nextDate = setHours(date, d);
        break;
      case 'minutes':
        nextDate = setMinutes(date, d);
        break;
      case 'seconds':
        nextDate = setSeconds(date, d);
        break;
    }

    onSelect?.(nextDate, event);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderColumn(type: TimeType, active: any) {
    if (!_.isNumber(active)) {
      return null;
    }
    const { date } = this.props;
    const { start, end } = ranges[type];
    const items = [];

    const hideFunc = this.props[_.camelCase(`hide_${type}`)];
    const disabledFunc = this.props[_.camelCase(`disabled_${type}`)];

    for (let i = start; i <= end; i += 1) {
      if (!hideFunc?.(i, date)) {
        let disabled = disabledFunc?.(i, date);
        let itemClasses = classNames(this.addPrefix('cell'), {
          [this.addPrefix('cell-active')]: active === i,
          [this.addPrefix('cell-disabled')]: disabled
        });

        items.push(
          <li key={i}>
            <a
              role="menu"
              className={itemClasses}
              tabIndex={-1}
              data-key={`${type}-${i}`}
              onClick={event => {
                !disabled && this.handleClick(type, i, event);
              }}
            >
              {i}
            </a>
          </li>
        );
      }
    }

    return (
      <div className={this.addPrefix('column')}>
        <div className={this.addPrefix('column-title')}>
          <FormattedMessage id={type} />
        </div>
        <ul
          ref={ref => {
            this.container[type] = ref;
          }}
        >
          {items}
        </ul>
      </div>
    );
  }

  render() {
    const { className, classPrefix, ...rest } = this.props;
    const time = this.getTime();
    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(TimeDropdown, rest);

    return (
      <div {...unhandled} className={classes}>
        <div
          className={this.addPrefix('content')}
          ref={ref => {
            this.content = ref;
          }}
        >
          <div className={this.addPrefix('row')}>
            {this.renderColumn('hours', time.hours)}
            {this.renderColumn('minutes', time.minutes)}
            {this.renderColumn('seconds', time.seconds)}
          </div>
        </div>
      </div>
    );
  }
}

const enhance = defaultProps<TimeDropdownProps>({
  classPrefix: 'calendar-time-dropdown'
});

export default enhance(TimeDropdown);
