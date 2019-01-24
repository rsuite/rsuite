// @flow

import * as React from 'react';
import classNames from 'classnames';

import Table from './Table';
import { defaultProps } from '../../utils';
import getMonthView from '../../utils/getMonthView';
import { setDate, isSameMonth } from 'date-fns';

type Props = {
  activeDate: Date,
  value?: Array<Date>,
  hoverValue?: Array<Date>,
  onSelect?: (date: Date) => void,
  onMouseMove?: (date: Date) => void,
  disabledDate?: (date: Date, selectValue: Array<Date | null>, type: string) => boolean,
  isoWeek?: boolean,
  className?: string,
  classPrefix?: string
};

class View extends React.Component<Props> {
  static defaultProps = {
    activeDate: new Date()
  };

  inSameThisMonthDate = (date: Date) => {
    const thisMonthDate = setDate(this.props.activeDate, 1);
    return isSameMonth(date, thisMonthDate);
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

    const thisMonthDate = setDate(activeDate, 1);
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

const enhance = defaultProps({
  classPrefix: 'calendar-view'
});

export default enhance(View);
