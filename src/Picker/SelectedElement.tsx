import * as React from 'react';
import reactToString from '../utils/reactToString';

export interface SelectedElementProps {
  selectedItems: any[];
  valueKey: string;
  labelKey: string;
  countable: boolean;
  cascade?: boolean;
  locale?: any;
  childrenKey?: string;
  prefix: (name: string) => string;
}

const SelectedElement = (props: SelectedElementProps) => {
  const {
    selectedItems,
    prefix,
    valueKey,
    labelKey,
    childrenKey,
    countable,
    cascade,
    locale
  } = props;

  const count = selectedItems.length;
  let title = '';

  if (count) {
    title = selectedItems
      .map(item => {
        const label = item[labelKey];
        if (typeof label === 'string' || typeof label === 'number') {
          return label;
        } else if (React.isValidElement(label)) {
          return reactToString(label).join('');
        }
        return '';
      })
      .join(', ');
  }

  return (
    <React.Fragment>
      <span className={prefix('value-list')} title={title}>
        {selectedItems.map((item, index) => {
          const checkAll = cascade && (item.checkAll || item[childrenKey]);
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
        <span className={prefix('value-count')} title={`${count}`}>
          {count > 99 ? '99+' : count}
        </span>
      ) : null}
    </React.Fragment>
  );
};

export default SelectedElement;
