// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import { SearchBar, MenuWrapper } from 'rsuite-utils/lib/Picker';
import {
  reactToString,
  filterNodesOfTree,
  getDataGroupBy,
  shallowEqual,
  tplTransform
} from 'rsuite-utils/lib/utils';

import { defaultProps, prefix, getUnhandledProps, createChainedFunction } from '../utils';
import DropdownMenu from '../_picker/DropdownMenu';
import DropdownMenuItem from '../_picker/DropdownMenuCheckItem';
import PickerToggle from '../_picker/PickerToggle';
import getToggleWrapperClassName from '../_picker/getToggleWrapperClassName';
import type { Placement } from '../utils/TypeDefinition';

type DefaultEvent = SyntheticEvent<*>;
type DefaultEventFunction = (event: DefaultEvent) => void;

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
  menuStyle?: Object,
  disabled?: boolean,
  disabledItemValues?: Array<any>,
  maxHeight?: number,
  valueKey?: string,
  labelKey?: string,
  value?: Array<any>,
  defaultValue?: Array<any>,
  renderMenu?: (menu: React.Node) => React.Node,
  renderMenuItem?: (itemLabel: React.Node, item: Object) => React.Node,
  renderMenuGroup?: (title: React.Node, item: Object) => React.Node,
  renderValue?: (value: Array<any>, items: Array<any>) => React.Node,
  renderExtraFooter?: () => React.Node,
  onChange?: (value: Array<any>, event: DefaultEvent) => void,
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
  value?: Array<any>,
  // Used to focus the active item  when trigger `onKeydown`
  focusItemValue?: any,
  searchKeyword: string
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
      searchPlaceholder: 'Search',
      selectedValues: '{0} selected'
    },
    searchable: true,
    cleanable: true,
    placement: 'bottomLeft'
  };

  constructor(props: Props) {
    super(props);

    const { value, defaultValue, groupBy, valueKey, labelKey } = props;
    const nextValue = _.clone(value || defaultValue) || [];

    this.state = {
      value: nextValue,
      // Used to hover the active item  when trigger `onKeydown`
      focusItemValue: nextValue ? nextValue[0] : undefined,
      searchKeyword: ''
    };

    if (groupBy === valueKey || groupBy === labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
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
    const nextValue = _.isUndefined(value) ? this.state.value : value;
    return _.clone(nextValue) || [];
  }

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
    const value = this.getValue();
    const { data, valueKey } = this.props;
    const { focusItemValue } = this.state;

    if (!focusItemValue) {
      return;
    }

    if (!value.some(v => shallowEqual(v, focusItemValue))) {
      value.push(focusItemValue);
    } else {
      _.remove(value, itemVal => shallowEqual(itemVal, focusItemValue));
    }

    const focusItem: any = data.find(item => shallowEqual(_.get(item, valueKey), focusItemValue));

    this.setState({ value }, () => {
      this.handleSelect(value, focusItem, event);
      this.handleChangeValue(value, event);
    });
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

  handleItemSelect = (nextItemValue: any, item: Object, event: DefaultEvent, checked: boolean) => {
    const value = this.getValue();

    if (checked) {
      value.push(nextItemValue);
    } else {
      _.remove(value, itemVal => shallowEqual(itemVal, nextItemValue));
    }

    const nextState = {
      value,
      focusItemValue: nextItemValue
    };

    this.setState(nextState, () => {
      this.handleSelect(value, item, event);
      this.handleChangeValue(value, event);
    });
  };

  handleSelect = (nextItemValue: any, item: Object, event: DefaultEvent) => {
    const { onSelect } = this.props;
    onSelect && onSelect(nextItemValue, item, event);
  };

  handleChangeValue = (value: any, event: DefaultEvent) => {
    const { onChange } = this.props;
    onChange && onChange(value, event);
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
    const value = this.getValue();
    if (this.trigger) {
      this.trigger.hide();
    }
    this.setState({
      focusItemValue: value ? value[0] : undefined
    });
  };

  handleClean = (event: DefaultEvent) => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    this.setState({ value: [] }, () => {
      this.handleChangeValue([], event);
    });
  };

  handleExited = () => {
    const { onClose } = this.props;
    const value = this.getValue();
    onClose && onClose();
    this.setState({
      focusItemValue: value ? value[0] : undefined
    });
  };

  handleOpen = () => {
    const { onOpen } = this.props;
    onOpen && onOpen();
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  container = null;

  bindContainerRef = (ref: React.ElementRef<*>) => {
    this.container = ref;
  };

  trigger = null;

  bindTriggerRef = (ref: React.ElementRef<*>) => {
    this.trigger = ref;
  };

  menuContainer = {
    menuItems: null
  };

  bindMenuContainerRef = (ref: React.ElementRef<*>) => {
    this.menuContainer = ref;
  };

  renderDropdownMenu() {
    const {
      data,
      labelKey,
      groupBy,
      searchable,
      renderExtraFooter,
      locale,
      placement,
      renderMenu,
      menuClassName,
      menuStyle
    } = this.props;

    const { focusItemValue } = this.state;
    const classes = classNames(
      this.addPrefix('check-menu'),
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
        style={menuStyle}
        classPrefix={this.addPrefix('check-menu')}
        dropdownMenuItemClassPrefix={this.addPrefix('check-menu-item')}
        dropdownMenuItemComponentClass={DropdownMenuItem}
        ref={this.bindMenuContainerRef}
        activeItemValues={this.getValue()}
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
    const selectedItems =
      !!value && !!value.length
        ? data.filter(item => value.some(val => shallowEqual(item[valueKey], val)))
        : [];
    const hasValue = !!selectedItems.length;

    let selectedLabel = hasValue
      ? tplTransform(locale.selectedValues, selectedItems.length)
      : placeholder;
    if (renderValue && hasValue) {
      selectedLabel = renderValue(value, selectedItems);
    }

    const classes = getToggleWrapperClassName('check', this.addPrefix, this.props, hasValue);

    return (
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
        <div
          className={classes}
          style={style}
          onKeyDown={this.handleKeyDown}
          tabIndex={-1}
          role="menu"
          ref={this.bindContainerRef}
        >
          <PickerToggle
            {...unhandled}
            componentClass={toggleComponentClass}
            onClean={this.handleClean}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
          >
            {selectedLabel || locale.placeholder}
          </PickerToggle>
        </div>
      </OverlayTrigger>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'picker'
});

export default enhance(Dropdown);
