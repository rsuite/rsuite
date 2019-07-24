import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setDate, isSameMonth } from 'date-fns';

import Table from './Table';
import { defaultProps, getMonthView } from '../../utils';

export interface ViewProps {
  activeDate: Date;
  value?: Date[];
  hoverValue?: Date[];
  onSelect?: (date: Date) => void;
  onMouseMove?: (date: Date) => void;
  disabledDate?: (date: Date, selectValue: Date[], type: string) => boolean;
  isoWeek?: boolean;
  className?: string;
  classPrefix?: string;
  showWeekNumbers?: boolean;
}

class View extends React.Component<ViewProps> {
  static propTypes = {
    activeDate: PropTypes.instanceOf(Date),
    value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    onSelect: PropTypes.func,
    onMouseMove: PropTypes.func,
    disabledDate: PropTypes.func,
    isoWeek: PropTypes.bool,
    className: PropTypes.string,
    classPrefix: PropTypes.string
  };
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
      showWeekNumbers,
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
