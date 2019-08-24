import * as React from 'react';

export interface AlertProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** The distance from the top of the message box */
  top?: number;

  /** message box duration (Unit: milliseconds) */
  duration?: number;

  /** The parent container of Alert */
  getContainer?: () => HTMLElement;
}

export interface AlertAPI {
  /** A message may be formatted to display a positive message */
  success(content: string | React.ReactElement, duration?: number, onClose?: () => void): void;

  /** A message may be formatted to display a negative message */
  error(content: string | React.ReactElement, duration?: number, onClose?: () => void): void;

  /** A message may be formatted to display information */
  info(content: string | React.ReactElement, duration?: number, onClose?: () => void): void;

  /** A message may be formatted to display warning messages */
  warning(content: string | React.ReactElement, duration?: number, onClose?: () => void): void;

  /** Used to configure where the message is displayed */
  config(options: AlertProps): void;
}

declare const Alert: AlertAPI;

export default Alert;
