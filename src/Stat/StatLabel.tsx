import React from 'react';
import PropTypes from 'prop-types';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';
import Whisper from '../Whisper';
import Tooltip from '../Tooltip';
import IconButton from '../IconButton';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

interface StatLabelProps extends WithAsProps {
  /**
   * The info tip of the label
   */
  info?: React.ReactNode;

  /**
   * Uppercase the label
   */
  uppercase?: boolean;
}

const StatLabel: RsRefForwardingComponent<'dt', StatLabelProps> = React.forwardRef(
  (props: StatLabelProps, ref) => {
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
  }
);

StatLabel.displayName = 'StatLabel';
StatLabel.propTypes = {
  info: PropTypes.node,
  uppercase: PropTypes.bool
};

export default StatLabel;
