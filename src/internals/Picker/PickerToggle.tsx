import React, { useRef, useMemo } from 'react';
import ToggleButton, { ToggleButtonProps } from './ToggleButton';
import PickerIndicator from './PickerIndicator';
import PickerLabel from './PickerLabel';
import Plaintext from '../Plaintext';
import Stack from '../../Stack';
import useCombobox from './hooks/useCombobox';
import getOptionId from './getOptionId';
import { useStyles, useCustom, useEventCallback, useToggleCaret } from '@/internals/hooks';
import { forwardRef, mergeRefs } from '@/internals/utils';
import { triggerPropKeys } from './PickerToggleTrigger';
import type { IconProps } from '@rsuite/icons/Icon';
import type { Placement, OptionValue } from '@/internals/types';
import { isNil, omit, pick } from 'lodash';

export interface PickerToggleProps<T = OptionValue> extends ToggleButtonProps {
  active?: boolean;
  hasValue?: boolean;
  cleanable?: boolean;
  countable?: boolean;
  caret?: boolean;
  /**
   * Custom caret component
   * @deprecated Use `caretAs` instead
   */
  caretComponent?: React.FC<IconProps>;
  /**
   * Custom caret component
   */
  caretAs?: React.ElementType;
  disabled?: boolean;
  placement?: Placement;
  readOnly?: boolean;
  plaintext?: boolean;
  tabIndex?: number;
  /**
   * Whether to display an loading indicator on toggle button
   */
  loading?: boolean;
  label?: React.ReactNode;
  name?: string;
  inputValue?: T | T[];
  focusItemValue?: T | null;
  onClean?: (event: React.MouseEvent) => void;
  /** Restore focus to this picker's editable input after clearing. */
  onCleanFocus?: (event: React.MouseEvent) => void;
  inputAriaProps?: React.AriaAttributes & { role?: React.AriaRole };
}

const PickerToggle = forwardRef<typeof ToggleButton, PickerToggleProps>((props, ref) => {
  const {
    active,
    as: Component = ToggleButton,
    classPrefix = 'picker-toggle',
    children,
    caret = true,
    className,
    disabled,
    readOnly,
    plaintext,
    hasValue,
    loading = false,
    cleanable,
    countable,
    tabIndex = 0,
    inputValue: inputValueProp,
    focusItemValue,
    placement = 'bottomStart',
    caretComponent,
    caretAs = caretComponent,
    label,
    name,
    size,
    onClean,
    onCleanFocus,
    inputAriaProps,
    ...rest
  } = props;

  const combobox = useRef<HTMLDivElement>(null);
  const { withPrefix, merge, prefix } = useStyles(classPrefix);
  const { id, labelId, popupType, breakpoint, inputCombobox } = useCombobox();
  const { getLocale } = useCustom();
  const inlineCombobox = inputCombobox && breakpoint !== 'xs';
  const dialogPopup = inputCombobox && breakpoint === 'xs';
  const customOpener = inlineCombobox && Component !== ToggleButton;
  const toggleWidget = !inlineCombobox || customOpener;

  const inputValue = useMemo(() => {
    if (typeof inputValueProp === 'number' || typeof inputValueProp === 'string') {
      return inputValueProp;
    } else if (Array.isArray(inputValueProp)) {
      return inputValueProp.join(',');
    }

    return '';
  }, [inputValueProp]);

  const classes = merge(className, withPrefix());

  const handleClean = useEventCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClean?.(event);
    if (onCleanFocus) onCleanFocus(event);
    else combobox.current?.focus();
  });

  const ToggleCaret = useToggleCaret(placement);
  const Caret = caretAs ?? ToggleCaret;

  if (plaintext) {
    return (
      <Plaintext ref={ref} localeKey="notSelected">
        {hasValue ? children : null}
      </Plaintext>
    );
  }

  const showCleanButton = cleanable && hasValue && !readOnly;

  return (
    <Component
      role={inlineCombobox ? undefined : 'combobox'}
      id={inlineCombobox ? `${id}-toggle` : id}
      type={customOpener ? 'button' : undefined}
      size={size}
      aria-haspopup={toggleWidget ? (dialogPopup ? 'dialog' : popupType) : undefined}
      aria-expanded={toggleWidget ? active : undefined}
      aria-disabled={disabled}
      aria-controls={toggleWidget && id ? `${id}-${dialogPopup ? 'dialog' : popupType}` : undefined}
      aria-label={customOpener && !labelId ? getLocale('Combobox').placeholder : undefined}
      aria-labelledby={toggleWidget ? labelId : undefined}
      aria-describedby={toggleWidget && children && id ? `${id}-describe` : undefined}
      aria-activedescendant={
        !inputCombobox && active && !isNil(focusItemValue)
          ? getOptionId(id, focusItemValue)
          : undefined
      }
      data-has-value={hasValue}
      data-cleanable={cleanable}
      data-countable={countable}
      data-size={size}
      data-readonly={readOnly}
      data-active={active}
      ref={mergeRefs(combobox, ref)}
      disabled={disabled}
      tabIndex={disabled ? undefined : inlineCombobox ? -1 : tabIndex}
      className={classes}
      {...(inlineCombobox
        ? customOpener
          ? pick(inputAriaProps, ['aria-label', 'aria-labelledby'])
          : undefined
        : inputAriaProps)}
      {...omit(rest, triggerPropKeys)}
    >
      <Stack className={prefix('stack')}>
        {label && (
          <Stack.Item>
            <PickerLabel as="span" className={prefix('label')} id={labelId}>
              {label}
            </PickerLabel>
          </Stack.Item>
        )}
        <Stack.Item grow={1} overflow="hidden">
          <input
            readOnly
            aria-hidden={true}
            tabIndex={-1}
            data-testid="picker-toggle-input"
            name={name}
            value={inputValue}
            className={prefix('textbox')}
            style={{ pointerEvents: 'none' }}
          />
          {children ? (
            <span
              className={prefix(hasValue ? 'value' : 'placeholder')}
              id={`${id}-describe`}
              data-testid="picker-describe"
            >
              {children}
            </span>
          ) : null}
        </Stack.Item>
        <Stack.Item className={prefix`indicator`}>
          <PickerIndicator
            size={size}
            as={React.Fragment}
            loading={loading}
            caretAs={caret ? Caret : null}
            onClose={handleClean}
            showCleanButton={showCleanButton}
          />
        </Stack.Item>
      </Stack>
    </Component>
  );
});

PickerToggle.displayName = 'PickerToggle';

export default PickerToggle;
