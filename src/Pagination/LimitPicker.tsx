import React, { useRef } from 'react';
import SelectPicker, { type SelectPickerProps } from '../SelectPicker';
import { forwardRef, mergeRefs, tplTransform } from '@/internals/utils';
import { PaginationLocale } from '../locales';
import type { OnChangeCallback, SizeType } from '@/internals/types';

interface LimitPickerProps extends Omit<SelectPickerProps<any>, 'locale' | 'disabled' | 'data'> {
  disabled?: boolean | ((eventKey: number | string) => boolean);
  limitOptions: number[];
  locale: PaginationLocale;
  limit: number;
  size?: SizeType;
  prefix: (input: string) => string;
  onChangeLimit: OnChangeCallback<any>;
}

const LimitPicker = forwardRef<'div', LimitPickerProps>((props, ref) => {
  const {
    as: Component = 'div',
    disabled,
    limitOptions,
    locale,
    limit,
    onChangeLimit,
    size,
    prefix,
    ...rest
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const disabledPicker = typeof disabled === 'function' ? disabled('picker') : Boolean(disabled);
  const formatlimitOptions = limitOptions.map(item => {
    return {
      value: item,
      label: locale.limit && tplTransform(locale.limit, item)
    };
  });

  return (
    <Component className={prefix('limit')} ref={mergeRefs(containerRef, ref)}>
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
    </Component>
  );
});

export default LimitPicker;
