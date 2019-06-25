import * as React from 'react';
import PropTypes from 'prop-types';
import { setDisplayName } from 'recompose';
import classNames from 'classnames';
import _ from 'lodash';

import { defaultProps, getUnhandledProps, prefix } from '../utils';
import { ListContext } from './List';
import { ListItemProps } from './ListItem.d';

class ListItem extends React.Component<ListItemProps> {
  static propTypes = {
    //custom
    index: PropTypes.number,
    collection: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.node,
    //from context
    bordered: PropTypes.bool,
    size: PropTypes.oneOf(['lg', 'md', 'sm']),
    manager: PropTypes.object
  };
  static defaultProps = {
    collection: 0
  };

  nodeRef: React.RefObject<any>;
  ref: {
    node: any;
  };

  constructor(props) {
    super(props);
    this.nodeRef = React.createRef();
  }

  componentDidMount() {
    this.register();
  }

  componentDidUpdate(prevProps) {
    if (this.nodeRef.current) {
      if (prevProps.index !== this.props.index) {
        this.nodeRef.current.sortableInfo.index = this.props.index;
      }

      if (prevProps.disabled !== this.props.disabled) {
        this.nodeRef.current.sortableInfo.disabled = this.props.disabled;
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
      _.set(this.nodeRef.current, 'sortableInfo', {
        collection,
        disabled,
        index,
        manager
      });

      this.ref = { node: this.nodeRef.current };

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
    const classes = classNames(className, classPrefix, addPrefix(size), {
      [addPrefix('disabled')]: disabled,
      [addPrefix('bordered')]: bordered
    });
    const itemContent = <div className={addPrefix('content')}>{children}</div>;

    return (
      <div ref={this.nodeRef} className={classes} {...unhandled}>
        {itemContent}
      </div>
    );
  }
}

const EnhancedListItem = defaultProps<ListItemProps>({
  classPrefix: 'list-item'
})(ListItem);

const Component = setDisplayName('ListItem')(EnhancedListItem);

export default (props: ListItemProps) => (
  <ListContext.Consumer>{context => <Component {...props} {...context} />}</ListContext.Consumer>
);
