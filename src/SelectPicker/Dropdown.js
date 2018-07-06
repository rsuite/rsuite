// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import { SearchBar, MenuWrapper, constants } from 'rsuite-utils/lib/Picker';
import {
  reactToString,
  filterNodesOfTree,
  findNodeOfTree,
  getDataGroupBy,
  shallowEqual,
  shallowEqualArray
} from 'rsuite-utils/lib/utils';

import { defaultProps, prefix, getUnhandledProps, createChainedFunction } from '../utils';
import DropdownMenu from '../_picker/DropdownMenu';
import DropdownMenuItem from '../_picker/DropdownMenuItem';
import PickerToggle from '../_picker/PickerToggle';

type DefaultEvent = SyntheticEvent<*>;
type DefaultEventFunction = (event: DefaultEvent) => void;
type Placement =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight'
  | 'leftTop'
  | 'rightTop'
  | 'leftBottom'
  | 'rightBottom'
  | 'auto'
  | 'autoVerticalLeft'
  | 'autoVerticalRight'
  | 'autoHorizontalTop'
  | 'autoHorizontalBottom';

type Props = {
  appearance: 'default' | 'subtle',
  data: Array<any>,
  locale: Object,
  classPrefix?: string,
  className?: string,
  container?: HTMLElement | (() => HTMLElement),
  containerPadding?: number,
  block?: boolean,
  toggleComponentClass?: React.ElementType,
  menuClassName?: string,
  disabled?: boolean,
  disabledItemValues?: Array<any>,
  maxHeight?: number,
  valueKey?: string,
  labelKey?: string,
  value?: any,
  defaultValue?: any,
  renderMenu?: (menu: React.Node) => React.Node,
  renderMenuItem?: (itemLabel: React.Node, item: Object) => React.Node,
  renderMenuGroup?: (title: React.Node, item: Object) => React.Node,
  renderValue?: (value: any, item: Object) => React.Node,
  renderExtraFooter?: () => React.Node,
  onChange?: (value: any, event: DefaultEvent) => void,
  onSelect?: (value: any, item: Object, event: DefaultEvent) => void,
  onGroupTitleClick?: DefaultEventFunction,
  onSearch?: (searchKeyword: string, event: DefaultEvent) => void,
  onOpen?: () => void,
  onClose?: () => void,
  onEnter?: Function,
  onEntering?: Function,
  onEntered?: Function,
  onExit?: Function,
  onExiting?: Function,
  onExited?: Function,
  /**
   * group by key in `data`
   */
  groupBy?: any,
  placeholder?: React.Node,
  searchable?: boolean,
  cleanable?: boolean,
  open?: boolean,
  defaultOpen?: boolean,
  placement?: Placement,
  style?: Object
};

type States = {
  value?: any,
  // Used to focus the active item  when trigger `onKeydown`
  focusItemValue?: any,
  searchKeyword: string,
  filteredData?: Array<any>
};

class Dropdown extends React.Component<Props, States> {
  static defaultProps = {
    appearance: 'default',
    data: [],
    disabledItemValues: [],
    maxHeight: 320,
    valueKey: 'value',
    labelKey: 'label',
    locale: {
      placeholder: 'Select',
      searchPlaceholder: 'Search'
    },
    searchable: true,
    cleanable: true,
    placement: 'bottomLeft'
  };

