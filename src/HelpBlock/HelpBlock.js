// @flow

import * as React from 'react';
import classNames from 'classnames';
import Tooltip from './Tooltip';
import Icon from './Icon';
import Whisper from './Whisper';
import { defaultProps, prefix } from './utils';
import { FormGroupContext } from './FormGroup';

type Props = {
  className?: string,
  htmlFor?: string,
  tooltip?: boolean,
  children?: React.Node,
  classPrefix: string
};

class HelpBlock extends React.Component<Props> {
  render() {
    const { className, tooltip, children, classPrefix, htmlFor, ...props } = this.props;
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
      <FormGroupContext.Consumer>
        {controlId => (
          <span {...props} className={classes} htmlFor={htmlFor || controlId}>
            {children}
          </span>
        )}
      </FormGroupContext.Consumer>
    );
  }
}

export default defaultProps({
  classPrefix: 'help-block'
})(HelpBlock);
