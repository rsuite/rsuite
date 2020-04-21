import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import shallowEqual from '../utils/shallowEqual';
import { filterNodesOfTree } from '../utils/treeUtils';
import {
  defaultProps,
  prefix,
  getUnhandledProps,
  createChainedFunction,
  getDataGroupBy
} from '../utils';

import IntlProvider from '../IntlProvider';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import {
  DropdownMenuCheckItem as DropdownMenuItem,
  PickerToggle,
  getToggleWrapperClassName,
  onMenuKeyDown,
  MenuWrapper,
  SearchBar,
  SelectedElement,
  PickerToggleTrigger,
  shouldDisplay
} from '../Picker';
import DropdownMenu, { dropdownMenuPropTypes } from '../Picker/DropdownMenu';
import { CheckPickerProps } from './CheckPicker.d';
import { PLACEMENT } from '../constants';
import { ItemDataType } from '../@types/common';

interface CheckPickerState {
  value?: any[];
  // Used to focus the active item  when trigger `onKeydown`
  focusItemValue?: any;
  searchKeyword: string;
  stickyItems?: any[];
  active?: boolean;
}

class CheckPicker extends React.Component<CheckPickerProps, CheckPickerState> {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'subtle']),
    data: PropTypes.array,
    locale: PropTypes.object,
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    containerPadding: PropTypes.number,
    block: PropTypes.bool,
    toggleComponentClass: PropTypes.elementType,
    menuClassName: PropTypes.string,
    menuStyle: PropTypes.object,
    menuAutoWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledItemValues: PropTypes.array,
    maxHeight: PropTypes.number,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    value: PropTypes.array,
    defaultValue: PropTypes.array,
    renderMenu: PropTypes.func,
    renderMenuItem: PropTypes.func,
    renderMenuGroup: PropTypes.func,
    renderValue: PropTypes.func,
    renderExtraFooter: PropTypes.func,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onGroupTitleClick: PropTypes.func,
    onSearch: PropTypes.func,
    onClean: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onHide: PropTypes.func,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    groupBy: PropTypes.any,
    sort: PropTypes.func,
    placeholder: PropTypes.node,
    searchable: PropTypes.bool,
    cleanable: PropTypes.bool,
    countable: PropTypes.bool,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    placement: PropTypes.oneOf(PLACEMENT),
    style: PropTypes.object,
    sticky: PropTypes.bool,
    preventOverflow: PropTypes.bool,
    virtualized: PropTypes.bool,
    searchBy: PropTypes.func
  };
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
      noResultsText: 'No results found'
    },
    placement: 'bottomStart',
    searchable: true,
    cleanable: true,
    countable: true,
    menuAutoWidth: true,
    virtualized: true
  };
  positionRef: React.RefObject<any>;
  menuContainerRef: React.RefObject<any>;
  toggleRef: React.RefObject<any>;
  triggerRef: React.RefObject<any>;

  constructor(props: CheckPickerProps) {
    super(props);

    const { value, defaultValue, groupBy, valueKey, labelKey } = props;
    const nextValue = _.clone(value || defaultValue) || [];

    this.state = {
      value: nextValue,
      // Used to hover the active item  when trigger `onKeydown`
      focusItemValue: nextValue ? nextValue[0] : undefined,
      searchKeyword: ''
    };

    this.positionRef = React.createRef();
    this.menuContainerRef = React.createRef();
    this.toggleRef = React.createRef();
    this.triggerRef = React.createRef();

    if (groupBy === valueKey || groupBy === labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }
  }

  getFocusableMenuItems = () => {
    const { menuItems } = this.menuContainerRef.current;
    if (!menuItems) {
      return [];
    }
    const items = Object.values(menuItems).map((item: any) => item.props.getItemData());

    return filterNodesOfTree(items, item => this.shouldDisplay(item));
  };

  getValue() {
    const { value } = this.props;
    const nextValue = _.isUndefined(value) ? this.state.value : value;
    return _.clone(nextValue) || [];
  }

  setStickyItems = () => {
    const { sticky, data, valueKey } = this.props;
    const value = this.getValue();

    if (!sticky) {
      return;
    }

    let stickyItems = [];
    if (data && value.length) {
      stickyItems = data.filter(item => {
        return value.some(v => v === item[valueKey]);
      });
    }

    this.setState({
      stickyItems
    });
  };

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  shouldDisplay(item: ItemDataType, word?: string) {
    const { labelKey, searchBy } = this.props;
    const label = item?.[labelKey];
    const searchKeyword = typeof word === 'undefined' ? this.state.searchKeyword : word;

    if (typeof searchBy === 'function') {
      return searchBy(searchKeyword, label, item);
    }

    return shouldDisplay(label, searchKeyword);
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
  focusNextMenuItem = () => {
    const { valueKey } = this.props;
    this.findNode((items, index) => {
      const focusItem = items[index + 1];
      if (!_.isUndefined(focusItem)) {
        this.setState({ focusItemValue: focusItem[valueKey] });
      }
    });
  };
  focusPrevMenuItem = () => {
    const { valueKey } = this.props;
    this.findNode((items, index) => {
      const focusItem = items[index - 1];
      if (!_.isUndefined(focusItem)) {
        this.setState({ focusItemValue: focusItem[valueKey] });
      }
    });
  };

  selectFocusMenuItem = (event: React.SyntheticEvent<HTMLElement>) => {
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

    const focusItem: any = data.find(item => shallowEqual(item?.[valueKey], focusItemValue));

    this.setState({ value });
    this.handleSelect(value, focusItem, event);
    this.handleChangeValue(value, event);
  };

  handleKeyDown = (event: React.KeyboardEvent<any>) => {
    const { focusItemValue, active } = this.state;

    // enter
    if ((!focusItemValue || !active) && event.keyCode === 13) {
      this.handleToggleDropdown();
    }

    // delete
    if (event.keyCode === 8 && event.target === this.toggleRef?.current?.getToggleNode?.()) {
      this.handleClean(event);
    }

    if (!this.menuContainerRef.current) {
      return;
    }
    onMenuKeyDown(event, {
      down: this.focusNextMenuItem,
      up: this.focusPrevMenuItem,
      enter: this.selectFocusMenuItem,
      esc: this.handleCloseDropdown
    });
  };

  handleItemSelect = (
    nextItemValue: any,
    item: ItemDataType,
    event: React.MouseEvent<any>,
    checked: boolean
  ) => {
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

    this.setState(nextState);
    this.handleSelect(value, item, event);
    this.handleChangeValue(value, event);
  };

  handleSelect = (
    nextItemValue: any,
    item: ItemDataType,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    this.props.onSelect?.(nextItemValue, item, event);
  };

  handleChangeValue = (value: any, event: React.SyntheticEvent<HTMLElement>) => {
    this.props.onChange?.(value, event);
  };

  handleSearch = (searchKeyword: string, event: React.SyntheticEvent<HTMLElement>) => {
    const { onSearch, valueKey, data } = this.props;
    const filteredData = filterNodesOfTree(data, item => this.shouldDisplay(item, searchKeyword));
    this.setState({
      searchKeyword,
      focusItemValue: filteredData?.[0]?.[valueKey]
    });

    onSearch?.(searchKeyword, event);
  };

  handleCloseDropdown = () => {
    const value = this.getValue();
    if (this.triggerRef.current) {
      this.triggerRef.current.hide();
    }
    this.setState({
      focusItemValue: value ? value[0] : undefined
    });
  };

  handleOpenDropdown = () => {
    if (this.triggerRef.current) {
      this.triggerRef.current.show();
    }
  };

  open = () => {
    this.handleOpenDropdown?.();
  };
  close = () => {
    this.handleCloseDropdown?.();
  };

  handleToggleDropdown = () => {
    const { active } = this.state;
    if (active) {
      this.handleCloseDropdown();
      return;
    }
    this.handleOpenDropdown();
  };

  handleClean = (event: React.SyntheticEvent<any>) => {
    const { disabled, cleanable } = this.props;

    if (disabled || !cleanable) {
      return;
    }

    this.setState({ value: [] });
    this.handleChangeValue([], event);
  };

  handleExit = () => {
    this.props.onClose?.();
    this.setState({
      searchKeyword: '',
      focusItemValue: null,
      active: false
    });
  };

  handleOpen = () => {
    this.props.onOpen?.();
    this.setState({
      active: true
    });
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  menuContainer = {
    menuItems: null
  };

  getPositionInstance = () => {
    return this.positionRef.current;
  };

  getToggleInstance = () => {
    return this.toggleRef.current;
  };

  renderDropdownMenu() {
    const {
      data,
      valueKey,
      groupBy,
      searchable,
      renderExtraFooter,
      locale,
      renderMenu,
      menuClassName,
      menuStyle,
      menuAutoWidth,
      sort,
      virtualized
    } = this.props;

    const { focusItemValue, stickyItems } = this.state;
    const classes = classNames(this.addPrefix('check-menu'), menuClassName);
    let filteredData = [];
    let filteredStickyItems = [];

    if (stickyItems) {
      filteredStickyItems = filterNodesOfTree(stickyItems, item => this.shouldDisplay(item));
      filteredData = filterNodesOfTree(data, item => {
        return this.shouldDisplay(item) && !stickyItems.some(v => v[valueKey] === item[valueKey]);
      });
    } else {
      filteredData = filterNodesOfTree(data, item => this.shouldDisplay(item));
    }

    // Create a tree structure data when set `groupBy`
    if (groupBy) {
      filteredData = getDataGroupBy(filteredData, groupBy, sort);
    } else if (typeof sort === 'function') {
      filteredData = filteredData.sort(sort(false));
    }

    const menuProps = _.pick(
      this.props,
      Object.keys(_.omit(dropdownMenuPropTypes, ['className', 'style', 'classPrefix']))
    );

    const menu =
      filteredData.length || filteredStickyItems.length ? (
        <DropdownMenu
          {...menuProps}
          classPrefix={this.addPrefix('check-menu')}
          dropdownMenuItemComponentClass={DropdownMenuItem}
          ref={this.menuContainerRef}
          activeItemValues={this.getValue()}
          focusItemValue={focusItemValue}
          data={[...filteredStickyItems, ...filteredData]}
          group={!_.isUndefined(groupBy)}
          onSelect={this.handleItemSelect}
          virtualized={virtualized}
        />
      ) : (
        <div className={this.addPrefix('none')}>{locale.noResultsText}</div>
      );

    return (
      <MenuWrapper
        autoWidth={menuAutoWidth}
        className={classes}
        style={menuStyle}
        onKeyDown={this.handleKeyDown}
        getToggleInstance={this.getToggleInstance}
        getPositionInstance={this.getPositionInstance}
      >
        {searchable && (
          <SearchBar
            placeholder={locale.searchPlaceholder}
            onChange={this.handleSearch}
            value={this.state.searchKeyword}
          />
        )}
        {renderMenu ? renderMenu(menu) : menu}
        {renderExtraFooter?.()}
      </MenuWrapper>
    );
  }

  render() {
    const {
      data,
      valueKey,
      labelKey,
      placeholder,
      renderValue,
      disabled,
      cleanable,
      locale,
      toggleComponentClass,
      style,
      onEnter,
      onEntered,
      onExited,
      onClean,
      countable,
      ...rest
    } = this.props;

    const unhandled = getUnhandledProps(CheckPicker, rest);
    const value = this.getValue();
    const selectedItems: any[] =
      data.filter(item => value.some(val => shallowEqual(item[valueKey], val))) || [];

    const count = selectedItems.length;
    const hasValue = !!count;

    let selectedElement: React.ReactNode = placeholder;

    if (count > 0) {
      selectedElement = (
        <SelectedElement
          selectedItems={selectedItems}
          countable={countable}
          valueKey={valueKey}
          labelKey={labelKey}
          prefix={this.addPrefix}
        />
      );

      if (renderValue) {
        selectedElement = renderValue(value, selectedItems, selectedElement);
      }
    }

    const classes = getToggleWrapperClassName('check', this.addPrefix, this.props, hasValue);

    return (
      <IntlProvider locale={locale}>
        <PickerToggleTrigger
          pickerProps={this.props}
          ref={this.triggerRef}
          positionRef={this.positionRef}
          onEnter={createChainedFunction(this.setStickyItems, onEnter)}
          onEntered={createChainedFunction(this.handleOpen, onEntered)}
          onExit={createChainedFunction(this.handleExit, onExited)}
          speaker={this.renderDropdownMenu()}
        >
          <div className={classes} style={style}>
            <PickerToggle
              {...unhandled}
              ref={this.toggleRef}
              onClean={createChainedFunction(this.handleClean, onClean)}
              onKeyDown={this.handleKeyDown}
              componentClass={toggleComponentClass}
              cleanable={cleanable && !disabled}
              hasValue={hasValue}
              active={this.state.active}
            >
              {selectedElement || <FormattedMessage id="placeholder" />}
            </PickerToggle>
          </div>
        </PickerToggleTrigger>
      </IntlProvider>
    );
  }
}

export default defaultProps({
  classPrefix: 'picker'
})(CheckPicker);
