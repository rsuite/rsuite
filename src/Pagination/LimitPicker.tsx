import React, { useRef } from 'react';
import SelectPicker, { type SelectPickerProps } from '../SelectPicker';
import { PaginationLocale } from '../locales';
import { tplTransform } from '../utils';
import { OnChangeCallback, TypeAttributes } from '../@types/common';

interface LimitPickerProps extends Omit<SelectPickerProps<any>, 'locale' | 'disabled' | 'data'> {
  disabled?: boolean | ((eventKey: number | string) => boolean);
  limitOptions: number[];
  locale: PaginationLocale;
  limit: number;
  size?: TypeAttributes.Size;
  prefix: (input: string) => string;
  onChangeLimit: OnChangeCallback<any>;
}

const LimitPicker = (props: LimitPickerProps) => {
  const { disabled, limitOptions, locale, limit, onChangeLimit, size, prefix, ...rest } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const disabledPicker = typeof disabled === 'function' ? disabled('picker') : Boolean(disabled);
  const formatlimitOptions = limitOptions.map(item => {
    return {
      value: item,
      label: locale.limit && tplTransform(locale.limit, item)
    };
  });

  return (
    <div className={prefix('limit')} ref={containerRef}>
      <SelectPicker
        {...rest}
        size={size}
        cleanable={false}
        searchable={false}
        placement="topStart"
        data={formatlimitOptions}
        value={limit}
        onChange={onChangeLimit}
        menuStyle={{ minWidth: 'auto' }}
        disabled={disabledPicker}
        container={() => containerRef.current as HTMLDivElement}
      />
    </div>
  );
};

export default LimitPicker;