  constructor(props: Props) {
    super(props);

    const { data, value, defaultValue, groupBy, valueKey, labelKey } = props;
    const nextValue = value || defaultValue;

    this.state = {
      value: nextValue,
      focusItemValue: nextValue,
      searchKeyword: '',
      filteredData: data
    };

    if (groupBy === valueKey || groupBy === labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { value, data } = nextProps;

    if (!shallowEqual(value, this.props.value)) {
      this.setState({
        value,
        focusItemValue: value
      });
    }

    if (!shallowEqualArray(data, this.props.data)) {
      this.setState({
        filteredData: data
      });
    }
  }

  getFocusableMenuItems = () => {
    const { labelKey } = this.props;
    const { menuItems } = this.menuContainer;
    if (!menuItems) {
      return [];
    }

    const items = Object.values(menuItems).map((item: any) => item.props.getItemData());
    return filterNodesOfTree(items, item => this.shouldDisplay(item[labelKey]));
  };

  getValue() {
    const { value } = this.props;
    return _.isUndefined(value) ? this.state.value : value;
  }

  menuContainer = {
    menuItems: null
  };

  bindMenuContainerRef = (ref: React.ElementRef<*>) => {
    this.menuContainer = ref;
  };

  // for test
  searchBarContainer = null;

  bindSearchBarContainerRef = (ref: React.ElementRef<*>) => {
    this.searchBarContainer = ref;
  };

  trigger = null;

  bindTriggerRef = (ref: React.ElementRef<*>) => {
    this.trigger = ref;
  };

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  shouldDisplay(label: any) {
    const { searchKeyword } = this.state;
    if (!_.trim(searchKeyword)) {
      return true;
    }

    const keyword = searchKeyword.toLocaleLowerCase();

    if (typeof label === 'string' || typeof label === 'number') {
      return `${label}`.toLocaleLowerCase().indexOf(keyword) >= 0;
    } else if (React.isValidElement(label)) {
      const nodes = reactToString(label);
      return (
        nodes
          .join('')
          .toLocaleLowerCase()
          .indexOf(keyword) >= 0
      );
    }

    return false;
  }

  findNode(focus: Function) {
    const items = this.getFocusableMenuItems();
    const { valueKey } = this.props;
    const { focusItemValue } = this.state;

    for (let i = 0; i < items.length; i += 1) {
      if (shallowEqual(focusItemValue, items[i][valueKey])) {
        focus(items, i);
        return;
      }
    }

    focus(items, -1);
  }
  focusNextMenuItem() {
    const { valueKey } = this.props;
    this.findNode((items, index) => {
      const focusItem = items[index + 1];
      if (!_.isUndefined(focusItem)) {
        this.setState({ focusItemValue: focusItem[valueKey] });
      }
    });
  }
  focusPrevMenuItem() {
    const { valueKey } = this.props;
    this.findNode((items, index) => {
      const focusItem = items[index - 1];
      if (!_.isUndefined(focusItem)) {
        this.setState({ focusItemValue: focusItem[valueKey] });
      }
    });
  }

  selectFocusMenuItem(event: DefaultEvent) {
    const { focusItemValue } = this.state;
    const { data, valueKey } = this.props;
    if (!focusItemValue) {
      return;
    }

    // Find active `MenuItem` by `value`
    const focusItem = findNodeOfTree(data, item => shallowEqual(item[valueKey], focusItemValue));

    this.setState({ value: focusItemValue }, () => {
      this.handleSelect(focusItemValue, focusItem, event);
      this.handleChange(focusItemValue, event);
    });

    this.closeDropdown();
  }

  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    if (!this.menuContainer) {
      return;
    }

    switch (event.keyCode) {
      // down
      case 40:
        this.focusNextMenuItem();
        event.preventDefault();
        break;
      // up
      case 38:
        this.focusPrevMenuItem();
        event.preventDefault();
        break;
      // enter
      case 13:
        this.selectFocusMenuItem(event);
        event.preventDefault();
        break;
      // esc | tab
      case 27:
      case 9:
        this.closeDropdown();
        event.preventDefault();
        break;
      default:
    }
  };

  handleItemSelect = (value: any, item: Object, event: DefaultEvent) => {
    const nextState = {
      value,
      focusItemValue: value
    };
    this.setState(nextState, () => {
      this.handleSelect(value, item, event);
      this.handleChange(value, event);
    });
    this.closeDropdown();
  };

  handleSelect = (value: any, item: Object, event: DefaultEvent) => {
    const { onSelect } = this.props;
    onSelect && onSelect(value, item, event);
  };

  handleSearch = (searchKeyword: string, event: DefaultEvent) => {
    const { onSearch } = this.props;
    this.setState({
      searchKeyword,
      focusItemValue: undefined
    });
    onSearch && onSearch(searchKeyword, event);
  };

  closeDropdown = () => {
    if (this.trigger) {
      this.trigger.hide();
    }
  };

  handleChange = (value: any, event: DefaultEvent) => {
    const { onChange } = this.props;
    onChange && onChange(value, event);
  };

  handleClean = (event: DefaultEvent) => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    const nextState = {
      value: null,
      focusItemValue: null
    };

