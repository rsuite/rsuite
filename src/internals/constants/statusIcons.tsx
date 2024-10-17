import React from 'react';
import InfoRoundIcon from '@rsuite/icons/InfoRound';
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import RemindRoundIcon from '@rsuite/icons/RemindRound';
import Check from '@rsuite/icons/Check';
import Close from '@rsuite/icons/Close';

export const MESSAGE_STATUS_ICONS = {
  info: <InfoRoundIcon />,
  success: <CheckRoundIcon />,
  error: <WarningRoundIcon />,
  warning: <RemindRoundIcon />
};

export const PROGRESS_STATUS_ICON = {
  success: <Check />,
  active: null,
  fail: <Close />
};
