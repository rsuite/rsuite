import React, { useRef } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import SegmentedItem from './SegmentedItem';
import Indicator from './Indicator';
import { forwardRef, mergeRefs } from '@/internals/utils';
import {
  useStyles,
  useCustom,
  useControlled,
  useEventCallback,
  useUniqueId
} from '@/internals/hooks';
import type { FormControlBaseProps, Size } from '@/internals/types';
import useIndicatorPosition from './hooks/useIndicatorPosition';

export interface SegmentedItemDataType {
  /** The label of the item */
  label: React.ReactNode;
  /** The value of the item */
  value: string | number;
}

export interface SegmentedControlProps<T = string | number | null>
  extends BoxProps,
    Omit<FormControlBaseProps<T>, 'readOnly' | 'plaintext'> {
  /** The indicator style of the segmented control */
  indicator?: 'pill' | 'underline';

  /** Name to use for form */
  name?: string;

  /** Data of segmented items */
  data?: SegmentedItemDataType[];

  /** Display block style, fit the width of the container */
  block?: boolean;

  /** A segmented control can have different sizes */
  size?: Size;
}

/**
 * The `SegmentedControl` component is used to offer multiple exclusive options.
 * @see https://rsuitejs.com/components/segmented-control
 */
const SegmentedControl = forwardRef<'div', SegmentedControlProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('SegmentedControl', props);
  const {
    as,
    className,
    classPrefix = 'segmented-control',
    value: valueProp,
    defaultValue,
    indicator = 'pill',
    size = 'md',
    block = false,
    name,
    disabled,
    data,
    onChange,
    ...rest
  } = propsWithDefaults;

  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix(size));
  const [value, setValue] = useControlled(valueProp, defaultValue);
  const id = useUniqueId('segmented', name);

  // Ref for container element
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the active item index
  const activeIndex = data?.findIndex(item => item.value === value);

  const { style: indicatorStyle } = useIndicatorPosition({
    containerRef,
    activeIndex,
    indicator,
    data
  });

  const handleChange = useEventCallback(
    (nextValue: string | number | undefined, event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(nextValue);
      onChange?.(nextValue ?? '', event);
    }
  );

  return (
    <Box
      as={as}
      role="radiogroup"
      ref={mergeRefs(ref, containerRef)}
      className={classes}
      data-block={block || undefined}
      data-indicator={indicator}
      {...rest}
    >
      {data?.map((item, index) => (
        <SegmentedItem
          key={index}
          item={item}
          index={index}
          name={id}
          active={value === item.value}
          disabled={disabled}
          classPrefix={classPrefix}
          onChange={handleChange}
        />
      ))}
      {activeIndex !== -1 && <Indicator style={indicatorStyle} classPrefix={classPrefix} />}
    </Box>
  );
});

SegmentedControl.displayName = 'SegmentedControl';

export default SegmentedControl;