    this.setState(nextState, () => {
      this.handleChange(null, event);
    });
  };

  handleExited = () => {
    const { onClose } = this.props;
    onClose && onClose();
    const value = this.getValue();
    this.setState({
      focusItemValue: value
    });
  };

  handleOpen = () => {
    const { onOpen } = this.props;
    onOpen && onOpen();
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderDropdownMenu() {
    const {
      data,
      labelKey,
      groupBy,
      searchable,
      placement,
      locale,
      renderMenu,
      renderExtraFooter,
      menuClassName
    } = this.props;

    const { focusItemValue } = this.state;
    const classes = classNames(
      this.addPrefix('select-menu'),
      this.addPrefix(`placement-${_.kebabCase(placement)}`),
      menuClassName
    );

    let filteredData = filterNodesOfTree(data, item => this.shouldDisplay(item[labelKey]));

    // Create a tree structure data when set `groupBy`
    if (groupBy) {
      filteredData = getDataGroupBy(filteredData, groupBy);
    }

    const menuProps = _.pick(
      this.props,
      DropdownMenu.handledProps.filter(
        name => !['className', 'style', 'classPrefix'].some(item => item === name)
      )
    );

    const menu = (
      <DropdownMenu
        {...menuProps}
        classPrefix={this.addPrefix('select-menu')}
        dropdownMenuItemClassPrefix={this.addPrefix('select-menu-item')}
        dropdownMenuItemComponentClass={DropdownMenuItem}
        ref={this.bindMenuContainerRef}
        activeItemValues={[this.getValue()]}
        focusItemValue={focusItemValue}
        data={filteredData}
        group={!_.isUndefined(groupBy)}
        onSelect={this.handleItemSelect}
      />
    );

    return (
      <MenuWrapper className={classes} onKeyDown={this.handleKeyDown}>
        {searchable && (
          <SearchBar
            ref={this.bindSearchBarContainerRef}
            placeholder={locale.searchPlaceholder}
            onChange={this.handleSearch}
            value={this.state.searchKeyword}
          />
        )}

        {renderMenu ? renderMenu(menu) : menu}
        {renderExtraFooter && renderExtraFooter()}
      </MenuWrapper>
    );
  }

  render() {
    const {
      data,
      valueKey,
      labelKey,
      className,
      placeholder,
      renderValue,
      disabled,
      cleanable,
      locale,
      classPrefix,
      onOpen,
      onClose,
      placement,
      open,
      defaultOpen,
      toggleComponentClass,
      block,
      style,
      container,
      containerPadding,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      appearance,
      ...rest
    } = this.props;

    const unhandled = getUnhandledProps(Dropdown, rest);
    const value = this.getValue();

    // Find active `MenuItem` by `value`
    const activeItem = findNodeOfTree(data, item => shallowEqual(item[valueKey], value));
    const hasValue = !!activeItem;

    let activeItemLabel = placeholder;

    if (activeItem && activeItem[labelKey]) {
      activeItemLabel = activeItem[labelKey];

      if (renderValue) {
        activeItemLabel = renderValue(activeItemLabel, activeItem);
      }
    }

    const classes = classNames(
      className,
      this.addPrefix('select'),
      this.addPrefix(appearance),
      this.addPrefix(`placement-${_.kebabCase(placement)}`),
      {
        [this.addPrefix('select-block')]: block,
        [this.addPrefix('select-has-value')]: hasValue,
        [this.addPrefix('select-disabled')]: disabled
      }
    );

    return (
      <div
        className={classes}
        style={style}
        onKeyDown={this.handleKeyDown}
        tabIndex={-1}
        role="menu"
      >
        <OverlayTrigger
          ref={this.bindTriggerRef}
          open={open}
          defaultOpen={defaultOpen}
          disabled={disabled}
          trigger="click"
          placement={placement}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={createChainedFunction(this.handleOpen, onEntered)}
          onExit={onExit}
          onExiting={onExiting}
          onExited={createChainedFunction(this.handleExited, onExited)}
          speaker={this.renderDropdownMenu()}
          container={container}
          containerPadding={containerPadding}
        >
          <PickerToggle
            {...unhandled}
            componentClass={toggleComponentClass}
            onClean={this.handleClean}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
          >
            {activeItemLabel || locale.placeholder}
          </PickerToggle>
        </OverlayTrigger>
      </div>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'picker'
});

export default enhance(Dropdown);
