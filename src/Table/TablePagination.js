

import * as React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';

import Pagination from './Pagination';
import SelectPicker from './SelectPicker';
import Divider from './Divider';

import { prefix, tplTransform, getUnhandledProps, defaultProps } from './utils';
import withLocale from './IntlProvider/withLocale';

type Locale = {
  lengthMenuInfo: string,
  totalInfo: string
};

type Props = {
  lengthMenu?: Array<{ value: number, label: React.Node }>,
  showLengthMenu?: boolean,
  showInfo?: boolean,
  total: number,
  displayLength: number,
  renderLengthMenu?: (picker: React.Node) => React.Node,
  renderTotal?: (total: number, activePage: number) => React.Node,
  onChangePage?: (page: number) => void,
  onChangeLength?: (size: number) => void,
  prev?: boolean,
  next?: boolean,
  first?: boolean,
  last?: boolean,
  maxButtons?: number,
  activePage: number,
  className?: string,
  locale: Locale,
  classPrefix: string,
  disabled?: boolean | ((eventKey: any) => boolean),
  style?: Object,
  // reverse start and end position
  reverse?: boolean
};

class TablePagination extends React.Component<Props> {
  static defaultProps = {
    showLengthMenu: true,
    showInfo: true,
    lengthMenu: [
      {
        value: 30,
        label: 30
      },
      {
        value: 50,
        label: 50
      },
      {
        value: 100,
        label: 100
      }
    ],
    displayLength: 30,
    prev: true,
    next: true,
    first: true,
    last: true,
    activePage: 1,
    maxButtons: 5,
    locale: {
      lengthMenuInfo: 'Show {0} data',
      totalInfo: 'Total: {0}'
    }
  };

  handleChangeLength = (eventKey: any) => {
    const { onChangeLength } = this.props;
    onChangeLength && onChangeLength(eventKey);
  };

  handleChangePage = (eventKey: any) => {
    const { onChangePage } = this.props;
    onChangePage && onChangePage(eventKey);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderLengthMenu() {
    const {
      lengthMenu = [],
      renderLengthMenu,
      showLengthMenu,
      locale,
      displayLength,
      disabled
    } = this.props;

    if (!showLengthMenu) {
      return null;
    }

    const disabledPicker = typeof disabled === 'function' ? disabled('picker') : disabled;

    const picker = (
      <SelectPicker
        appearance="subtle"
        cleanable={false}
        searchable={false}
        placement="topStart"
        data={lengthMenu}
        value={displayLength}
        onChange={this.handleChangeLength}
        menuStyle={{ minWidth: 'auto' }}
        disabled={disabledPicker}
      />
    );

    return (
      <div className={this.addPrefix('length-menu')}>
        {renderLengthMenu ? renderLengthMenu(picker) : tplTransform(locale.lengthMenuInfo, picker)}
      </div>
    );
  }

  renderInfo() {
    const { renderTotal, total, showInfo, locale, activePage } = this.props;

    if (!showInfo) {
      return null;
    }

    return (
      <div className={this.addPrefix('page-info')}>
        {renderTotal ? renderTotal(total, activePage) : tplTransform(locale.totalInfo, total)}
      </div>
    );
  }

  render() {
    const {
      total,
      prev,
      next,
      first,
      last,
      maxButtons,
      className,
      displayLength,
      activePage,
      disabled,
      style,
      reverse,
      ...rest
    } = this.props;

    const pages = Math.floor(total / displayLength) + (total % displayLength ? 1 : 0);
    const classes = classNames(this.addPrefix('toolbar'), className);
    const unhandled = getUnhandledProps(TablePagination, rest);
    const pagers = [
      <div className={classNames(this.addPrefix('start'))} key={1}>
        {this.renderLengthMenu()}
        <Divider vertical />
        {this.renderInfo()}
      </div>,
      <div className={classNames(this.addPrefix('end'))} key={2}>
        <Pagination
          size="xs"
          prev={prev}
          next={next}
          first={first}
          last={last}
          maxButtons={maxButtons}
          pages={pages}
          disabled={disabled}
          onSelect={this.handleChangePage}
          activePage={activePage}
          {...unhandled}
        />
      </div>
    ];

    return (
      <div className={classes} style={style}>
        {reverse ? pagers.reverse() : pagers}
      </div>
    );
  }
}

export default compose(
  withLocale(['TablePagination']),
  defaultProps({
    classPrefix: 'table-pagination'
  })
)(TablePagination);
