import React, { useRef } from 'react';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import Plaintext from '@/internals/Plaintext';
import useCustomConfig from '@/internals/hooks/useCustomConfig';
import {
  useStyles,
  useUniqueId,
  useControlled,
  useEventCallback,
  useIsomorphicLayoutEffect
} from '@/internals/hooks';
import {
  PickerToggle,
  PickerToggleTrigger,
  PickerPopup,
  usePickerRef,
  triggerPropKeys,
  type PickerHandle,
  type PositionChildProps
} from '@/internals/Picker';
import { mergeRefs } from '@/internals/utils';
import enGB from '../locales/en_GB';
import ColorPickerPanel from './ColorPickerPanel';
import ColorSwatch from './ColorSwatch';
import useColorPickerState from './useColorPickerState';
import useNativeFormReset from './useNativeFormReset';
import { formatColor, parseColor } from './colorModel';
import type { ColorPickerProps } from './types';

/** Select an sRGB color using a color area, channel controls, text or presets. */
const ColorPicker = React.forwardRef<PickerHandle, ColorPickerProps>((props, ref) => {
  const { propsWithDefaults, rtl } = useCustomConfig('ColorPicker', props);
  const {
    as,
    appearance = 'default',
    block,
    className,
    classPrefix = 'color-picker',
    cleanable = true,
    defaultOpen = false,
    disabled,
    disableAlpha,
    form,
    id: idProp,
    label,
    locale,
    name,
    open: openProp,
    placeholder,
    placement = 'bottomStart',
    plaintext,
    popupClassName,
    popupStyle,
    presets,
    readOnly,
    responsive = true,
    size = 'md',
    style,
    toggleAs,
    onOpen,
    onClose,
    onEntered,
    onKeyDown,
    renderExtraFooter,
    ...rest
  } = propsWithDefaults;
  const state = useColorPickerState(propsWithDefaults);
  const { value, color, format, locked, changeColor, changeFormat, clear, reset } = state;
  const nativeInput = useNativeFormReset(reset);
  const { trigger, root, target, overlay } = usePickerRef(ref);
  const [open, setOpen] = useControlled(openProp, defaultOpen);
  const active = Boolean(open && !locked);
  const restoreFocus = useRef(false);
  const id = useUniqueId('rs-color-picker-', idProp);
  const { withPrefix, prefix, merge } = useStyles(classPrefix);
  const labels = { ...enGB.ColorPicker, ...locale };
  const selected = parseColor(value);
  const hasValue = value !== null && value !== '';

  const handleOpen = useEventCallback(() => {
    if (locked) return;
    setOpen(true);
    onOpen?.();
  });
  const handleClose = useEventCallback(() => {
    setOpen(false);
    onClose?.();
  });
  const closeFromPanel = useEventCallback(() => {
    restoreFocus.current = true;
    trigger.current?.close();
  });
  useIsomorphicLayoutEffect(() => {
    if (!active && restoreFocus.current) {
      restoreFocus.current = false;
      if (!disabled) target.current?.focus();
    }
  }, [active, disabled, target]);

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || locked) return;
    if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      trigger.current?.open();
    } else if (event.key === 'Escape' && active) {
      event.preventDefault();
      closeFromPanel();
    } else if (event.key === 'Delete' && cleanable) {
      event.preventDefault();
      clear(event);
    }
  });

  const hiddenInput = (
    <input
      ref={nativeInput}
      type="hidden"
      name={name}
      form={form}
      value={value ?? ''}
      disabled={disabled}
    />
  );

  if (plaintext) {
    return (
      <>
        <Plaintext ref={root} className={className} style={style} localeKey="notSelected">
          {value}
        </Plaintext>
        {hiddenInput}
      </>
    );
  }

  const renderPopup = (position: PositionChildProps, speakerRef: React.Ref<HTMLElement>) => (
    <PickerPopup
      ref={mergeRefs(overlay, speakerRef)}
      target={trigger}
      className={merge(position.className, popupClassName, prefix('popup'))}
      style={popupStyle}
      onKeyDown={event => {
        if (event.key === 'Escape' && !event.defaultPrevented) {
          event.preventDefault();
          event.stopPropagation();
          closeFromPanel();
        }
      }}
    >
      <ColorPickerPanel
        color={color}
        value={value}
        format={format}
        disableAlpha={disableAlpha}
        disabled={locked}
        cleanable={cleanable}
        rtl={rtl}
        presets={presets}
        locale={labels}
        onChange={changeColor}
        onFormatChange={changeFormat}
        onClear={clear}
        onClose={closeFromPanel}
      />
      {renderExtraFooter?.()}
    </PickerPopup>
  );

  return (
    <PickerToggleTrigger
      as={as}
      id={id}
      pickerType="color"
      popupType="dialog"
      responsive={responsive}
      block={block}
      disabled={disabled}
      appearance={appearance}
      ariaLabel={rest['aria-label'] || labels.dialogTitle}
      ariaLabelledby={rest['aria-labelledby']}
      triggerProps={{
        ...pick(propsWithDefaults, triggerPropKeys),
        preventOverflow: propsWithDefaults.preventOverflow ?? true,
        open: active,
        onOpen: handleOpen,
        onClose: handleClose,
        onEntered: (node: HTMLElement) => {
          overlay.current
            ?.querySelector<HTMLInputElement>('input:not([type="hidden"]),button')
            ?.focus();
          onEntered?.(node);
        }
      }}
      ref={trigger}
      placement={placement}
      speaker={renderPopup}
      rootRef={root}
      style={style}
      size={size}
      className={merge(className, withPrefix())}
    >
      <PickerToggle
        {...omit(rest, [
          'value',
          'defaultValue',
          'format',
          'defaultFormat',
          'onChange',
          'onClean',
          'onFormatChange'
        ])}
        ref={target}
        as={toggleAs}
        appearance={appearance}
        label={label}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        cleanable={cleanable && !locked}
        hasValue={hasValue}
        inputValue={value ?? ''}
        active={active}
        placement={placement}
        aria-label={
          rest['aria-label'] ?? (label || rest['aria-labelledby'] ? undefined : labels.placeholder)
        }
        onClean={clear}
        onKeyDown={handleKeyDown}
      >
        {hasValue ? (
          <span className={prefix('selection')}>
            <ColorSwatch color={selected ? formatColor(selected, 'rgb') : undefined} />
            <span>{value}</span>
          </span>
        ) : (
          (placeholder ?? labels.placeholder)
        )}
      </PickerToggle>
      {hiddenInput}
    </PickerToggleTrigger>
  );
});

ColorPicker.displayName = 'ColorPicker';
export default ColorPicker;
