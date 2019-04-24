// @flow

import * as React from 'react';
import { setDisplayName } from 'recompose';
import classNames from 'classnames';
import _ from 'lodash';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import { Consumer } from './List';

type Props = {
  //custom
  index: number,
  collection?: Array<number | string>,
  disabled?: boolean,
  className?: string,
  classPrefix?: string,
  children?: React.Node,
  //from context
  bordered?: boolean,
  size?: 'lg' | 'md' | 'sm',
  manager: Object
};

class ListItem extends React.Component<Props> {
  static defaultProps = {
    collection: 0
  };

  ref: {
    node: Element | Text | null
  };
  node: any;

  componentDidMount() {
    this.register();
  }

  componentDidUpdate(prevProps) {
    if (this.node) {
      if (prevProps.index !== this.props.index) {
        this.node.sortableInfo.index = this.props.index;
      }

      if (prevProps.disabled !== this.props.disabled) {
        this.node.sortableInfo.disabled = this.props.disabled;
      }
    }

    if (prevProps.collection !== this.props.collection) {
      this.unregister(prevProps.collection);
      this.register();
    }
  }

  componentWillUnmount() {
    this.unregister();
  }

  register = () => {
    const { collection, disabled, index, manager } = this.props;
    if (manager) {
      _.set(this.node, 'sortableInfo', {
        collection,
        disabled,
        index,
        manager
      });

      this.ref = { node: this.node };

      manager.add(collection, this.ref);
    }
  };

  unregister = (collection = this.props.collection) => {
    const { manager } = this.props;
    if (manager) {
      manager.remove(collection, this.ref);
    }
  };

  render() {
    const { className, classPrefix, bordered, disabled, children, size, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(ListItem, rest);
    const classes = classNames(classPrefix, className, addPrefix(size), {
      [addPrefix('disabled')]: disabled,
      [addPrefix('bordered')]: bordered
    });
    const itemContent = <div className={addPrefix('content')}>{children}</div>;

    return (
      <div ref={ref => (this.node = ref)} className={classes} {...unhandled}>
        {itemContent}
      </div>
    );
  }
}

const EnhancedListItem = defaultProps({
  classPrefix: 'list-item'
})(ListItem);

const Component: EnhancedListItem = setDisplayName('ListItem')(EnhancedListItem);

export default (props: Props) => (
  <Consumer>{context => <Component {...props} {...context} />}</Consumer>
);
