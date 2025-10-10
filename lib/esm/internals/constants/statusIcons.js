'use client';
import React from 'react';
import InfoRoundIcon from '@rsuite/icons/InfoRound';
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import RemindRoundIcon from '@rsuite/icons/RemindRound';
import Check from '@rsuite/icons/Check';
import Close from '@rsuite/icons/Close';
export var MESSAGE_STATUS_ICONS = {
  info: /*#__PURE__*/React.createElement(InfoRoundIcon, null),
  success: /*#__PURE__*/React.createElement(CheckRoundIcon, null),
  error: /*#__PURE__*/React.createElement(WarningRoundIcon, null),
  warning: /*#__PURE__*/React.createElement(RemindRoundIcon, null)
};
export var PROGRESS_STATUS_ICON = {
  success: /*#__PURE__*/React.createElement(Check, null),
  active: null,
  fail: /*#__PURE__*/React.createElement(Close, null)
};