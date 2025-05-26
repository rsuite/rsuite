import React, { useCallback, useRef, useContext, useEffect } from 'react';
import canUseDOM from 'dom-lib/canUseDOM';
import Dialog from './Dialog';
import { CustomContext } from '@/internals/Provider/CustomContext';
import type { DialogContainerInstance } from './DialogContainer';
import type { AlertOptions, ConfirmOptions, OpenOptions, PromptOptions } from './types';

/**
 * Options for creating a dialog
 */
interface DialogOptions {
  /** Custom dialog component */
  as?: React.ComponentType<any>;

  /** Type of the dialog */
  type: 'alert' | 'confirm' | 'prompt' | 'custom';

  /** Title of the dialog */
  title?: React.ReactNode;

  /** Text for OK button */
  okText?: string;

  /** Text for Cancel button */
  cancelText?: string;

  /** Whether to show the cancel button */
  showCancelButton: boolean;

  /** Default value for prompt dialogs */
  defaultValue?: string;

  /** Validation function for prompt input */
  validate?: (value: string) => [isValid: boolean, errorMessage?: string];

  /** Severity of the dialog */
  severity?: 'info' | 'success' | 'warning' | 'error';

  /** Callback when dialog is closed */
  onClose?: (result?: any) => void;

  /** Additional props to pass to the custom dialog component */
  props?: any;
}

const useDialogContainer = () => {
  const context = useContext(CustomContext);
  const dialogContainerRef = useRef<DialogContainerInstance>(null);

  useEffect(() => {
    if (canUseDOM && !context?.dialogContainer) {
      console.warn(
        'Warning: useDialog is being used outside of a CustomProvider. ' +
          'Please wrap your application with <CustomProvider> to ensure proper functionality.'
      );
    }
  }, [context]);

  useEffect(() => {
    if (canUseDOM && context?.dialogContainer?.current) {
      dialogContainerRef.current = context.dialogContainer.current;
    }
  }, [context]);

  return dialogContainerRef;
};

/**
 * A hook that provides methods to show dialogs.
 * @see https://rsuitejs.com/components/use-dialog
 */
export function useDialog() {
  const dialogContainerRef = useDialogContainer();

  const createDialog = useCallback((content: React.ReactNode, options: DialogOptions) => {
    const { type, title, okText, cancelText, showCancelButton, severity, defaultValue, validate } =
      options;

    let isDialogClosed = false;
    let dialogKey: string | number | null = null;

    return new Promise<any>(resolve => {
      const handleClose = (result?: any) => {
        if (isDialogClosed) {
          return;
        }

        isDialogClosed = true;

        if (canUseDOM && dialogContainerRef.current && dialogKey !== null) {
          dialogContainerRef.current.removeDialog(dialogKey);
        }

        resolve(result);
      };

      let dialogComponent: React.ReactNode;

      if (options.type === 'custom' && options.as) {
        const { as: Component, props } = options;
        dialogComponent = <Component onClose={handleClose} {...props} />;
      } else {
        dialogComponent = (
          <Dialog
            type={type as 'alert' | 'confirm' | 'prompt'}
            title={title}
            content={content}
            okText={okText}
            cancelText={cancelText}
            showCancelButton={showCancelButton}
            onClose={handleClose}
            defaultValue={defaultValue || ''}
            severity={severity}
            validate={validate}
          />
        );
      }

      if (canUseDOM && dialogContainerRef.current) {
        dialogKey = dialogContainerRef.current.renderDialog(dialogComponent);
      }
    });
  }, []);

  const alert = useCallback(
    (message: React.ReactNode, options: AlertOptions = {}) => {
      return createDialog(message, {
        ...options,
        type: 'alert',
        showCancelButton: false
      });
    },
    [createDialog]
  );

  const confirm = useCallback(
    (message: React.ReactNode, options: ConfirmOptions = {}) => {
      return createDialog(message, {
        ...options,
        type: 'confirm',
        showCancelButton: true
      }) as Promise<boolean>;
    },
    [createDialog]
  );

  const prompt = useCallback(
    (message: React.ReactNode, options: PromptOptions = {}) => {
      return createDialog(message, {
        ...options,
        type: 'prompt',
        showCancelButton: true
      }) as Promise<string>;
    },
    [createDialog]
  );

  const open = useCallback(
    <P extends object>(
      as: React.ComponentType<P & { onClose: (result?: any) => void }>,
      payload?: P,
      options: OpenOptions = {}
    ) => {
      return createDialog(null, {
        ...options,
        as,
        type: 'custom',
        props: { payload },
        showCancelButton: false
      });
    },
    [createDialog]
  );

  return {
    alert,
    confirm,
    prompt,
    open
  };
}

export default useDialog;
