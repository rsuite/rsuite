import React from 'react';
import Tooltip from '../Tooltip';
import Whisper from '../Whisper';
import { TypeAttributes } from '../@types/common';

interface Props {
  message?: React.ReactNode;
  children?: React.ReactElement | ((props: any, ref) => React.ReactElement);
  placement?: TypeAttributes.Placement | TypeAttributes.Placement4;
}

export default function appendTooltip({ message, ...rest }: Props) {
  return <Whisper speaker={<Tooltip>{message}</Tooltip>} {...rest} />;
}
