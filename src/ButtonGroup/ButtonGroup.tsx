import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';

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

    /**
     * After you set up justified, you use the table layout.
     * display:table-cell not working on button element.
     * So change 'a'
     */
    let items: React.ReactNode = children;

    if (justified) {
      items = React.Children.map(children, (child: React.FunctionComponentElement<any>) =>
        React.cloneElement<any>(child, { componentClass: 'a', role: 'button' })
      );
    }

    return (
      <div role="group" {...props} className={classes}>
        {items}
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
