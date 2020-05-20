import * as React from 'react';
import PropTypes from 'prop-types';
import { setDisplayName } from 'recompose';
import classNames from 'classnames';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import ListContext from './ListContext';
import { ListItemProps } from './ListItem.d';
import { ManagerRef } from './Manager';

class ListItem extends React.Component<ListItemProps> {
  static defaultProps = {
    collection: 0
  };
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    index: PropTypes.number,
    collection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool,
    manager: PropTypes.object
  };
  managerRef: ManagerRef;
  listItemRef = React.createRef<HTMLElement>();

  componentDidMount() {
    this.register();
  }

  componentDidUpdate(prevProps) {
    this.managerRef.info.index = this.props.index;
    this.managerRef.info.disabled = this.props.disabled;

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
      this.managerRef = {
        node: this.listItemRef.current,
        edgeOffset: null,
        info: {
          collection,
          disabled,
          index,
          manager
        }
      };
      manager.add(collection, this.managerRef);
    }
  };

  unregister = (collection = this.props.collection) => {
    const { manager } = this.props;
    if (manager) {
      manager.remove(collection, this.managerRef);
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
      <div ref={this.listItemRef} className={classes} {...unhandled}>
        {itemContent}
      </div>
    );
  }
}

const EnhancedListItem = defaultProps<ListItemProps>({
  classPrefix: 'list-item'
})(ListItem);

const Component = setDisplayName('ListItem')(EnhancedListItem);

const WithContextListItem = (props: ListItemProps) => (
  <ListContext.Consumer>{context => <Component {...props} {...context} />}</ListContext.Consumer>
);

export default WithContextListItem;
