import React from 'react';
import Tooltip from '../Tooltip';
import Whisper from '../Whisper';
import { TypeAttributes } from '../@types/common';

interface Props {
  ref?: React.Ref<any>;
  message?: React.ReactNode;
  children: React.ReactElement | ((props: any, ref) => React.ReactElement);
  placement?: TypeAttributes.Placement;
}

export default function appendTooltip({ message, ref, ...rest }: Props) {
  return <Whisper ref={ref} speaker={<Tooltip>{message}</Tooltip>} {...rest} />;
}
