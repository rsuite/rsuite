import React from 'react';
import Button from '../Button';
import PredefinedRanges, { PredefinedRangesProps } from './PredefinedRanges';
import Stack from '../Stack';
import { useClassNames } from '@/internals/hooks';

export interface ToolbarProps<T = any, Shortcut = T> extends PredefinedRangesProps<T, Shortcut> {
  hideOkBtn?: boolean;
  disableOkBtn?: (value: T) => boolean;
  onOk?: (event: React.MouseEvent) => void;
}

type ToolbarComponent = React.ForwardRefExoticComponent<ToolbarProps> & {
  <T = any, Shortcut = T>(props: ToolbarProps<T, Shortcut>): any;
};

interface OkButtonProps {
  calendarDate: any;
  children: React.ReactNode;
  disableOkBtn?: (value: any) => boolean;
  onOk?: (event: React.MouseEvent) => void;
}

const OkButton = ({ disableOkBtn, calendarDate, onOk, children }: OkButtonProps) => {
  const disabled = disableOkBtn?.(calendarDate);

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
const Toolbar: ToolbarComponent = React.forwardRef<HTMLDivElement, ToolbarProps>((props, ref) => {
  const {
    className,
    classPrefix = 'picker-toolbar',
    calendarDate,
    ranges,
    locale,
    hideOkBtn,
    disableOkBtn,
    disableShortcut,
    onOk,
    onShortcutClick,
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
        disableShortcut={disableShortcut}
        onShortcutClick={onShortcutClick}
        data-testid="daterange-predefined-bottom"
      />
      <div className={prefix('right')}>
        {!hideOkBtn && (
          <OkButton disableOkBtn={disableOkBtn} calendarDate={calendarDate} onOk={onOk}>
            {locale?.ok}
          </OkButton>
        )}
      </div>
    </Stack>
  );
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;
