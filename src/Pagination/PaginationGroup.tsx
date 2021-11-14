import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Pagination, { PaginationProps } from './Pagination';
import SelectPicker from '../SelectPicker';
import Divider from '../Divider';
import Input from '../Input';
import { tplTransform, useClassNames, useCustom, useControlled } from '../utils';
import { RsRefForwardingComponent, OnChangeCallback, TypeAttributes } from '../@types/common';
import { PaginationLocale } from '../locales';

type LayoutType = 'total' | '-' | 'pager' | '|' | 'limit' | 'skip';

export interface PaginationGroupProps extends PaginationProps {
  /** Customize the layout of a paging component */
  layout?: LayoutType[];

  /** Customizes the options of the rows per page select field. */
  limitOptions?: number[];

  /** Customize the layout of a paging component */
  limit?: number;

  /** Total number of data entries */
  total: number;

  /** Callback fired when the page is changed */
  onChangePage?: (page: number) => void;

  /** Callback fired when the number of rows per page is changed */
  onChangeLimit?: (limit: number) => void;
}

interface LimitPicker {
  disabled?: boolean | ((eventKey: number | string) => boolean);
  limitOptions: number[];
  locale: PaginationLocale;
  limit: number;
  onChangeLimit: OnChangeCallback<number>;
  size?: TypeAttributes.Size;
  prefix: (input: string) => string;
}

const LimitPicker = (props: LimitPicker) => {
  const { disabled, limitOptions, locale, limit, onChangeLimit, size, prefix } = props;
  const disabledPicker = typeof disabled === 'function' ? disabled('picker') : Boolean(disabled);
  const formatlimitOptions = limitOptions!.map(item => {
    return {
      value: item,
      label: tplTransform(locale!.limit!, item)
    };
  });

  return (
    <div className={prefix('limit')}>
      <SelectPicker
        size={size}
        cleanable={false}
        searchable={false}
        placement="topStart"
        data={formatlimitOptions}
        value={limit}
        onChange={onChangeLimit as any} // fixme don't use any
        menuStyle={{ minWidth: 'auto' }}
        disabled={disabledPicker}
      />
    </div>
  );
};

const defaultLayout = ['pager'];
const defaultLimitOptions = [30, 50, 100];

const PaginationGroup: RsRefForwardingComponent<'div', PaginationGroupProps> = React.forwardRef(
  (props: PaginationGroupProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'pagination-group',
      size,
      total,
      prev,
      next,
      first,
      last,
      maxButtons,
      className,
      limitOptions = defaultLimitOptions,
      limit: limitProp,
      activePage: activePageProp,
      disabled,
      style,
      locale: localeProp,
      layout = defaultLayout,
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

    const handleInputBlur = useCallback(
      event => {
        const value = parseInt(event.target.value);
        if (value > 0 && value <= pages) {
          onChangePage?.(value);
          setActivePage(value);
        }
        event.target.value = '';
      },
      [onChangePage, pages, setActivePage]
    );

    const handleInputPressEnter = useCallback(event => {
      event.target?.blur();
    }, []);

    const handleChangeLimit = useCallback(
      value => {
        setLimit(value);
        onChangeLimit?.(value);
      },
      [onChangeLimit, setLimit]
    );

    return (
      <Component ref={ref} className={classes} style={style}>
        {layout.map((key, index) => {
          const onlyKey = `${key}${index}`;

          if (key === '-') {
            return <div className={prefix('grow')} key={onlyKey} />;
          } else if (key === '|') {
            return <Divider vertical key={onlyKey} />;
          } else if (key === 'pager') {
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
          } else if (key === 'total') {
            return (
              <div key={onlyKey} className={prefix('total')}>
                {tplTransform(locale.total!, total)}
              </div>
            );
          } else if (key === 'skip') {
            return (
              <div key={onlyKey} className={classNames(prefix('skip'))}>
                {tplTransform(
                  locale.skip!,
                  <Input
                    size={size}
                    onBlur={handleInputBlur}
                    onPressEnter={handleInputPressEnter}
                  />
                )}
              </div>
            );
          } else if (key === 'limit') {
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
          }
          return key;
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
