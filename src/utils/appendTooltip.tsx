import * as React from 'react';
import Tooltip from '../Tooltip';
import Whisper from '../Whisper';
import { TypeAttributes } from '../@types/common';

interface Props {
  message?: React.ReactNode;
  children?: React.ReactNode;
  placement?: TypeAttributes.Placement | TypeAttributes.Placement4;
}

export default function appendTooltip({ message, ...rest }: Props) {
  return <Whisper speaker={<Tooltip>{message}</Tooltip>} {...rest} />;
}
