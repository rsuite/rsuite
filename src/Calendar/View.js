// @flow

import * as React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

import { defaultProps } from '../utils';
import Table from './Table';
import getMonthView from '../utils/getMonthView';

type Props = {
  activeDate: dayjs.Dayjs,
  onSelect?: (date: dayjs.Dayjs) => void,
  disabledDate?: (date: dayjs.Dayjs) => boolean,
  isoWeek?: boolean,
  className?: string,
  classPrefix?: string
};

// is two date in the same month
const inSameMonth = (dateA: dayjs.Dayjs, dateB: dayjs.Dayjs) => dateA.month() === dateB.month();
const getThisMonthDate = (date: dayjs.Dayjs) => date.clone().set('date', 1);

class View extends React.PureComponent<Props> {
  static defaultProps = {
    activeDate: dayjs()
  };

  inSameThisMonthDate = (date: dayjs.Dayjs) => {
    const thisMonthDate = getThisMonthDate(this.props.activeDate);
    return inSameMonth(date, thisMonthDate);
  };

  render() {
    const {
      activeDate,
      onSelect,
      disabledDate,
      className,
      classPrefix,
      isoWeek,
      ...rest
    } = this.props;

    const thisMonthDate = getThisMonthDate(activeDate);
    const classes = classNames(classPrefix, className);

    return (
      <div {...rest} className={classes}>
        <Table
          rows={getMonthView(thisMonthDate, isoWeek)}
          isoWeek={isoWeek}
          selected={activeDate}
          onSelect={onSelect}
          inSameMonth={this.inSameThisMonthDate}
          disabledDate={disabledDate}
        />
      </div>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'calendar-view'
});

export default enhance(View);
