/* @flow */

import * as React from 'react';
import classNames from 'classnames';

import withStyleProps from './utils/withStyleProps';
import prefix, { globalKey } from './utils/prefix';
import Button from './Button';

type Props = {
  className?: string,
  vertical?: boolean,
  justified?: boolean,
  block?: boolean,
  classPrefix: string,
  children?: React.Element<typeof Button>
};


class ButtonGroup extends React.Component<Props> {


  static defaultProps = {
    classPrefix: `${globalKey}btn-group`
  };

  render() {
    const { className, vertical, children, block, justified, classPrefix, ...props } = this.props;
    const addPrefix: Function = prefix(classPrefix);

    const classes = classNames(classPrefix, {
      [addPrefix('block')]: block,
      [addPrefix('vertical')]: vertical,
      [addPrefix('justified')]: justified
    }, className);


    /**
     * After you set up justified, you use the table layout.
     * display:table-cell not working on button element.
     * So change 'a'
     */
    const items = justified ? React.Children.map(children, child => (
      React.cloneElement(child, { componentClass: 'a', role: 'button' })
    )) : children;


    return (
      <div
        role="group"
        {...props}
        className={classes}
      >
        {items}
      </div>
    );
  }
}


export default withStyleProps({
  hasSize: true,
})(ButtonGroup);
