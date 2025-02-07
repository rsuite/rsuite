import React, { useRef, useState, useImperativeHandle } from 'react';
import Button, { ButtonProps } from '../Button';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import type { UploaderLocale } from '../locales';

export interface UploadTriggerProps extends ButtonProps {
  name?: string;
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  draggable?: boolean;
  accept?: string;
  locale?: UploaderLocale;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onDragEnter?: React.DragEventHandler<HTMLInputElement>;
  onDragLeave?: React.DragEventHandler<HTMLInputElement>;
  onDragOver?: React.DragEventHandler<HTMLInputElement>;
  onDrop?: React.DragEventHandler<HTMLInputElement>;
}

export interface UploadTriggerInstance {
  clearInput: () => void;
}

const UploadTrigger = forwardRef<typeof Button, UploadTriggerProps>((props, ref) => {
  const {
    as: Component = Button,
    name,
    accept,
    multiple,
    disabled,
    readOnly,
    children,
    classPrefix = 'uploader-trigger',
    className,
    draggable,
    locale,
    onChange,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    ...rest
  } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix({ disabled, customize: children, 'drag-over': dragOver })
  );

  const handleClick = useEventCallback(() => {
    inputRef.current?.click();
  });

  const handleClearInput = useEventCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  });

  const handleDragEnter = useEventCallback(event => {
    if (draggable) {
      event.preventDefault();
      setDragOver(true);
    }
    onDragEnter?.(event);
  });

  const handleDragLeave = useEventCallback(event => {
    if (draggable) {
      event.preventDefault();
      setDragOver(false);
    }
    onDragLeave?.(event);
  });

  const handleDragOver = useEventCallback(event => {
    draggable && event.preventDefault();
    onDragOver?.(event);
  });

  const handleDrop = useEventCallback(event => {
    if (draggable) {
      event.preventDefault();
      setDragOver(false);
      onChange?.(event);
    }
    onDrop?.(event);
  });

  useImperativeHandle(ref, () => ({
    root: rootRef.current,
    clearInput: handleClearInput
  }));

  const buttonProps: ButtonProps = {
    ...rest,
    disabled,
    className: prefix('btn')
  };

  if (!disabled && !readOnly) {
    buttonProps.onClick = handleClick;
    buttonProps.onDragEnter = handleDragEnter;
    buttonProps.onDragLeave = handleDragLeave;
    buttonProps.onDragOver = handleDragOver;
    buttonProps.onDrop = handleDrop;
  }

  const trigger = children ? (
    React.cloneElement(React.Children.only(children as any), buttonProps)
  ) : (
    <Component {...buttonProps}>{locale?.upload}</Component>
  );

  return (
    <div ref={rootRef} className={classes}>
      <input
        type="file"
        name={name}
        multiple={multiple}
        disabled={disabled}
        readOnly={readOnly}
        accept={accept}
        ref={inputRef}
        onChange={onChange}
      />
      {trigger}
    </div>
  );
});

UploadTrigger.displayName = 'UploadTrigger';

export default UploadTrigger;
