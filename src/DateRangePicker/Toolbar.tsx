import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, TypeChecker } from '../utils';
import { toZonedValue, Range, getDefaultRanges } from './utils';
import { ValueType } from './DateRangePicker';
import { CalendarLocale } from '../Calendar';

import { WithAsProps } from '../@types/common';

export interface ToolbarProps extends WithAsProps {
  ranges: Range[];
  pageDate?: ValueType;
  locale?: CalendarLocale;
  hideOkButton?: boolean;
  timeZone?: string;
  onShortcut: (value: ValueType, closeOverlay?: boolean, event?: React.SyntheticEvent) => void;
  onOk?: (event: React.SyntheticEvent) => void;
  disabledOkButton?: (value?: ValueType) => boolean;
  disabledShortcutButton: (value?: ValueType) => boolean;
}

const defaultProps: Partial<ToolbarProps> = {
  as: 'div',
  classPrefix: 'picker-toolbar'
};

const Toolbar = React.forwardRef((props: ToolbarProps, ref) => {
  const {
    as: Component,
    className,
    pageDate,
    classPrefix,
    hideOkButton,
    ranges: rangesProp,
    timeZone,
    locale,
    disabledShortcutButton,
    disabledOkButton,
    onShortcut,
    onOk,
    ...rest
  } = props;

  const getRanges = useCallback((): Range[] => {
    return typeof rangesProp === 'undefined'
      ? getDefaultRanges(timeZone)
      : rangesProp.map(({ value, ...rest }) => ({
          value: toZonedValue(typeof value === 'function' ? value(pageDate) : value, timeZone),
          ...rest
        }));
  }, [pageDate, rangesProp, timeZone]);

  const hasLocaleKey = useCallback(
    (key: any) => {
      return getDefaultRanges(timeZone).some(item => item.label === key);
    },
    [timeZone]
  );

  const [ranges, setRanges] = useState<Range[]>(getRanges);

  useEffect(() => {
    setRanges(getRanges());
  }, [getRanges]);

  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  if (hideOkButton && ranges.length === 0) {
    return null;
  }

  const renderOkButton = () => {
    if (hideOkButton) {
      return null;
    }

    const disabled = disabledOkButton?.(pageDate);
    const classes = prefix('right-btn-ok', { 'btn-disabled': disabled });

    return (
      <div className={prefix('right')}>
        <button className={classes} onClick={disabled ? undefined : onOk}>
          {locale?.ok}
        </button>
      </div>
    );
  };

  return (
    <Component {...rest} ref={ref} className={classes}>
      <div className={prefix('ranges')}>
        {ranges.map((item, index) => {
          const value = typeof item.value === 'function' ? item.value(pageDate) : item.value;
          const disabled = disabledShortcutButton?.(value);
          const itemClassName = prefix('option', { 'option-disabled': disabled });

          return (
            <a
              key={index}
              role="button"
              tabIndex={-1}
              className={itemClassName}
              onClick={event => {
                !disabled && onShortcut?.(value, item.closeOverlay, event);
              }}
            >
              {hasLocaleKey(item.label) && typeof item.label === 'string'
                ? locale?.[item.label]
                : item.label}
            </a>
          );
        })}
      </div>
      {renderOkButton()}
    </Component>
  );
});

Toolbar.displayName = 'Toolbar';
Toolbar.defaultProps = defaultProps;
Toolbar.propTypes = {
  ranges: PropTypes.array,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  pageDate: TypeChecker.tupleType(PropTypes.instanceOf(Date), PropTypes.instanceOf(Date)),
  onShortcut: PropTypes.func,
  onOk: PropTypes.func,
  disabledOkButton: PropTypes.func,
  disabledShortcutButton: PropTypes.func,
  hideOkButton: PropTypes.bool,
  timeZone: PropTypes.string,
  locale: PropTypes.any
};

export default Toolbar;
