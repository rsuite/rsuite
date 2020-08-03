import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isSameMonth, setDate } from '../utils/dateUtils';

import { defaultProps, getMonthView } from '../utils';
import Table from './Table';
import composeFunctions from '../utils/composeFunctions';

export interface ViewProps {
  activeDate: Date;
  timeZone?: string;
  isoWeek?: boolean;
  className?: string;
  classPrefix?: string;
  showWeekNumbers?: boolean;
  onSelect?: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  disabledDate?: (date: Date) => boolean;
  renderCell?: (date: Date) => React.ReactNode;
}

class View extends React.PureComponent<ViewProps> {
  static propTypes = {
    activeDate: PropTypes.instanceOf(Date),
    timeZone: PropTypes.string,
    isoWeek: PropTypes.bool,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    onSelect: PropTypes.func,
    disabledDate: PropTypes.func,
    renderCell: PropTypes.func
  };
  static defaultProps = {
    activeDate: new Date()
  };

  inSameThisMonthDate = (date: Date) =>
    composeFunctions(
      d => setDate(d, 1),
      d => isSameMonth(d, date)
    )(this.props.activeDate);

  render() {
    const {
      activeDate,
      onSelect,
      disabledDate,
      className,
      classPrefix,
      isoWeek,
      renderCell,
      showWeekNumbers,
      timeZone,
      ...rest
    } = this.props;

    const thisMonthDate = setDate(activeDate, 1);
    const classes = classNames(classPrefix, className);

    return (
      <div {...rest} className={classes}>
        <Table
          rows={getMonthView(thisMonthDate, isoWeek)}
          isoWeek={isoWeek}
          timeZone={timeZone}
          selected={activeDate}
          onSelect={onSelect}
          inSameMonth={this.inSameThisMonthDate}
          disabledDate={disabledDate}
          renderCell={renderCell}
          showWeekNumbers={showWeekNumbers}
        />
      </div>
    );
  }
}

const enhance = defaultProps<ViewProps>({
  classPrefix: 'calendar-view'
});

export default enhance(View);
