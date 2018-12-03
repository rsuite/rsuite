// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import { IntlProvider, FormattedMessage } from 'rsuite-intl';
import { defaultProps, prefix, getUnhandledProps, createChainedFunction } from '../utils';
import type { Placement } from '../utils/TypeDefinition';

import {
  reactToString,
  filterNodesOfTree,
  getDataGroupBy,
  shallowEqual,
  tplTransform
} from 'rsuite-utils/lib/utils';

import {
  DropdownMenu,
  DropdownMenuCheckItem as DropdownMenuItem,
  PickerToggle,
  getToggleWrapperClassName,
  onMenuKeyDown,
  MenuWrapper,
  SearchBar,
  SelectedElement
} from '../_picker';

type DefaultEvent = SyntheticEvent<*>;
type DefaultEventFunction = (event: DefaultEvent) => void;

type Props = {
  appearance: 'default' | 'subtle',
  data: any[],
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
  disabledItemValues?: any[],
  maxHeight?: number,
  valueKey?: string,
  labelKey?: string,
  value?: any[],
  defaultValue?: any[],
  renderMenu?: (menu: React.Node) => React.Node,
  renderMenuItem?: (itemLabel: React.Node, item: Object) => React.Node,
  renderMenuGroup?: (title: React.Node, item: Object) => React.Node,
  renderValue?: (value: any[], items: any[]) => React.Node,
  renderExtraFooter?: () => React.Node,
  onChange?: (value: any[], event: DefaultEvent) => void,
  onSelect?: (value: any, item: Object, event: DefaultEvent) => void,
  onGroupTitleClick?: DefaultEventFunction,
  onSearch?: (searchKeyword: string, event: DefaultEvent) => void,
  onOpen?: () => void,
  onClose?: () => void,
  onHide?: () => void,
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
  countable?: boolean,
  open?: boolean,
  defaultOpen?: boolean,
  placement?: Placement,
  style?: Object,
  sticky?: boolean
};

type State = {
  value?: any[],
  // Used to focus the active item  when trigger `onKeydown`
  focusItemValue?: any,
  searchKeyword: string,
  stickyItems?: any[]
};

class Dropdown extends React.Component<Props, State> {
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
    searchable: true,
    cleanable: true,
    countable: true,
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

  selectFocusMenuItem = (event: DefaultEvent) => {
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
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    if (!this.menuContainer) {
      return;
    }
    onMenuKeyDown(event, {
      down: this.focusNextMenuItem,
      up: this.focusPrevMenuItem,
      enter: this.selectFocusMenuItem,
      esc: this.closeDropdown
    });
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

  position = null;

  bindPositionRef = (ref: React.ElementRef<*>) => {
    this.position = ref;
  };

  getPositionInstance = () => {
    return this.position;
  };

  renderDropdownMenu() {
    const {
      data,
      labelKey,
      valueKey,
      groupBy,
      searchable,
      renderExtraFooter,
      locale,
      placement,
      renderMenu,
      menuClassName,
      menuStyle
    } = this.props;

    const { focusItemValue, stickyItems } = this.state;
    const classes = classNames(
      this.addPrefix('check-menu'),
      this.addPrefix(`placement-${_.kebabCase(placement)}`),
      menuClassName
    );
    let filteredData = [];
    let filteredStickyItems = [];

    if (stickyItems) {
      filteredStickyItems = filterNodesOfTree(stickyItems, item =>
        this.shouldDisplay(item[labelKey])
      );
      filteredData = filterNodesOfTree(data, item => {
        return (
          this.shouldDisplay(item[labelKey]) &&
          !stickyItems.some(v => v[valueKey] === item[valueKey])
        );
      });
    } else {
      filteredData = filterNodesOfTree(data, item => this.shouldDisplay(item[labelKey]));
    }

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

    const menu = filteredData.length ? (
      <DropdownMenu
        {...menuProps}
        classPrefix={this.addPrefix('check-menu')}
        dropdownMenuItemClassPrefix={this.addPrefix('check-menu-item')}
        dropdownMenuItemComponentClass={DropdownMenuItem}
        ref={this.bindMenuContainerRef}
        activeItemValues={this.getValue()}
        focusItemValue={focusItemValue}
        data={[...filteredStickyItems, ...filteredData]}
        group={!_.isUndefined(groupBy)}
        onSelect={this.handleItemSelect}
      />
    ) : (
      <div className={this.addPrefix('none')}>{locale.noResultsText}</div>
    );

    return (
      <MenuWrapper
        className={classes}
        style={menuStyle}
        onKeyDown={this.handleKeyDown}
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
      onHide,
      appearance,
      countable,
      ...rest
    } = this.props;

    const unhandled = getUnhandledProps(Dropdown, rest);
    const value = this.getValue();
    const selectedItems =
      data.filter(item => value.some(val => shallowEqual(item[valueKey], val))) || [];

    const count = selectedItems.length;
    const hasValue = !!count;

    let selectedElement = placeholder;

    if (renderValue) {
      selectedElement = renderValue(value, selectedItems);
    } else if (count > 0) {
      selectedElement = (
        <SelectedElement
          selectedItems={selectedItems}
          countable={countable}
          valueKey={valueKey}
          labelKey={labelKey}
          prefix={this.addPrefix}
        />
      );
    }

    const classes = getToggleWrapperClassName('check', this.addPrefix, this.props, hasValue);

    return (
      <IntlProvider locale={locale}>
        <OverlayTrigger
          ref={this.bindTriggerRef}
          positionRef={this.bindPositionRef}
          open={open}
          defaultOpen={defaultOpen}
          disabled={disabled}
          trigger="click"
          placement={placement}
          onEnter={createChainedFunction(this.setStickyItems, onEnter)}
          onEntering={onEntering}
          onEntered={createChainedFunction(this.handleOpen, onEntered)}
          onExit={onExit}
          onExiting={onExiting}
          onExited={createChainedFunction(this.handleExited, onExited)}
          onHide={onHide}
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
              {selectedElement || <FormattedMessage id="placeholder" />}
            </PickerToggle>
          </div>
        </OverlayTrigger>
      </IntlProvider>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'picker'
});

export default enhance(Dropdown);
