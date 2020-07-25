import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormattedMessage from '../IntlProvider/FormattedMessage';
import { getUnhandledProps, prefix, defaultProps } from '../utils';
import { addDays } from 'date-fns';
import { RangeType } from './DatePicker.d';

export interface ToolbarProps {
  ranges: RangeType[];
  className?: string;
  classPrefix?: string;
  pageDate?: Date;
  onShortcut?: (value: Date, closeOverlay?: boolean, event?: React.SyntheticEvent<any>) => void;
  onOk?: (event: React.SyntheticEvent<any>) => void;
  disabledHandle?: (date?: Date) => boolean;
  hideOkButton?: boolean;
}

const defaultRanges = [
  {
    label: 'today',
    value: new Date(),
    closeOverlay: true
  },
  {
    label: 'yesterday',
    value: addDays(new Date(), -1),
    closeOverlay: true
  }
];

function hasLocaleKey(key: any) {
  return defaultRanges.some(item => item.label === key);
}

class Toolbar extends React.PureComponent<ToolbarProps> {
  static propTypes = {
    ranges: PropTypes.array,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    pageDate: PropTypes.instanceOf(Date),
    onShortcut: PropTypes.func,
    onOk: PropTypes.func,
    disabledHandle: PropTypes.func,
    hideOkButton: PropTypes.bool
  };
  static defaultProps = {
    ranges: defaultRanges
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
      ranges,
      onShortcut,
      disabledHandle,
      className,
      pageDate,
      classPrefix,
      hideOkButton,
      ...rest
    } = this.props;

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
                {hasLocaleKey(item.label) ? <FormattedMessage id={item.label} /> : item.label}
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
