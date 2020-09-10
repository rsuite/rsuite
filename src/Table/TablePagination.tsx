import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';

import Pagination from '../Pagination';
import SelectPicker from '../SelectPicker';
import Divider from '../Divider';

import { prefix, tplTransform, getUnhandledProps, defaultProps } from '../utils';
import withLocale from '../IntlProvider/withLocale';
import { TablePaginationProps } from './TablePagination.d';

class TablePagination extends React.Component<TablePaginationProps> {
  static propTypes = {
    lengthMenu: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.node
      })
    ),
    showLengthMenu: PropTypes.bool,
    showInfo: PropTypes.bool,
    total: PropTypes.number,
    displayLength: PropTypes.number,
    prev: PropTypes.bool,
    next: PropTypes.bool,
    first: PropTypes.bool,
    last: PropTypes.bool,
    maxButtons: PropTypes.number,
    activePage: PropTypes.number,
    className: PropTypes.string,
    locale: PropTypes.object,
    classPrefix: PropTypes.string,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    style: PropTypes.object,
    // reverse start and end position
    reverse: PropTypes.bool,
    renderLengthMenu: PropTypes.func,
    renderTotal: PropTypes.func,
    onChangePage: PropTypes.func,
    onChangeLength: PropTypes.func
  };
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
    this.props.onChangeLength?.(eventKey);
  };

  handleChangePage = (eventKey: any) => {
    this.props.onChangePage?.(eventKey);
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

export default compose<any, TablePaginationProps>(
  withLocale<TablePaginationProps>(['TablePagination']),
  defaultProps<TablePaginationProps>({
    classPrefix: 'table-pagination'
  })
)(TablePagination);
