import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { RsRefForwardingComponent, WithAsProps, TimeZoneName } from '../@types/common';
import { getDefaultRanges, getRanges } from './utils';
import { CalendarLocale } from '../Calendar';

type ToolbarValue = Date | Date[];

export interface RangeType {
  label: ReactNode;
  closeOverlay?: boolean;
  value: ToolbarValue | ((value: ToolbarValue) => ToolbarValue);
}

export interface InnerRange extends Omit<RangeType, 'value'> {
  value: ToolbarValue;
}

export interface ToolbarProps extends WithAsProps {
  hideOkButton?: boolean;
  locale?: CalendarLocale;
  pageDate?: ToolbarValue;
  ranges: RangeType[];
  timeZone?: TimeZoneName;
  disabledOkBtn?: (value?: ToolbarValue) => boolean;
  disabledShortcut?: (value?: ToolbarValue) => boolean;
  onOk?: (event: React.SyntheticEvent<any>) => void;
  onShortcut?: (
    value: ToolbarValue,
    closeOverlay?: boolean,
    event?: React.SyntheticEvent<any>
  ) => void;
}

const defaultProps: Partial<ToolbarProps> = {
  classPrefix: 'picker-toolbar',
  as: 'div'
};

/**
 * Toolbar for DatePicker and DateRangePicker
 */
const Toolbar: RsRefForwardingComponent<'div', ToolbarProps> = React.forwardRef(
  (props: ToolbarProps, ref) => {
    const {
      as: Component,
      className,
      classPrefix,
      hideOkButton,
      pageDate,
      ranges: rangeProp,
      timeZone,
      locale,
      disabledOkBtn,
      disabledShortcut,
      onOk,
      onShortcut,
      ...rest
    } = props;
    const [ranges, setRanges] = useState<InnerRange[]>(getRanges(props));
    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);

    useEffect(() => {
      setRanges(getRanges({ ranges: rangeProp, pageDate, timeZone }));
    }, [pageDate, rangeProp, timeZone]);

    const hasLocaleKey = useCallback(
      (key: ReactNode) => getDefaultRanges(timeZone, pageDate).some(item => item.label === key),
      [pageDate, timeZone]
    );

    const renderOkButton = useCallback(() => {
      if (hideOkButton) {
        return null;
      }

      const disabled = disabledOkBtn?.(pageDate);
      const classes = merge(prefix('right-btn-ok'), {
        [prefix('btn-disabled')]: disabled
      });

      return (
        <div className={prefix('right')}>
          <button className={classes} onClick={disabled ? undefined : onOk}>
            {locale?.ok}
          </button>
        </div>
      );
    }, [disabledOkBtn, hideOkButton, locale, merge, onOk, pageDate, prefix]);

    if (hideOkButton && ranges.length === 0) {
      return null;
    }

    const classes = merge(className, withClassPrefix());
    return (
      <Component {...rest} ref={ref} className={classes}>
        <div className={prefix('ranges')}>
          {ranges.map(({ value, closeOverlay, label }, index: number) => {
            const disabled = disabledShortcut?.(value);
            const itemClassName = merge(prefix('option'), {
              [prefix('option-disabled')]: disabled
            });

            return (
              <a
                key={index}
                role="button"
                tabIndex={-1}
                className={itemClassName}
                onClick={event => {
                  if (disabled) {
                    return;
                  }
                  onShortcut?.(value, closeOverlay, event);
                }}
              >
                {hasLocaleKey(label) && typeof label === 'string' ? locale?.[label] : label}
              </a>
            );
          })}
        </div>
        {renderOkButton()}
      </Component>
    );
  }
);

Toolbar.displayName = 'Toolbar';
Toolbar.propTypes = {
  ranges: PropTypes.array,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  pageDate: PropTypes.instanceOf(Date),
  onShortcut: PropTypes.func,
  onOk: PropTypes.func,
  disabledShortcut: PropTypes.func,
  disabledOkBtn: PropTypes.func,
  hideOkButton: PropTypes.bool,
  timeZone: PropTypes.string
};
Toolbar.defaultProps = defaultProps;

export default Toolbar;
