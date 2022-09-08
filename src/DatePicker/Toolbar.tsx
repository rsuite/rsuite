import React from 'react';
import PropTypes from 'prop-types';
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
  hide?: boolean;
  disabledOkBtn?: (value: any) => boolean;
  onOk?: (event: React.MouseEvent) => void;
}

const SubmitButton = ({ hide, disabledOkBtn, calendarDate, onOk, children }: SubmitButtonProps) => {
  if (hide) {
    return null;
  }

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
const Toolbar: ToolbarComponent = React.forwardRef<HTMLDivElement, ToolbarProps>((props, ref) => {
  const {
    className,
    classPrefix = 'picker-toolbar',
    disabledOkBtn,
    disabledShortcut,
    hideOkBtn,
    onOk,
    onClickShortcut,
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
        onClickShortcut={onClickShortcut}
      />
      <div className={prefix('right')}>
        <SubmitButton
          disabledOkBtn={disabledOkBtn}
          hide={hideOkBtn}
          calendarDate={calendarDate}
          onOk={onOk}
        >
          {locale?.ok}
        </SubmitButton>
      </div>
    </Stack>
  );
});

Toolbar.displayName = 'Toolbar';
Toolbar.propTypes = {
  ranges: PropTypes.array,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  calendarDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date))
  ]).isRequired,
  onClickShortcut: PropTypes.func,
  onOk: PropTypes.func,
  disabledShortcut: PropTypes.func,
  disabledOkBtn: PropTypes.func,
  hideOkBtn: PropTypes.bool
};

export default Toolbar;
