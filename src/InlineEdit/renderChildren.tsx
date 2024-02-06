import React from 'react';
import Input from '../Input';

export interface ChildrenProps {
  size?: 'lg' | 'md' | 'sm' | 'xs';
  disabled?: boolean;
  placeholder?: string;
  plaintext?: boolean;
  value: any;
  onChange: (value: any, event: React.SyntheticEvent) => void;
  onBlur?: (event: React.SyntheticEvent) => void;
}

export function defaultRenderInput(props: ChildrenProps, ref: React.Ref<any>) {
  return <Input ref={ref} {...props} />;
}

const pickers = [
  'DatePicker',
  'DateRangePicker',
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

    // if the children is a picker, we should pass the onBlur to the onClose
    return React.cloneElement(children, { ...rest, onClose: onBlur, ref });
  }

  return React.cloneElement(children, { ...props, ref });
}
