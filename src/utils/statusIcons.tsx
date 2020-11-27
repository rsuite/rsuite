import React from 'react';
import Info from '@rsuite/icons/legacy/Info';
import CheckCircle from '@rsuite/icons/legacy/CheckCircle';
import CloseCircle from '@rsuite/icons/legacy/CloseCircle';
import Remind from '@rsuite/icons/legacy/Remind';
import Check from '@rsuite/icons/Check';
import Close from '@rsuite/icons/Close';

export const MESSAGE_STATUS_ICONS = {
  info: <Info />,
  success: <CheckCircle />,
  error: <CloseCircle />,
  warning: <Remind />
};

export const PROGRESS_STATUS_ICON = {
  success: <Check />,
  active: null,
  fail: <Close />
};
