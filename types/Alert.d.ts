export interface AlertConfigProps {
  top?: number;
  duration?: number;
  getContainer?: () => HTMLElement;
}

export interface AlertAPI {
  /** A message may be formatted to display a positive message */
  success(content: string, duration?: number, onClose?: () => void): void;

  /** A message may be formatted to display a negative message */
  error(content: string, duration?: number, onClose?: () => void): void;

  /** A message may be formatted to display information */
  info(content: string, duration?: number, onClose?: () => void): void;

  /** A message may be formatted to display warning messages */
  warning(content: string, duration?: number, onClose?: () => void): void;

  /** Used to configure where the message is displayed */
  config(options: AlertConfigProps): void;
}

declare const Alert: AlertAPI;

export default Alert;
