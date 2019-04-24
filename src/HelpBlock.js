// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import Tooltip from './Tooltip';
import Icon from './Icon';
import Whisper from './Whisper';
import { defaultProps, prefix } from './utils';

type Props = {
  className?: string,
  htmlFor?: string,
  tooltip?: boolean,
  children?: React.Node,
  classPrefix: string
};

class HelpBlock extends React.Component<Props> {
  static contextTypes = {
    formGroup: PropTypes.object
  };

  render() {
    const controlId = _.get(this.context, 'formGroup.controlId');
    const { className, tooltip, children, htmlFor = controlId, classPrefix, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('tooltip')]: tooltip
    });

    if (tooltip) {
      return (
        <Whisper placement="topEnd" speaker={<Tooltip>{children}</Tooltip>}>
          <span className={classes} {...props}>
            <Icon icon="question-circle-o" />
          </span>
        </Whisper>
      );
    }

    return (
      <span {...props} className={classes} htmlFor={htmlFor}>
        {children}
      </span>
    );
  }
}

export default defaultProps({
  classPrefix: 'help-block'
})(HelpBlock);
