import React, { useRef, useMemo } from 'react';
import ToggleButton, { ToggleButtonProps } from './ToggleButton';
import { useClassNames, mergeRefs, useEventCallback } from '../utils';
import { RsRefForwardingComponent, TypeAttributes } from '../@types/common';
import Plaintext from '../Plaintext';
import useToggleCaret from '../utils/useToggleCaret';
import { IconProps } from '@rsuite/icons/lib/Icon';
import Stack from '../Stack';
import PickerIndicator from './PickerIndicator';
import PickerLabel from './PickerLabel';
import useCombobox from './hooks/useCombobox';

type ValueType = string | number;

export interface PickerToggleProps extends ToggleButtonProps {
  active?: boolean;
  hasValue?: boolean;
  cleanable?: boolean;
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
  placement?: TypeAttributes.Placement;
  readOnly?: boolean;
  plaintext?: boolean;
  tabIndex?: number;
  /**
   * Whether to display an loading indicator on toggle button
   */
  loading?: boolean;
  label?: React.ReactNode;
  name?: string;
  inputValue?: ValueType | ValueType[];
  focusItemValue?: ValueType | null;
  onClean?: (event: React.MouseEvent) => void;
}

const PickerToggle: RsRefForwardingComponent<typeof ToggleButton, PickerToggleProps> =
  React.forwardRef((props: PickerToggleProps, ref) => {
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
      tabIndex = 0,
      inputValue: inputValueProp,
      focusItemValue,
      onClean,
      placement = 'bottomStart',
      caretComponent,
      caretAs = caretComponent,
      label,
      name,
      ...rest
    } = props;

    const combobox = useRef<HTMLDivElement>(null);
    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const { id, labelId, popupType } = useCombobox();

    const inputValue = useMemo(() => {
      if (typeof inputValueProp === 'number' || typeof inputValueProp === 'string') {
        return inputValueProp;
      } else if (Array.isArray(inputValueProp)) {
        return inputValueProp.join(',');
      }

      return '';
    }, [inputValueProp]);

    const classes = merge(className, withClassPrefix({ active }));

    const handleClean = useEventCallback((event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      onClean?.(event);
      combobox.current?.focus();
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
        role="combobox"
        id={id}
        aria-haspopup={popupType}
        aria-expanded={active}
        aria-disabled={disabled}
        aria-controls={`${id}-${popupType}`}
        aria-labelledby={labelId}
        aria-describedby={`${id}-describe`}
        aria-activedescendant={active && focusItemValue ? `${id}-opt-${focusItemValue}` : undefined}
        {...rest}
        ref={mergeRefs(combobox, ref)}
        disabled={disabled}
        tabIndex={disabled ? undefined : tabIndex}
        className={classes}
      >
        <Stack>
          {label && (
            <Stack.Item>
              <PickerLabel as="span" className={prefix('label')} id={labelId}>
                {label}
              </PickerLabel>
            </Stack.Item>
          )}
          <Stack.Item grow={1} style={{ overflow: 'hidden' }}>
            <input
              readOnly
              aria-hidden={true}
              tabIndex={-1}
              data-testid="picker-toggle-input"
              name={name}
              value={inputValue}
              className={prefix('textbox', 'read-only')}
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
