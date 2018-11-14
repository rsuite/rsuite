// @flow

import * as React from 'react';

type Props = {
  selectedItems: Array<any>,
  prefix: () => string,
  valueKey: string,
  labelKey: string,
  countable: boolean,
  cascade: boolean,
  locale: Object,
  childrenKey?: string
};

function SelectedElement({
  selectedItems,
  prefix,
  valueKey,
  labelKey,
  childrenKey,
  countable,
  cascade,
  locale
}: Props) {
  const count = selectedItems.length;

  return (
    <React.Fragment>
      <span className={prefix('value-list')}>
        {selectedItems.map((item, index) => {
          let checkAll = cascade && (item.checkAll || item[childrenKey]);
          return (
            <React.Fragment key={item[valueKey]}>
              <span className={prefix('value-item')}>
                {item[labelKey]}
                {checkAll ? ` (${locale.checkAll})` : ''}
              </span>
              {index === count - 1 ? null : <span className={prefix('value-separator')}>,</span>}
            </React.Fragment>
          );
        })}
      </span>
      {countable ? (
        <span className={prefix('value-count')} title={count}>
          {count > 99 ? '99+' : count}
        </span>
      ) : null}
    </React.Fragment>
  );
}

export default SelectedElement;
