import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tooltip from '../Tooltip';
import Whisper from '../Whisper';
import Icon from '../Icon';
import { defaultProps, prefix } from '../utils';
import { HelpBlockProps } from './HelpBlock.d';

class HelpBlock extends React.Component<HelpBlockProps> {
  static propTypes = {
    className: PropTypes.string,
    tooltip: PropTypes.bool,
    children: PropTypes.node,
    classPrefix: PropTypes.string
  };
  render() {
    const { className, tooltip, children, classPrefix, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('tooltip')]: tooltip
    });

    if (tooltip) {
      return (
        <Whisper placement="topEnd" speaker={<Tooltip>{children}</Tooltip>}>
          <span className={classes} {...props}>
            <Icon icon="question-circle2" />
          </span>
        </Whisper>
      );
    }

    return (
      <span {...props} className={classes}>
        {children}
      </span>
    );
  }
}

export default defaultProps<HelpBlockProps>({
  classPrefix: 'help-block'
})(HelpBlock);
