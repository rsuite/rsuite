/* @flow */

import * as React from 'react';
import classNames from 'classnames';

import withStyleProps from './utils/withStyleProps';
import prefix from './utils/prefix';

type Props = {
  className?: string,
  vertical?: boolean,
  justified?: boolean,
  block?: boolean,
  classPrefix: string
};


class ButtonGroup extends React.Component<Props> {


  static defaultProps = {
    classPrefix: 'btn-group'
  };

  render() {
    const { className, vertical, block, justified, classPrefix, ...props } = this.props;
    const addPrefix: Function = prefix(classPrefix);

    const classes = classNames(classPrefix, {
      [addPrefix('block')]: block,
      [addPrefix('vertical')]: vertical,
      [addPrefix('justified')]: justified
    }, className);

    return (
      <div
        role="group"
        {...props}
        className={classes}
      />
    );
  }
}


export default withStyleProps({
  hasSize: true,
})(ButtonGroup);
