import type { ReactNode } from 'react';

export interface AlertOptions {
  /** Title of the dialog */
  title?: ReactNode;

  /** Text for OK button */
  okText?: string;

  /** Callback when dialog is closed */
  onClose?: () => void;
}

export interface ConfirmOptions extends Omit<AlertOptions, 'onClose'> {
  /** Severity of the dialog */
  severity?: 'info' | 'success' | 'warning' | 'error';
  /** Text for Cancel button */
  cancelText?: string;
  /** Callback with the confirmation result when dialog is closed */
  onClose?: (result: boolean) => void;
}

export interface PromptOptions extends Omit<AlertOptions, 'onClose'> {
  /** Default value for the input */
  defaultValue?: string;
  /** Text for Cancel button */
  cancelText?: string;
  /** Validate function for prompt input */
  validate?: (value: string) => [isValid: boolean, errorMessage?: string];
  /** Callback with the input value, or false when the dialog is cancelled */
  onClose?: (result: string | false) => void;
}

export interface OpenOptions<T = any> {
  /** Callback when dialog is closed */
  onClose?: (result?: T) => void;
}

export interface DialogInstance<T = any> {
  key: number;
  component: ReactNode;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}
