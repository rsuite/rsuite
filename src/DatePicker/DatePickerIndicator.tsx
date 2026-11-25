import React from 'react';
import Icon from '@rsuite/icons/Icon';
import InputGroup from '../InputGroup';
import { PickerIndicator } from '@/internals/Picker';
import { useStyles } from '@/internals/hooks';

interface DatePickerIndicatorProps
  extends Omit<React.ComponentProps<typeof PickerIndicator>, 'size'> {
  size?: React.ComponentProps<typeof InputGroup.Button>['size'];
  openButton?: {
    ref: React.Ref<HTMLButtonElement>;
    label: string;
    expanded: boolean;
    controls: string;
    disabled: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  };
}

/** Keeps a dedicated opening control available alongside the clear control. */
const DatePickerIndicator = ({ openButton, ...props }: DatePickerIndicatorProps) => {
  const { prefix } = useStyles('picker');
  if (!openButton) return <PickerIndicator {...props} />;

  const { ref, label, expanded, controls, disabled, onClick } = openButton;
  return (
    <>
      {(props.loading || props.showCleanButton) && <PickerIndicator {...props} caretAs={null} />}
      {props.caretAs && (
        <InputGroup.Button
          ref={ref}
          type="button"
          size={props.size}
          className={prefix('open-button')}
          disabled={disabled}
          aria-label={label}
          aria-haspopup="dialog"
          aria-expanded={expanded}
          aria-controls={expanded ? controls : undefined}
          onClick={onClick}
        >
          <Icon as={props.caretAs} className={prefix('caret-icon')} aria-hidden />
        </InputGroup.Button>
      )}
    </>
  );
};

export default DatePickerIndicator;
