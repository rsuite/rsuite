// @flow

import * as React from 'react';
import classNames from 'classnames';
import { prefix } from 'rsuite-utils/lib/utils';
import { constants } from 'rsuite-utils/lib/Picker';
import { FormattedMessage } from 'rsuite-intl';

type Props = {
  isoWeek?: boolean,
  className?: string,
  classPrefix?: string
};

const weekKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

class TableHeaderRow extends React.PureComponent<Props> {
  static defaultProps = {
    classPrefix: `${constants.namespace}-calendar-table`
  };
  render() {
    const { className, classPrefix, isoWeek, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(addPrefix('row'), addPrefix('header-row'), className);
    let items = weekKeys;
    if (isoWeek) {
      items = weekKeys.filter((v, k) => k > 0);
      items.push('sunday');
    }

    return (
      <div {...props} className={classes}>
        {items.map(key => (
          <div key={key} className={addPrefix('cell')}>
            <span className={addPrefix('cell-content')}>
              <FormattedMessage id={key} />
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default TableHeaderRow;
