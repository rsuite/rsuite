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
  showCancelButton?: boolean;
  severity?: 'info' | 'success' | 'warning' | 'error';
  defaultValue?: string;
  validate?: (value: string) => [isValid: boolean, errorMessage?: string];
  onClose?: (result?: any) => void;
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
    showCancelButton,
    severity,
    defaultValue = '',
    validate,
    onClose,
    ...rest
  } = propsWithDefaults;
  const [isOpen, setIsOpen] = useState(true);
  const [validationError, setValidationError] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputValue = useRef(defaultValue);

  useEffect(() => {
    if (type === 'prompt' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [type]);

  const handleClose = useCallback(
    (result?: any) => {
      setIsOpen(false);

      setTimeout(() => {
        onClose?.(result);
      }, 300);
    },
    [onClose]
  );

  const handleConfirm = useCallback(() => {
    if (type === 'prompt') {
      const value = inputValue.current;
      if (validate) {
        const [isValid, errorMessage] = validate(value);
        if (!isValid) {
          setValidationError(errorMessage || 'Invalid input');
          return;
        }
      }
      handleClose(value);
    } else {
      handleClose(true);
    }
  }, [type, inputValue, validate, handleClose]);

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleConfirm();
      }
    },
    [handleConfirm]
  );

  return (
    <Modal ref={ref} open={isOpen} size="xs" centered backdrop="static" {...rest}>
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
                onChange={value => {
                  inputValue.current = value;
                  if (validationError) setValidationError(undefined);
                }}
                onKeyDown={handleInputKeyDown}
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
