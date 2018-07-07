// @flow

import * as React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { constants } from 'rsuite-utils/lib/Picker';

import Table from './Table';
import getMonthView from '../utils/getMonthView';

type Props = {
  activeDate: moment$Moment,
  onSelect?: (date: moment$Moment) => void,
  disabledDate?: (date: moment$Moment) => boolean,
  isoWeek?: boolean,
  className?: string,
  classPrefix?: string
};

// is two date in the same month
const inSameMonth = (dateA: moment$Moment, dateB: moment$Moment) => dateA.month() === dateB.month();
const getThisMonthDate = (date: moment$Moment) => date.clone().date(1);

class View extends React.PureComponent<Props> {
  static defaultProps = {
    classPrefix: `${constants.namespace}-calendar-view`,
    activeDate: moment()
  };

  inSameThisMonthDate = (date: moment$Moment) => {
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
          selected={activeDate}
          onSelect={onSelect}
          inSameMonth={this.inSameThisMonthDate}
          disabledDate={disabledDate}
          isoWeek={isoWeek}
          rows={getMonthView(thisMonthDate, isoWeek)}
        />
      </div>
    );
  }
}

export default View;
