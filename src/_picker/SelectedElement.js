// @flow

import * as React from 'react';

function SelectedElement({ selectedItems, prefix, valueKey, labelKey, countable }) {
  const count = selectedItems.length;
  return (
    <React.Fragment>
      <span className={prefix('value-list')}>
        {selectedItems.map((item, index) => (
          <React.Fragment key={item[valueKey]}>
            <span className={prefix('value-item')}>{item[labelKey]}</span>
            {index === count - 1 ? null : <span className={prefix('value-separator')}>,</span>}
          </React.Fragment>
        ))}
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
