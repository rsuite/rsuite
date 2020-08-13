import React from 'react';
import PropTypes from 'prop-types';
import { isSameMonth, setDate } from '../utils/dateUtils';
import { getMonthView, useClassNames } from '../utils';
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

const defaultProps = {
  classPrefix: 'calendar-view',
  activeDate: new Date()
};

const View = React.forwardRef<HTMLDivElement, ViewProps>((props, ref) => {
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
  } = props;
  const inSameThisMonthDate = (date: Date) =>
    composeFunctions(
      d => setDate(d, 1),
      d => isSameMonth(d, date)
    )(activeDate);

  const thisMonthDate = setDate(activeDate, 1);
  const { merge, rootPrefix } = useClassNames(classPrefix);
  const classes = merge(rootPrefix(classPrefix), className);

  return (
    <div {...rest} ref={ref} className={classes}>
      <Table
        rows={getMonthView(thisMonthDate, isoWeek)}
        isoWeek={isoWeek}
        timeZone={timeZone}
        selected={activeDate}
        onSelect={onSelect}
        inSameMonth={inSameThisMonthDate}
        disabledDate={disabledDate}
        renderCell={renderCell}
        showWeekNumbers={showWeekNumbers}
      />
    </div>
  );
});

View.displayName = 'View';
View.propTypes = {
  activeDate: PropTypes.instanceOf(Date),
  timeZone: PropTypes.string,
  isoWeek: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onSelect: PropTypes.func,
  disabledDate: PropTypes.func,
  renderCell: PropTypes.func
};
View.defaultProps = defaultProps;

export default View;
