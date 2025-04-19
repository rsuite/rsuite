import React from 'react';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';
import Whisper from '../Whisper';
import Tooltip from '../Tooltip';
import IconButton from '../IconButton';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';

export interface StatLabelProps extends BoxProps {
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
    as = 'dt',
    classPrefix = 'stat-label',
    className,
    children,
    info,
    uppercase,
    ...rest
  } = props;
  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ uppercase }));

  return (
    <Box as={as} ref={ref} className={classes} {...rest}>
      {children}
      {info && (
        <Whisper placement="top" trigger={'click'} enterable speaker={<Tooltip>{info}</Tooltip>}>
          <IconButton circle size="xs" appearance="subtle" icon={<InfoOutlineIcon />} />
        </Whisper>
      )}
    </Box>
  );
});

StatLabel.displayName = 'StatLabel';

export default StatLabel;
