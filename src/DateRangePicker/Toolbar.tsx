import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addDays, subDays } from '../utils/dateUtils';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import { setTimingMargin, toZonedValue } from './utils';
import { ValueType } from './DateRangePicker.d';
import { zonedDate } from '../utils/timeZone';

export interface Range {
  label: React.ReactNode;
  closeOverlay?: boolean;
  value: ValueType | ((value?: ValueType) => ValueType);
}

export interface ToolbarProps {
  ranges: Range[];
  className?: string;
  classPrefix?: string;
  pageDate?: ValueType;
  onShortcut: (value: ValueType, closeOverlay?: boolean, event?: React.SyntheticEvent<any>) => void;
  onOk?: (event: React.SyntheticEvent<any>) => void;
  disabledOkButton?: (value?: ValueType) => boolean;
  disabledShortcutButton: (value?: ValueType) => boolean;
  selectValue?: ValueType;
  hideOkButton?: boolean;
}

const getDefaultRanges = (timeZone: string) => {
  const todayDate = zonedDate(timeZone);
  return [
    {
      label: 'today',
      value: [setTimingMargin(todayDate), setTimingMargin(todayDate, 'right')]
    },
    {
      label: 'yesterday',
      value: [
        setTimingMargin(addDays(todayDate, -1)),
        setTimingMargin(addDays(todayDate, -1), 'right')
      ]
    },
    {
      label: 'last7Days',
      value: [setTimingMargin(subDays(todayDate, 6)), setTimingMargin(todayDate, 'right')]
    }
  ];
};

class Toolbar extends React.PureComponent<
  ToolbarProps,
  {
    ranges: Range[];
  }
> {
  static propTypes = {
    ranges: PropTypes.array,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    pageDate: PropTypes.array,
    onShortcut: PropTypes.func,
    onOk: PropTypes.func,
    disabledOkButton: PropTypes.func,
    disabledShortcutButton: PropTypes.func,
    selectValue: PropTypes.array,
    hideOkButton: PropTypes.bool
  };
  static defaultProps = {};

  defaultRanges = [];

  constructor(props) {
    super(props);
    const { timeZone, ranges } = props;
    this.defaultRanges = getDefaultRanges(timeZone);
    this.state = {
      ranges:
        typeof ranges === 'undefined'
          ? this.defaultRanges
          : ranges.map(({ value, ...rest }) => ({
              value: toZonedValue(value, timeZone),
              ...rest
            }))
    };
  }

  hasLocaleKey = (key: any) => {
    return this.defaultRanges.some(item => item.label === key);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderOkButton() {
    const { disabledOkButton, pageDate, onOk, hideOkButton } = this.props;

    if (hideOkButton) {
      return null;
    }

    const disabled = disabledOkButton?.(pageDate);
    const classes = classNames(this.addPrefix('right-btn-ok'), {
      [this.addPrefix('btn-disabled')]: disabled
    });
    return (
      <div className={this.addPrefix('right')}>
        <button className={classes} onClick={disabled ? undefined : onOk}>
          <FormattedMessage id="ok" />
        </button>
      </div>
    );
  }
  render() {
    const {
      onShortcut,
      disabledShortcutButton,
      className,
      pageDate,
      classPrefix,
      hideOkButton,
      ...rest
    } = this.props;
    const { ranges } = this.state;

    if (hideOkButton && ranges.length === 0) {
      return null;
    }

    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(Toolbar, rest);

    return (
      <div {...unhandled} className={classes}>
        <div className={this.addPrefix('ranges')}>
          {ranges.map((item, index) => {
            const value: any = typeof item.value === 'function' ? item.value(pageDate) : item.value;
            const disabled = disabledShortcutButton?.(value);
            const itemClassName = classNames(this.addPrefix('option'), {
              [this.addPrefix('option-disabled')]: disabled
            });
            return (
              <a
                /* eslint-disable */
                key={index}
                role="button"
                tabIndex={-1}
                className={itemClassName}
                onClick={event => {
                  !disabled && onShortcut(value, item.closeOverlay, event);
                }}
              >
                {this.hasLocaleKey(item.label) ? <FormattedMessage id={item.label} /> : item.label}
              </a>
            );
          })}
        </div>
        {this.renderOkButton()}
      </div>
    );
  }
}

const enhance = defaultProps<ToolbarProps>({
  classPrefix: 'picker-toolbar'
});

export default enhance(Toolbar);
