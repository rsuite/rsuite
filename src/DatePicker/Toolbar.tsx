import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormattedMessage from '../IntlProvider/FormattedMessage';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import { addDays } from '../utils/dateUtils';
import { RangeType } from './DatePicker.d';
import { toTimeZone, zonedDate } from '../utils/timeZone';

export interface ToolbarProps {
  ranges: RangeType[];
  className?: string;
  classPrefix?: string;
  pageDate?: Date;
  onShortcut?: (value: Date, closeOverlay?: boolean, event?: React.SyntheticEvent<any>) => void;
  onOk?: (event: React.SyntheticEvent<any>) => void;
  disabledHandle?: (date?: Date) => boolean;
  hideOkButton?: boolean;
  timeZone?: string;
}

const getDefaultRanges = (timeZone: string) => {
  const todayDate = zonedDate(timeZone);
  return [
    {
      label: 'today',
      value: todayDate,
      closeOverlay: true
    },
    {
      label: 'yesterday',
      value: addDays(todayDate, -1),
      closeOverlay: true
    }
  ];
};

class Toolbar extends React.Component<
  ToolbarProps,
  {
    ranges: RangeType[];
  }
> {
  static propTypes = {
    ranges: PropTypes.array,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    pageDate: PropTypes.instanceOf(Date),
    onShortcut: PropTypes.func,
    onOk: PropTypes.func,
    disabledHandle: PropTypes.func,
    hideOkButton: PropTypes.bool,
    timeZone: PropTypes.string
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      ranges: this.getRanges(props)
    };
  }

  getRanges = (props: ToolbarProps) => {
    const { ranges, timeZone, pageDate } = props;
    return typeof ranges === 'undefined'
      ? getDefaultRanges(timeZone)
      : ranges.map(({ value, ...rest }) => ({
          value: toTimeZone(typeof value === 'function' ? value(pageDate) : value, timeZone),
          ...rest
        }));
  };

  componentDidUpdate(prevProps: Readonly<ToolbarProps>) {
    const { timeZone } = this.props;
    if (timeZone !== prevProps.timeZone) {
      this.setState({
        ranges: this.getRanges(this.props)
      });
    }
  }

  hasLocaleKey = (key: any) => {
    return getDefaultRanges(this.props.timeZone).some(item => item.label === key);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderOkButton() {
    const { disabledHandle, pageDate, onOk, hideOkButton } = this.props;

    if (hideOkButton) {
      return null;
    }

    const disabled = disabledHandle?.(pageDate);
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
      disabledHandle,
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
          {ranges.map((item: RangeType, index: number) => {
            const value: any = typeof item.value === 'function' ? item.value(pageDate) : item.value;
            const disabled = disabledHandle?.(value);
            const itemClassName = classNames(this.addPrefix('option'), {
              [this.addPrefix('option-disabled')]: disabled
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
                  onShortcut?.(value, item.closeOverlay, event);
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
