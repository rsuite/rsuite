import * as React from 'react';

import { StandardProps, TypeAttributes, AnimationEventProps } from '../@types/common';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';

export interface ModalProps extends StandardProps, AnimationEventProps {
  /** A modal can have different sizes */
  size?: TypeAttributes.Size;

  /** Primary content */
  children?: React.ReactNode;

  /** CSS class applied to Dialog DOM nodes */
  dialogClassName?: string;

  /**
   * Add an optional extra class name to .modal-backdrop
   * It could end up looking like class="modal-backdrop foo-modal-backdrop in"
   */
  backdropClassName?: string;

  /** CSS style applied to dialog DOM nodes */
  dialogStyle?: object;

  /** CSS style applied to backdrop DOM nodes  */
  backdropStyle?: object;

  /** Show modal */
  show?: boolean;

  /** Full screen */
  full?: boolean;

  /**
   * When set to true, the Modal will display the background when it is opened.
   * Clicking on the background will close the Modal. If you do not want to close the Modal,
   * set it to 'static'.
   */
  backdrop?: boolean | 'static';

  /** Close Modal when esc key is pressed */
  keyboard?: boolean;

  /**
   * When set to true, the Modal is opened and is automatically focused on its own,
   * accessible to screen readers
   */
  autoFocus?: boolean;

  /**
   * When set to true, Modal will prevent the focus from leaving when opened,
   * making it easier for the secondary screen reader to access
   */
  enforceFocus?: boolean;

  /** You can use a custom element type for Dialog */
  dialogComponentClass?: React.ElementType;

  /** Called when Modal is displayed */
  onShow?: () => void;

  /** Called when Modal is closed */
  onHide?: (event: React.SyntheticEvent) => void;
}

interface ModalComponent extends React.ComponentClass<ModalProps> {
  Body: typeof ModalBody;
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Footer: typeof ModalFooter;
}

declare const Modal: ModalComponent;

export default Modal;
