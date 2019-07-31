import * as React from 'react';

import { StandardProps } from '../@types/common';

export interface ModalDialogProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  dialogClassName?: string;
  dialogStyle?: React.CSSProperties;

  dialogRef?: React.Ref<any>;
}

declare const ModalDialog: React.ComponentType<ModalDialogProps>;

export default ModalDialog;
