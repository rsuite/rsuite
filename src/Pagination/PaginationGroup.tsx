import React from 'react';
import classNames from 'classnames';
import Pagination, { PaginationProps } from './Pagination';
import Divider from '../Divider';
import Input from '../Input';
import LimitPicker from './LimitPicker';
import { useClassNames, useControlled, useEventCallback } from '@/internals/hooks';
import { forwardRef, tplTransform } from '@/internals/utils';
import { useCustom } from '../CustomProvider';

/**
 * The layout of the paging component.
 */
type LayoutType = 'total' | 'pager' | 'limit' | 'skip' | '-' | '|';

export interface PaginationGroupProps extends PaginationProps {
  /**
   * Customize the layout of a paging component.
   * - `total` Component used to display the total.
   * - `pager` Component used to display the page number.
   * - `limit` Component used to display the number of rows per page.
   * - `skip` Component used to jump to a page.
   * - `-` Placeholder, take up the remaining space.
   * - `|` Divider
   *
   * @default ['pager']
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
const PaginationGroup = forwardRef<'div', PaginationGroupProps>((props, ref) => {
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

  const pages = Math.floor(total / limit) + (total % limit ? 1 : 0);
  const classes = merge(className, withClassPrefix(size));

  const { getLocale } = useCustom();
  const locale = getLocale('Pagination', localeProp);

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
                      disabled={
                        typeof disabled === 'function' ? disabled('skip') : Boolean(disabled)
                      }
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
});

PaginationGroup.displayName = 'PaginationGroup';

export default PaginationGroup;
