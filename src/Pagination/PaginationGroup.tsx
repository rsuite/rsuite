import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Pagination, { PaginationProps } from './Pagination';
import Divider from '../Divider';
import Input from '../Input';
import { tplTransform, useClassNames, useCustom, useControlled, useEventCallback } from '../utils';
import { RsRefForwardingComponent } from '../@types/common';
import { PaginationLocale } from '../locales';
import LimitPicker from './LimitPicker';

type LayoutType = 'total' | '-' | 'pager' | '|' | 'limit' | 'skip';

export interface PaginationGroupProps extends PaginationProps {
  /**
   * Customize the layout of a paging component.
   */
  layout?: LayoutType[];

  /**
   * Customizes the options of the rows per page select field.
   */
  limitOptions?: number[];

  /**
   * Customize the layout of a paging component.
   */
  limit?: number;

  /**
   * Total number of data entries.
   */
  total: number;

  /**
   * Callback fired when the page is changed.
   */
  onChangePage?: (page: number) => void;

  /**
   * Callback fired when the number of rows per page is changed.
   */
  onChangeLimit?: (limit: number) => void;
}

const defaultLayout = ['pager'];
const defaultLimitOptions = [30, 50, 100];

/**
 * Pagination component for displaying page numbers.
 *
 * @see https://rsuitejs.com/components/pagination
 */
const PaginationGroup: RsRefForwardingComponent<'div', PaginationGroupProps> = React.forwardRef(
  (props: PaginationGroupProps, ref) => {
    const {
      as: Component = 'div',
      activePage: activePageProp,
      classPrefix = 'pagination-group',
      className,
      disabled,
      size,
      style,
      total,
      prev,
      next,
      first,
      last,
      limitOptions = defaultLimitOptions,
      limit: limitProp,
      locale: localeProp,
      layout = defaultLayout,
      maxButtons,
      onChangePage,
      onChangeLimit,
      ...rest
    } = props;

    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
    const [limit, setLimit] = useControlled(limitProp, 30);
    const [activePage, setActivePage] = useControlled(activePageProp, 1);
    const { locale } = useCustom<PaginationLocale>('Pagination', localeProp);
    const pages = Math.floor(total / limit) + (total % limit ? 1 : 0);
    const classes = merge(className, withClassPrefix(size));

    const handleInputBlur = useEventCallback(event => {
      const value = parseInt(event.target.value);
      if (value > 0 && value <= pages) {
        onChangePage?.(value);
        setActivePage(value);
      }
      event.target.value = '';
    });

    const handleInputPressEnter = useEventCallback(event => {
      event.target?.blur();
    });

    const handleChangeLimit = useEventCallback(value => {
      setLimit(value);
      onChangeLimit?.(value);
    });

    return (
      <Component ref={ref} className={classes} style={style}>
        {layout.map((key, index) => {
          const onlyKey = `${key}${index}`;

          switch (key) {
            case '-':
              return <div className={prefix('grow')} key={onlyKey} />;
            case '|':
              return <Divider vertical key={onlyKey} />;
            case 'pager':
              return (
                <Pagination
                  key={onlyKey}
                  size={size}
                  prev={prev}
                  next={next}
                  first={first}
                  last={last}
                  maxButtons={maxButtons}
                  pages={pages}
                  disabled={disabled}
                  onSelect={onChangePage as any} // fixme don't use any
                  activePage={activePage}
                  {...rest}
                />
              );
            case 'total':
              return (
                <div key={onlyKey} className={prefix('total')}>
                  {locale.total && tplTransform(locale.total, total)}
                </div>
              );
            case 'skip':
              return (
                <div key={onlyKey} className={classNames(prefix('skip'))}>
                  {locale.skip &&
                    tplTransform(
                      locale.skip,
                      <Input
                        size={size}
                        onBlur={handleInputBlur}
                        onPressEnter={handleInputPressEnter}
                      />
                    )}
                </div>
              );
            case 'limit':
              return (
                <LimitPicker
                  key={onlyKey}
                  size={size}
                  locale={locale}
                  limit={limit}
                  onChangeLimit={handleChangeLimit}
                  limitOptions={limitOptions}
                  disabled={disabled}
                  prefix={prefix}
                />
              );
            default:
              return key;
          }
        })}
      </Component>
    );
  }
);

PaginationGroup.displayName = 'PaginationGroup';
PaginationGroup.propTypes = {
  ...Pagination.propTypes,
  locale: PropTypes.any,
  layout: PropTypes.array,
  limitOptions: PropTypes.array,
  limit: PropTypes.number,
  total: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeLimit: PropTypes.func
};

export default PaginationGroup;
