import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';

import { withStyleProps, defaultProps, prefix } from '../utils';
import { ButtonGroupProps } from './ButtonGroup.d';

class ButtonGroup extends React.Component<ButtonGroupProps> {
  static propTypes = {
    className: PropTypes.string,
    vertical: PropTypes.bool,
    justified: PropTypes.bool,
    block: PropTypes.bool,
    classPrefix: PropTypes.string,
    children: PropTypes.node
  };
  render() {
    const { className, vertical, children, block, justified, classPrefix, ...props } = this.props;
    const addPrefix = prefix(classPrefix);

    const classes = classNames(classPrefix, className, {
      [addPrefix('block')]: block,
      [addPrefix('vertical')]: vertical,
      [addPrefix('justified')]: justified
    });

    return (
      <div role="group" {...props} className={classes}>
        {children}
      </div>
    );
  }
}

export default compose<any, ButtonGroupProps>(
  withStyleProps<ButtonGroupProps>({
    hasSize: true
  }),
  defaultProps<ButtonGroupProps>({
    classPrefix: 'btn-group'
  })
)(ButtonGroup);
