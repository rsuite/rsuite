import React, { useCallback, useRef, useEffect, useState } from 'react';
import Modal, { ModalProps } from '../Modal';
import Button from '../Button';
import Input from '../Input';
import Text from '../Text';
import { forwardRef } from '@/internals/utils';
import { VStack } from '../Stack';
import { useCustom } from '@/internals/hooks';
import type { Color } from '@/internals/types';

export interface DialogProps extends ModalProps {
  type: 'alert' | 'confirm' | 'prompt';
  title?: React.ReactNode;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  severity?: 'info' | 'success' | 'warning' | 'error';
  defaultValue?: string;
  validate?: (value: string) => [isValid: boolean, errorMessage?: string];
  onClose?: (result?: any) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
}

const severityMap: Record<'info' | 'success' | 'warning' | 'error', Color> = {
  info: 'blue',
  success: 'green',
  warning: 'orange',
  error: 'red'
};

const Dialog = forwardRef((props: DialogProps, ref) => {
  const { getLocale, propsWithDefaults } = useCustom('Dialog', props);
  const locale = getLocale('Dialog');
  const {
    type,
    title = type === 'alert' ? locale.alert : locale.confirm,
    content,
    okText = locale.ok,
    cancelText = locale.cancel,
    severity,
    defaultValue = '',
    validate,
    onClose,
    onKeyDown,
    ...rest
  } = propsWithDefaults;
  const [isOpen, setIsOpen] = useState(true);
  const [validationError, setValidationError] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputValue = useRef(defaultValue);
  const isClosing = useRef(false);
  const showCancelButton = type === 'confirm' || type === 'prompt';

  useEffect(() => {
    if (type === 'prompt' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [type]);

  const handleCancel = useCallback(
    (result?: any) => {
      if (isClosing.current) return;

      isClosing.current = true;
      setIsOpen(false);

      setTimeout(() => {
        onClose?.(result);
      }, 300);
    },
    [onClose]
  );

  const handleConfirm = useCallback(() => {
    if (isClosing.current) return;

    if (type === 'prompt') {
      const value = inputValue.current;
      if (validate) {
        const [isValid, errorMessage] = validate(value);
        if (!isValid) {
          setValidationError(errorMessage || 'Invalid input');
          return;
        }
      }
      handleCancel(value);
    } else {
      handleCancel(true);
    }
  }, [type, inputValue, validate, handleCancel]);

  const handleClose = useCallback(() => handleCancel(false), [handleCancel]);

  const handleModalClose = useCallback(
    (event?: React.SyntheticEvent) => {
      const keyboardEvent = (event?.nativeEvent ?? event) as KeyboardEvent | undefined;

      if (
        keyboardEvent?.key === 'Escape' &&
        (keyboardEvent.defaultPrevented ||
          keyboardEvent.isComposing ||
          keyboardEvent.keyCode === 229)
      ) {
        return;
      }

      handleClose();
    },
    [handleClose]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(event);

      if (
        event.key !== 'Enter' ||
        event.defaultPrevented ||
        event.nativeEvent.isComposing ||
        event.keyCode === 229 ||
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      // Let buttons and custom content handle their own keyboard interactions.
      if (event.target !== event.currentTarget && event.target !== inputRef.current) {
        return;
      }

      event.preventDefault();
      handleConfirm();
    },
    [handleConfirm, onKeyDown]
  );

  const handlePromptInputChange = useCallback(
    (value: string) => {
      inputValue.current = value;
      if (validationError) setValidationError(undefined);
    },
    [validationError]
  );

  return (
    <Modal
      ref={ref}
      open={isOpen}
      size="xs"
      backdrop="static"
      {...rest}
      onClose={handleModalClose}
      onKeyDown={handleKeyDown}
    >
      <Modal.Header closeButton={false}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VStack>
          {type === 'prompt' ? (
            <>
              <label htmlFor="rs-prompt-input">{content}</label>
              <Input
                w="100%"
                required
                ref={inputRef}
                id="rs-prompt-input"
                defaultValue={defaultValue}
                onChange={handlePromptInputChange}
              />
              {validationError && <Text color="red">{validationError}</Text>}
            </>
          ) : (
            content
          )}
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        {showCancelButton && (
          <Button onClick={handleClose} appearance="subtle">
            {cancelText}
          </Button>
        )}
        <Button
          appearance="primary"
          onClick={handleConfirm}
          color={severity ? severityMap[severity] : undefined}
        >
          {okText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default Dialog;
