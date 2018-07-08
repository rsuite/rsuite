// @flow

import * as React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { FormattedMessage } from 'rsuite-intl';
import { constants } from 'rsuite-utils/lib/Picker';
import { getUnhandledProps, prefix } from 'rsuite-utils/lib/utils';

import setTimingMargin from './setTimingMargin';

const { namespace } = constants;

type Range = {
  label: React.Node,
  closeOverlay?: boolean,
  value: Array<moment$Moment> | ((value?: Array<moment$Moment>) => Array<moment$Moment>)
};

type Props = {
  ranges: Array<Range>,
  className?: string,
  classPrefix?: string,
  pageDate?: Array<moment$Moment>,
  onShortcut: (
    value: Array<moment$Moment>,
    closeOverlay?: boolean,
    event?: SyntheticEvent<*>
  ) => void,
  onOk?: (event: SyntheticEvent<*>) => void,
  disabledOkButton?: (value?: Array<moment$Moment>) => boolean,
  disabledShortcutButton: (value?: Array<moment$Moment>) => boolean,
  selectValue?: Array<moment$Moment>
};

class Toolbar extends React.PureComponent<Props> {
  static defaultProps = {
    classPrefix: `${namespace}-toolbar`,
    ranges: [
      {
        label: 'today',
        value: [setTimingMargin(moment()), setTimingMargin(moment(), 'right')]
      },
      {
        label: 'yesterday',
        value: [
          setTimingMargin(moment().add(-1, 'd')),
          setTimingMargin(moment().add(-1, 'd'), 'right')
        ]
      },
      {
        label: 'last7Days',
        value: [setTimingMargin(moment().subtract(6, 'days')), setTimingMargin(moment(), 'right')]
      }
    ]
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderOkButton() {
    const { disabledOkButton, pageDate, onOk } = this.props;

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
      ...rest
    } = this.props;

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
                <FormattedMessage id={item.label} />
              </a>
            );
          })}
        </div>
        {this.renderOkButton()}
      </div>
    );
  }
}

export default Toolbar;
