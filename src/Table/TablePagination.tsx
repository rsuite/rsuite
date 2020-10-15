import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Pagination from '../Pagination';
import SelectPicker from '../SelectPicker';
import Divider from '../Divider';
import { tplTransform, useClassNames, useCustom } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

interface MenuItem {
  label: React.ReactNode;
  value: number;
}

interface TablePaginationLocale {
  lengthMenuInfo?: string;
  totalInfo?: string;
}

export interface TablePaginationProps extends WithAsProps {
  /** Current page number */
  activePage?: number;

  /** Page buttons display the maximum number of */
  maxButtons?: number;

  /** Displays the first page */
  first?: boolean | React.ReactNode;

  /** Displays the last page */
  last?: boolean | React.ReactNode;

  /** Displays the prev page */
  prev?: boolean | React.ReactNode;

  /** Displays the next page */
  next?: boolean | React.ReactNode;

  /** Disabled component */
  disabled?: boolean | ((eventKey: any) => boolean);

  /** Paging display row number configuration, defaults to 30, 50, 100 */
  lengthMenu?: MenuItem[];

  /** Display Dropdown menu */
  showLengthMenu?: boolean;

  /** Show paging information */
  showInfo?: boolean;

  /** Total number of data entries */
  total?: number;

  /** Configure how many lines of entries per page to display, corresponding to lengthMenu */
  displayLength?: number;

  /** Reverse start and end position */
  reverse?: boolean;

  /** The component localized character set. */
  locale: TablePaginationLocale;

  /** Custom menu */
  renderLengthMenu?: (picker: React.ReactNode) => React.ReactNode;

  /** Custom total */
  renderTotal?: (total: number, activePage: number) => React.ReactNode;

  /** callback function triggered when page changes */
  onChangePage?: (page: number) => void;

  /** The callback function that triggers when the  lengthmenu value changes */
  onChangeLength?: (size: number) => void;
}

const defaultProps: Partial<TablePaginationProps> = {
  as: 'div',
  classPrefix: 'table-pagination',
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
  maxButtons: 5
};

const TablePagination: RsRefForwardingComponent<'div', TablePaginationProps> = React.forwardRef(
  (props: TablePaginationProps, ref) => {
    const {
      as: Component,
      classPrefix,
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
      lengthMenu,
      showLengthMenu,
      locale: localeProp,
      showInfo,
      renderTotal,
      renderLengthMenu,
      onChangePage,
      onChangeLength,
      ...rest
    } = props;

    const { merge, prefix } = useClassNames(classPrefix);
    const { locale } = useCustom('TablePagination', localeProp);
    const pages = Math.floor(total / displayLength) + (total % displayLength ? 1 : 0);
    const classes = merge(className, prefix('toolbar'));

    const renderMenu = () => {
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
          onChange={onChangeLength}
          menuStyle={{ minWidth: 'auto' }}
          disabled={disabledPicker}
        />
      );

      return (
        <div className={prefix('length-menu')}>
          {renderLengthMenu
            ? renderLengthMenu(picker)
            : tplTransform(locale.lengthMenuInfo, picker)}
        </div>
      );
    };

    const renderInfo = () => {
      if (!showInfo) {
        return null;
      }

      return (
        <div className={prefix('page-info')}>
          {renderTotal ? renderTotal(total, activePage) : tplTransform(locale.totalInfo, total)}
        </div>
      );
    };

    const pagers = [
      <div className={classNames(prefix('start'))} key={1}>
        {renderMenu()}
        <Divider vertical />
        {renderInfo()}
      </div>,
      <div className={classNames(prefix('end'))} key={2}>
        <Pagination
          size="xs"
          prev={prev}
          next={next}
          first={first}
          last={last}
          maxButtons={maxButtons}
          pages={pages}
          disabled={disabled}
          onSelect={onChangePage}
          activePage={activePage}
          {...rest}
        />
      </div>
    ];

    return (
      <Component ref={ref} className={classes} style={style}>
        {reverse ? pagers.reverse() : pagers}
      </Component>
    );
  }
);

TablePagination.displayName = 'TablePagination';
TablePagination.defaultProps = defaultProps;
TablePagination.propTypes = {
  lengthMenu: PropTypes.array,
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
  locale: PropTypes.any,
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

export default TablePagination;
