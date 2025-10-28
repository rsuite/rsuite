import React, { useCallback, useContext, useEffect } from 'react';
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

  useEffect(() => {
    if (canUseDOM && !context?.dialogContainer) {
      console.warn(
        'Warning: useDialog is being used outside of a CustomProvider. ' +
          'Please wrap your application with <CustomProvider> to ensure proper functionality.'
      );
    }
  }, [context?.dialogContainer]);

  // Return the ref from context directly instead of copying to a local ref
  // This ensures we always use the latest mounted DialogContainer instance
  return context?.dialogContainer || { current: null };
};

/**
 * A hook that provides methods to show dialogs.
 * @see https://rsuitejs.com/components/use-dialog
 */
export function useDialog() {
  const dialogContainerRef = useDialogContainer();

  const waitForContainer = useCallback(async () => {
    if (!canUseDOM) {
      return null;
    }

    if (dialogContainerRef.current) {
      return dialogContainerRef.current;
    }

    const timeoutAt = Date.now() + 2000;

    return new Promise<DialogContainerInstance | null>(resolve => {
      const checkContainerReady = () => {
        if (dialogContainerRef.current) {
          resolve(dialogContainerRef.current);
          return;
        }

        if (Date.now() > timeoutAt) {
          resolve(null);
          return;
        }

        requestAnimationFrame(checkContainerReady);
      };

      checkContainerReady();
    });
  }, [dialogContainerRef]);

  const createDialog = useCallback(
    (content: React.ReactNode, options: DialogOptions) => {
      const { type, title, okText, cancelText, severity, defaultValue, validate } = options;

      return new Promise<any>(resolve => {
        waitForContainer().then(container => {
          if (!canUseDOM || !container) {
            resolve(undefined);
            return;
          }

          let isDialogClosed = false;
          let dialogKey: string | number | null = null;

          const handleClose = (result?: any) => {
            if (isDialogClosed) {
              return;
            }

            isDialogClosed = true;

            if (dialogKey !== null) {
              container.removeDialog(dialogKey);
            }

            resolve(result);
          };

          let dialogComponent: React.ReactNode;

          if (type === 'custom' && options.as) {
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
                onClose={handleClose}
                defaultValue={defaultValue || ''}
                severity={severity}
                validate={validate}
              />
            );
          }

          dialogKey = container.renderDialog(dialogComponent);
        });
      });
    },
    [waitForContainer]
  );

  const alert = useCallback(
    (message: React.ReactNode, options?: AlertOptions) => {
      return createDialog(message, { ...options, type: 'alert' });
    },
    [createDialog]
  );

  const confirm = useCallback(
    (message: React.ReactNode, options?: ConfirmOptions) => {
      return createDialog(message, { ...options, type: 'confirm' });
    },
    [createDialog]
  );

  const prompt = useCallback(
    (message: React.ReactNode, options: PromptOptions = {}) => {
      return createDialog(message, { ...options, type: 'prompt' });
    },
    [createDialog]
  );

  const open = useCallback(
    <P extends object>(
      as: React.ComponentType<P & { onClose: (result?: any) => void }>,
      payload?: P,
      options?: OpenOptions
    ) => {
      return createDialog(null, { ...options, as, type: 'custom', props: { payload } });
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
