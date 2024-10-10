import React from 'react';
import Input from '../Input';
import { createChainedFunction } from '@/internals/utils';

export interface ChildrenProps {
  size?: 'lg' | 'md' | 'sm' | 'xs';
  disabled?: boolean;
  placeholder?: string;
  plaintext?: boolean;
  value: any;
  onChange: (value: any, event: React.SyntheticEvent) => void;
  onBlur?: (event?: React.FocusEvent) => void;
}

export function defaultRenderInput(props: ChildrenProps, ref: React.Ref<any>) {
  return <Input ref={ref} {...props} />;
}

const pickers = [
  'DatePicker',
  'DateRangePicker',
  'TimePicker',
  'TimeRangePicker',
  'InputPicker',
  'TagPicker',
  'Cascader',
  'MultiCascader',
  'SelectPicker',
  'CheckPicker',
  'CheckTreePicker',
  'TreePicker'
];

function getDisplayName(Component: React.ReactElement) {
  if (typeof Component?.type === 'string') {
    return Component?.type;
  }

  return (Component?.type as React.ForwardRefRenderFunction<any>)?.displayName || '';
}

export function renderChildren(
  children:
    | ((props: ChildrenProps, ref: React.Ref<any>) => React.ReactElement)
    | React.ReactElement,
  props: ChildrenProps,
  ref: React.Ref<any>
) {
  if (typeof children === 'function') {
    return children(props, ref);
  }

  if (pickers.includes(getDisplayName(children))) {
    const { onBlur, ...rest } = props;
    const { onExit, onClean } = children.props;

    return React.cloneElement(children, {
      ...rest,
      // Pass onBlur to the child component to automatically save or cancel after the focus event is processed.
      // Special handling in the Picker component, call onBlur when onExit and onClean
      onExit: createChainedFunction(() => onBlur?.(), onExit),
      onClean: createChainedFunction(() => onBlur?.(), onClean),
      ref
    });
  }

  return React.cloneElement(children, { ...props, ref });
}
