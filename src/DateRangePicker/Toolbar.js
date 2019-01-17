// @flow

import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'rsuite-intl';

import { getUnhandledProps, prefix, defaultProps } from '../utils';
import setTimingMargin from './setTimingMargin';
import { addDays, subDays } from 'date-fns';

type Range = {
  label: React.Node,
  closeOverlay?: boolean,
  value: Array<Date> | ((value?: Array<Date>) => Array<Date>)
};

type Props = {
  ranges: Array<Range>,
  className?: string,
  classPrefix?: string,
  pageDate?: Array<Date>,
  onShortcut: (value: Array<Date>, closeOverlay?: boolean, event?: SyntheticEvent<*>) => void,
  onOk?: (event: SyntheticEvent<*>) => void,
  disabledOkButton?: (value?: Array<Date>) => boolean,
  disabledShortcutButton: (value?: Array<Date>) => boolean,
  selectValue?: Array<Date>
  hideOkButton?: boolean
};

const defaultRanges = [
  {
    label: 'today',
    value: [setTimingMargin(new Date()), setTimingMargin(new Date(), 'right')]
  },
  {
    label: 'yesterday',
    value: [
      setTimingMargin(addDays(new Date(), -1)),
      setTimingMargin(addDays(new Date(), -1), 'right')
    ]
  },
  {
    label: 'last7Days',
    value: [setTimingMargin(subDays(new Date(), 6)), setTimingMargin(new Date(), 'right')]
  }
];

function hasLocaleKey(key: any) {
  return defaultRanges.some(item => item.label === key);
}

class Toolbar extends React.PureComponent<Props> {
  static defaultProps = {
    ranges: defaultRanges
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderOkButton() {
    const { disabledOkButton, pageDate, onOk, hideOkButton } = this.props;

    if (hideOkButton) {
      return null;
    }

    const disabled = disabledOkButton && disabledOkButton(pageDate);
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
      disabledShortcutButton,
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
          {ranges.map((item, index) => {
            let value: any = typeof item.value === 'function' ? item.value(pageDate) : item.value;
            let disabled = disabledShortcutButton && disabledShortcutButton(value);
            let itemClassName = classNames(this.addPrefix('option'), {
              [this.addPrefix('option-disabled')]: disabled
            });
            return (
              <a
                /* eslint-disable */
                key={index}
                role="button"
                tabIndex="-1"
                className={itemClassName}
                onClick={event => {
                  !disabled && onShortcut(value, item.closeOverlay, event);
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

const enhance = defaultProps({
  classPrefix: 'picker-toolbar'
});

export default enhance(Toolbar);
