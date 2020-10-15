import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import { useClassNames, DateUtils } from '../../utils';
import { WithAsProps, RsRefForwardingComponent } from '../../@types/common';
import { CalendarContext } from '../../Calendar';

export interface ViewProps extends WithAsProps {
  activeDate: Date;
  value?: Date[];
  hoverValue?: Date[];
  onMouseMove?: (date: Date) => void;
}

const defaultProps: Partial<ViewProps> = {
  as: 'div',
  activeDate: new Date(),
  classPrefix: 'calendar-view'
};

const View: RsRefForwardingComponent<'div', ViewProps> = React.forwardRef(
  (props: ViewProps, ref) => {
    const {
      as: Component,
      activeDate,
      value,
      hoverValue,
      className,
      classPrefix,
      onMouseMove,
      ...rest
    } = props;

    const thisMonthDate = DateUtils.setDate(activeDate, 1);
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    const { isoWeek } = useContext(CalendarContext);

    const inSameThisMonthDate = useCallback(
      (date: Date) => DateUtils.isSameMonth(date, DateUtils.setDate(activeDate, 1)),
      [activeDate]
    );

    return (
      <Component {...rest} ref={ref} className={classes}>
        <Table
          rows={DateUtils.getMonthView(thisMonthDate, isoWeek)}
          selected={value}
          onMouseMove={onMouseMove}
          inSameMonth={inSameThisMonthDate}
          hoverValue={hoverValue}
        />
      </Component>
    );
  }
);

View.displayName = 'View';
View.defaultProps = defaultProps;
View.propTypes = {
  as: PropTypes.elementType,
  activeDate: PropTypes.instanceOf(Date),
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  onMouseMove: PropTypes.func,
  disabledDate: PropTypes.func,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};

export default View;
