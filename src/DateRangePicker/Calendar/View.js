// @flow

import * as React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import Table from './Table';
import getMonthView from '../../utils/getMonthView';

type Props = {
  activeDate: moment$Moment,
  value?: Array<moment$Moment>,
  hoverValue?: Array<moment$Moment>,
  onSelect?: (date: moment$Moment) => void,
  onMouseMove?: (date: moment$Moment) => void,
  disabledDate?: (
    date: moment$Moment,
    selectValue: Array<moment$Moment | null>,
    type: string
  ) => boolean,
  isoWeek?: boolean,
  className?: string,
  classPrefix?: string
};

// is two date in the same month
const inSameMonth = (dateA: moment$Moment, dateB: moment$Moment) => dateA.month() === dateB.month();
const getThisMonthDate = (date: moment$Moment) => date.clone().date(1);

class View extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'rs-calendar-view',
    activeDate: moment()
  };

  inSameThisMonthDate = (date: moment$Moment) => {
    const thisMonthDate = getThisMonthDate(this.props.activeDate);
    return inSameMonth(date, thisMonthDate);
  };
  render() {
    const {
      activeDate,
      value,
      hoverValue,
      onSelect,
      onMouseMove,
      disabledDate,
      className,
      isoWeek,
      classPrefix,
      ...rest
    } = this.props;

    const thisMonthDate = getThisMonthDate(activeDate);
    const classes = classNames(classPrefix, className);

    return (
      <div {...rest} className={classes}>
        <Table
          rows={getMonthView(thisMonthDate, isoWeek)}
          isoWeek={isoWeek}
          selected={value}
          onSelect={onSelect}
          onMouseMove={onMouseMove}
          inSameMonth={this.inSameThisMonthDate}
          disabledDate={disabledDate}
          hoverValue={hoverValue}
        />
      </div>
    );
  }
}

export default View;
