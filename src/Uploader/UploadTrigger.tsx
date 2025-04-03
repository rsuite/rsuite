import React, { useRef, useState, useImperativeHandle } from 'react';
import Button, { ButtonProps } from '../Button';
import { useStyles, useEventCallback } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import classNames from 'classnames';
import type { UploaderLocale } from '../locales';

export interface UploadTriggerProps extends ButtonProps {
  children?: React.ReactElement<any>;
  className?: string;
  disabled?: boolean;
  name?: string;
  multiple?: boolean;
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
  const { withPrefix, prefix } = useStyles(classPrefix);
  const classes = classNames(
    className,
    withPrefix({ disabled, customize: children, 'drag-over': dragOver })
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

  // Prepare button props with event handlers conditionally applied
  const buttonProps: Partial<ButtonProps> = {
    ...rest,
    disabled,
    className: prefix('btn'),
    // Only add event handlers if component is interactive
    ...(!disabled &&
      !readOnly && {
        onClick: handleClick,
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onDrop: handleDrop
      })
  };

  const trigger = children ? (
    React.cloneElement(children, {
      ...buttonProps,
      className: classNames(children.props?.className, prefix('btn'))
    })
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
