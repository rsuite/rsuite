import React from 'react';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';
import Whisper from '../Whisper';
import Tooltip from '../Tooltip';
import IconButton from '../IconButton';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import type { WithAsProps } from '@/internals/types';

export interface StatLabelProps extends WithAsProps {
  /**
   * The info tip of the label
   */
  info?: React.ReactNode;

  /**
   * Uppercase the label
   */
  uppercase?: boolean;
}

const StatLabel = forwardRef<'dt', StatLabelProps>((props, ref) => {
  const {
    as: Component = 'dt',
    classPrefix = 'stat-label',
    className,
    children,
    info,
    uppercase,
    ...rest
  } = props;
  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ uppercase }));

  return (
    <Component ref={ref} className={classes} {...rest}>
      {children}
      {info && (
        <Whisper placement="top" trigger={'click'} enterable speaker={<Tooltip>{info}</Tooltip>}>
          <IconButton circle size="xs" appearance="subtle" icon={<InfoOutlineIcon />} />
        </Whisper>
      )}
    </Component>
  );
});

StatLabel.displayName = 'StatLabel';

export default StatLabel;
