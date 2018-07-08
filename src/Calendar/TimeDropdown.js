// @flow

import * as React from 'react';
import { getPosition, scrollTop } from 'dom-lib';
import { FormattedMessage } from 'rsuite-intl';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classnames';
import { prefix, getUnhandledProps } from 'rsuite-utils/lib/utils';

import scrollTopAnimation from '../utils/scrollTopAnimation';

type Props = {
  disabledDate?: (date: moment$Moment) => boolean,
  disabledHours?: (hour: number, date: moment$Moment) => boolean,
  disabledMinutes?: (minute: number, date: moment$Moment) => boolean,
  disabledSeconds?: (second: number, date: moment$Moment) => boolean,
  hideHours?: (hour: number, date: moment$Moment) => boolean,
  hideMinutes?: (minute: number, date: moment$Moment) => boolean,
  hideSeconds?: (second: number, date: moment$Moment) => boolean,
  date?: moment$Moment,
  onSelect?: (nextDate: moment$Moment, event: SyntheticEvent<*>) => void,
  show: boolean,
  format?: string,
  className?: string,
  classPrefix?: string
};

type TimeType = 'hours' | 'minutes' | 'seconds';

const ranges = {
  hours: { start: 0, end: 23 },
  minutes: { start: 0, end: 59 },
  seconds: { start: 0, end: 59 }
};

class TimeDropdown extends React.PureComponent<Props> {
  static defaultProps = {
    classPrefix: 'rs-calendar-time-dropdown',
    show: false,
    ranges: [
      {
        label: 'today',
        value: moment(),
        closeOverlay: true
      },
      {
        label: 'yesterday',
        value: moment().add(-1, 'd'),
        closeOverlay: true
      }
    ]
  };

  componentDidMount() {
    this.updatePosition();
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  getTime(props?: Props) {
    const { format, date } = props || this.props;
    let time = date || moment();
    let nextTime = {};

    if (!format) {
      return nextTime;
    }

    if (/(H|h)/.test(format)) {
      nextTime.hours = time.hours();
    }
    if (/m/.test(format)) {
      nextTime.minutes = time.minutes();
    }
    if (/s/.test(format)) {
      nextTime.seconds = time.seconds();
    }
    return nextTime;
  }

  container = {};
  content = {};

  updatePosition(props?: Props) {
    const { show } = props || this.props;
    const time = this.getTime(props);
    show && this.scrollTo(time);
  }

  scrollTo = (time: Object) => {
    Object.entries(time).forEach((item: any) => {
      let container = this.container[item[0]];
      let node = container.querySelector(`[data-key="${item[0]}-${item[1]}"]`);
      if (node && container) {
        let { top } = getPosition(node, container);
        scrollTopAnimation(this.container[item[0]], top, scrollTop(this.container[item[0]]) !== 0);
      }
    });
  };

  handleClick = (type: TimeType, d: number, event: SyntheticEvent<*>) => {
    const { onSelect, date } = this.props;
    // $FlowFixMe
    const nextDate = moment(date)[type](d);
    onSelect && onSelect(nextDate, event);
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
      if (!(hideFunc && hideFunc(i, date))) {
        let disabled = disabledFunc && disabledFunc(i, date);
        let itemClasses = classNames(this.addPrefix('cell'), {
          [this.addPrefix('cell-active')]: active === i,
          [this.addPrefix('cell-disabled')]: disabled
        });

        items.push(
          <li key={i}>
            <a
              role="menu"
              className={itemClasses}
              tabIndex="-1"
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

export default TimeDropdown;
