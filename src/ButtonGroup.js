/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';

import Button from './Button';
import { withStyleProps, defaultProps, prefix } from './utils';

type Props = {
  className?: string,
  vertical?: boolean,
  justified?: boolean,
  block?: boolean,
  classPrefix: string,
  children?: React.Element<typeof Button>
};

class ButtonGroup extends React.Component<Props> {
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
    const items = justified
      ? React.Children.map(children, child =>
          React.cloneElement(child, { componentClass: 'a', role: 'button' })
        )
      : children;

    return (
      <div role="group" {...props} className={classes}>
        {items}
      </div>
    );
  }
}

export default compose(
  withStyleProps({
    hasSize: true
  }),
  defaultProps({
    classPrefix: 'btn-group'
  })
)(ButtonGroup);
