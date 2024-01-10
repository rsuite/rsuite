import React from 'react';
import Button from '../Button';
import { useClassNames } from '../utils';
import PredefinedRanges, { PredefinedRangesProps } from './PredefinedRanges';
import Stack from '../Stack';

export type { RangeType } from './types';

export interface ToolbarProps<T = any, Shortcut = T> extends PredefinedRangesProps<T, Shortcut> {
  hideOkBtn?: boolean;
  disabledOkBtn?: (value: T) => boolean;
  onOk?: (event: React.MouseEvent) => void;
}

type ToolbarComponent = React.ForwardRefExoticComponent<ToolbarProps> & {
  <T = any, Shortcut = T>(props: ToolbarProps<T, Shortcut>): React.ReactElement | null;
};

interface SubmitButtonProps {
  calendarDate: any;
  children: React.ReactNode;
  disabledOkBtn?: (value: any) => boolean;
  onOk?: (event: React.MouseEvent) => void;
}

const SubmitButton = ({ disabledOkBtn, calendarDate, onOk, children }: SubmitButtonProps) => {
  const disabled = disabledOkBtn?.(calendarDate);

  return (
    <Button
      appearance="primary"
      size="sm"
      disabled={disabled}
      onClick={disabled ? undefined : onOk}
    >
      {children}
    </Button>
  );
};

/**
 * Toolbar for DatePicker and DateRangePicker
 */
const Toolbar: ToolbarComponent = React.forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  props,
  ref
) {
  const {
    className,
    classPrefix = 'picker-toolbar',
    disabledOkBtn,
    disabledShortcut,
    hideOkBtn,
    onOk,
    onShortcutClick,
    calendarDate,
    ranges,
    locale,
    ...rest
  } = props;

  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);

  if (hideOkBtn && ranges?.length === 0) {
    return null;
  }

  const classes = merge(className, withClassPrefix());

  return (
    <Stack
      ref={ref}
      className={classes}
      justifyContent="space-between"
      alignItems="flex-start"
      {...rest}
    >
      <PredefinedRanges
        wrap
        className={prefix('ranges')}
        ranges={ranges}
        calendarDate={calendarDate}
        locale={locale}
        disabledShortcut={disabledShortcut}
        onShortcutClick={onShortcutClick}
        data-testid="daterange-predefined-bottom"
      />
      <div className={prefix('right')}>
        {!hideOkBtn && (
          <SubmitButton disabledOkBtn={disabledOkBtn} calendarDate={calendarDate} onOk={onOk}>
            {locale?.ok}
          </SubmitButton>
        )}
      </div>
    </Stack>
  );
});

export default Toolbar;
