// @flow

import * as React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { FormattedMessage } from 'rsuite-intl';

import { getUnhandledProps, prefix, defaultProps } from '../utils';
import isOneOf from '../utils/isOneOf';

type Range = {
  label: React.Node,
  closeOverlay?: boolean,
  value: moment$Moment | ((pageDate?: moment$Moment) => moment$Moment)
};

type Props = {
  ranges: Array<Range>,
  className?: string,
  classPrefix?: string,
  pageDate?: moment$Moment,
  onShortcut?: (value: moment$Moment, closeOverlay?: boolean, event?: SyntheticEvent<*>) => void,
  onOk?: (event: SyntheticEvent<*>) => void,
  disabledHandle?: (date?: moment$Moment) => boolean
};

class Toolbar extends React.PureComponent<Props> {
  static defaultProps = {
    ranges: [
      {
        label: 'today',
        value: moment(),
        closeOverlay: true
      },
      {
        label: 'yesterday',
        value: moment().add(-1, 'd'),
        closeOverlay: true
      }
    ]
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  hasLocaleKey = (key: any) => {
    const { ranges } = this.props;
    const keys = ranges.map(item => item.label);
    return isOneOf(key, keys);
  };

  renderOkButton() {
    const { disabledHandle, pageDate, onOk } = this.props;
    const disabled = disabledHandle && disabledHandle(pageDate);
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
      ...rest
    } = this.props;

    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(Toolbar, rest);

    return (
      <div {...unhandled} className={classes}>
        <div className={this.addPrefix('ranges')}>
          {ranges.map((item: Range, index: number) => {
            let value: any = typeof item.value === 'function' ? item.value(pageDate) : item.value;
            let disabled = disabledHandle && disabledHandle(value);
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
                  !disabled && onShortcut && onShortcut(value, item.closeOverlay, event);
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

const enhance = defaultProps({
  classPrefix: 'picker-toolbar'
});

export default enhance(Toolbar);
