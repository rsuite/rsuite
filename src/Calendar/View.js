// @flow

import * as React from 'react';
import classNames from 'classnames';

import { defaultProps } from '../utils';
import Table from './Table';
import getMonthView from '../utils/getMonthView';
import { isSameMonth, setDate } from 'date-fns';
import composeFunctions from '../utils/composeFunctions';

type Props = {
  activeDate: Date,
  onSelect?: (date: Date) => void,
  disabledDate?: (date: Date) => boolean,
  isoWeek?: boolean,
  className?: string,
  classPrefix?: string,
  renderCell?: (date: Date) => React.Node
};

class View extends React.PureComponent<Props> {
  static defaultProps = {
    activeDate: new Date()
  };

  inSameThisMonthDate = (date: Date) =>
    composeFunctions(d => setDate(d, 1), d => isSameMonth(d, date))(this.props.activeDate);

  render() {
    const {
      activeDate,
      onSelect,
      disabledDate,
      className,
      classPrefix,
      isoWeek,
      renderCell,
      ...rest
    } = this.props;

    const thisMonthDate = setDate(activeDate, 1);
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
          renderCell={renderCell}
        />
      </div>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'calendar-view'
});

export default enhance(View);
