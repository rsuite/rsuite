// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import { MenuWrapper } from 'rsuite-utils/lib/Picker';
import InputAutosize from 'react-input-autosize';
import { getWidth } from 'dom-lib';
import {
  reactToString,
  filterNodesOfTree,
  findNodeOfTree,
  shallowEqual
} from 'rsuite-utils/lib/utils';

import {
  defaultProps,
  prefix,
  getUnhandledProps,
  createChainedFunction,
  tplTransform,
  getDataGroupBy
} from '../utils';

import DropdownMenu from '../_picker/DropdownMenu';
import DropdownMenuItem from '../_picker/DropdownMenuItem';
import DropdownMenuCheckItem from '../_picker/DropdownMenuCheckItem';
import getToggleWrapperClassName from '../_picker/getToggleWrapperClassName';
import onMenuKeyDown from '../_picker/onMenuKeyDown';
import Toggle from './Toggle';
import InputSearch from './InputSearch';
import Tag from '../Tag';
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
  valueKey: string,
  labelKey: string,
  value?: any | Array<any>,
  defaultValue?: any | Array<any>,
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
  style?: Object,
  creatable?: boolean,
  multi?: boolean
};

type States = {
  value?: any | Array<any>,
  // Used to focus the active item  when trigger `onKeydown`
  focusItemValue?: any,
  searchKeyword: string,
  open?: boolean,
  newData: Array<any>,
  maxWidth: number
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
      noResultsText: 'No results found',
      newItem: 'New item',
      createOption: 'Create option "{0}"'
    },
    searchable: true,
    cleanable: true,
    placement: 'bottomLeft'
  };

  constructor(props: Props) {
    super(props);

    const { defaultValue, groupBy, valueKey, labelKey, defaultOpen, multi } = props;
    const value: any = multi ? defaultValue || [] : defaultValue;
    const focusItemValue = multi ? value[0] : defaultValue;

    this.state = {
      value,
      focusItemValue,
      searchKeyword: '',
      newData: [],
      open: defaultOpen,
      maxWidth: 100
    };

    if (groupBy === valueKey || groupBy === labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }
  }
  componentDidMount() {
    if (this.toggleWrapper) {
      const maxWidth = getWidth(this.toggleWrapper);
      this.setState({ maxWidth });
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
    const { value, multi } = this.props;
    const nextValue = _.isUndefined(value) ? this.state.value : value;

    if (multi) {
      return _.clone(nextValue) || [];
    }
    return nextValue;
  }

  getAllData() {
    const { data } = this.props;
    const { newData } = this.state;
    return [].concat(data, newData);
  }

  createOption(value: string) {
    const { valueKey, labelKey, groupBy, locale } = this.props;
    if (groupBy) {
      return {
        create: true,
        [groupBy]: locale.newItem,
        [valueKey]: value,
        [labelKey]: value
      };
    }

    return {
      create: true,
      [valueKey]: value,
      [labelKey]: value
    };
  }

  menuContainer = {
    menuItems: null
  };

  bindMenuContainerRef = (ref: React.ElementRef<*>) => {
    this.menuContainer = ref;
  };

  input = null;

  bindInputRef = (ref: React.ElementRef<*>) => {
    this.input = ref;
  };

  focusInput() {
    if (!this.input) return;
    this.input.focus();
  }

  blurInput() {
    if (!this.input) return;
    this.input.blur();
  }

  trigger = null;

  bindTriggerRef = (ref: React.ElementRef<*>) => {
    this.trigger = ref;
  };

  toggleWrapper = null;

  bindToggleWrapperRef = (ref: React.ElementRef<*>) => {
    this.toggleWrapper = ref;
  };

  position = null;

  bindPositionRef = (ref: React.ElementRef<*>) => {
    this.position = ref;
  };

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  shouldDisplay(label: any, searchKeyword?: string) {
    const word = typeof searchKeyword === 'undefined' ? this.state.searchKeyword : searchKeyword;
    if (!_.trim(word)) {
      return true;
    }

    const keyword = word.toLocaleLowerCase();

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

  updatePosition() {
    if (this.position) {
      this.position.updatePosition(true);
    }
  }

  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    if (!this.menuContainer) {
      return;
    }

    const { multi } = this.props;

    onMenuKeyDown(event, {
      down: this.focusNextMenuItem,
      up: this.focusPrevMenuItem,
      enter: multi ? this.selectFocusMenuCheckItem : this.selectFocusMenuItem,
      esc: this.closeDropdown
    });
  };

  selectFocusMenuItem = (event: DefaultEvent) => {
    const { focusItemValue, searchKeyword } = this.state;
    const { valueKey } = this.props;
    if (!focusItemValue) {
      return;
    }

    // Find active `MenuItem` by `value`
    let focusItem = findNodeOfTree(this.getAllData(), item =>
      shallowEqual(item[valueKey], focusItemValue)
    );

    if (!focusItem && focusItemValue === searchKeyword) {
      focusItem = this.createOption(searchKeyword);
    }

    this.setState({ value: focusItemValue });
    this.handleSelect(focusItemValue, focusItem, event);
    this.handleChange(focusItemValue, event);
    this.closeDropdown();
  };

  selectFocusMenuCheckItem = (event: DefaultEvent) => {
    const value: any = this.getValue();
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

    this.setState({ value }, this.updatePosition);
    this.handleSelect(value, focusItem, event);
    this.handleChange(value, event);
  };

  handleItemSelect = (value: any, item: Object, event: DefaultEvent) => {
    const nextState = {
      value,
      focusItemValue: value
    };
    this.setState(nextState);
    this.handleSelect(value, item, event);
    this.handleChange(value, event);
    this.closeDropdown();
  };

  handleCheckItemSelect = (
    nextItemValue: any,
    item: Object,
    event: DefaultEvent,
    checked: boolean
  ) => {
    const value: any = this.getValue();

    if (checked) {
      value.push(nextItemValue);
    } else {
      _.remove(value, itemVal => shallowEqual(itemVal, nextItemValue));
    }

    const nextState = {
      value,
      focusItemValue: nextItemValue
    };

    this.setState(nextState, this.updatePosition);
    this.handleSelect(value, item, event);
    this.handleChange(value, event);
  };

  handleSelect = (value: any, item: Object, event: DefaultEvent) => {
    const { onSelect, creatable } = this.props;
    const { newData } = this.state;

    onSelect && onSelect(value, item, event);

    if (creatable && item.create) {
      delete item.create;
      this.setState({
        newData: newData.concat(item)
      });
    }
  };

  handleSearch = (searchKeyword: string, event: DefaultEvent) => {
    const { onSearch, labelKey, valueKey } = this.props;
    const filteredData = filterNodesOfTree(this.getAllData(), item =>
      this.shouldDisplay(item[labelKey], searchKeyword)
    );

    this.setState({
      searchKeyword,
      focusItemValue: filteredData.length ? filteredData[0][valueKey] : searchKeyword
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
      focusItemValue: null,
      searchKeyword: ''
    };

    this.setState(nextState, () => {
      this.handleChange(null, event);
      this.updatePosition();
    });
  };

  handleEntered = () => {
    const { onOpen } = this.props;
    onOpen && onOpen();
  };

  handleExited = () => {
    const { onClose } = this.props;
    onClose && onClose();
    const value = this.getValue();
    this.setState({
      focusItemValue: value
    });
  };

  handleEnter = () => {
    this.focusInput();
    this.setState({ open: true });
  };

  handleExit = () => {
    this.blurInput();
    this.setState({ open: false });
  };

  handleRemoveTag = (tag: string) => {
    const value = this.getValue();
    _.remove(value, itemVal => shallowEqual(itemVal, tag));
    this.setState({ value }, this.updatePosition);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderMenuItem = (label, item) => {
    const { locale, renderMenuItem } = this.props;
    const newLabel = item.create ? <span>{tplTransform(locale.createOption, label)}</span> : label;
    return renderMenuItem ? renderMenuItem(newLabel, item) : newLabel;
  };

  renderDropdownMenu() {
    const {
      labelKey,
      groupBy,
      placement,
      locale,
      renderMenu,
      renderExtraFooter,
      menuClassName,
      menuStyle,
      creatable,
      valueKey,
      multi
    } = this.props;

    const { focusItemValue, searchKeyword } = this.state;
    const menuClassPrefix = this.addPrefix(multi ? 'check-menu' : 'select-menu');
    const classes = classNames(
      menuClassPrefix,
      menuClassName,
      this.addPrefix(`placement-${_.kebabCase(placement)}`)
    );

    const allData = this.getAllData();

    let filteredData = filterNodesOfTree(allData, item => this.shouldDisplay(item[labelKey]));

    if (
      creatable &&
      searchKeyword &&
      !findNodeOfTree(allData, item => item[valueKey] === searchKeyword)
    ) {
      filteredData = [...filteredData, this.createOption(searchKeyword)];
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

    const value = this.getValue();
    const menu = filteredData.length ? (
      <DropdownMenu
        {...menuProps}
        style={menuStyle}
        classPrefix={menuClassPrefix}
        dropdownMenuItemClassPrefix={`${menuClassPrefix}-item`}
        dropdownMenuItemComponentClass={multi ? DropdownMenuCheckItem : DropdownMenuItem}
        ref={this.bindMenuContainerRef}
        activeItemValues={multi ? value : [value]}
        focusItemValue={focusItemValue}
        data={filteredData}
        group={!_.isUndefined(groupBy)}
        onSelect={multi ? this.handleCheckItemSelect : this.handleItemSelect}
        renderMenuItem={this.renderMenuItem}
      />
    ) : (
      <div className={this.addPrefix('none')}>{locale.noResultsText}</div>
    );

    return (
      <MenuWrapper className={classes} onKeyDown={this.handleKeyDown}>
        {renderMenu ? renderMenu(menu) : menu}
        {renderExtraFooter && renderExtraFooter()}
      </MenuWrapper>
    );
  }

  renderSingleValue() {
    const { renderValue, placeholder, valueKey, labelKey } = this.props;
    const value = this.getValue();

    // Find active `MenuItem` by `value`
    const activeItem = findNodeOfTree(this.getAllData(), item =>
      shallowEqual(item[valueKey], value)
    );
    let displayElement = placeholder;

    if (_.get(activeItem, labelKey)) {
      displayElement = _.get(activeItem, labelKey);

      if (renderValue) {
        displayElement = renderValue(value, activeItem);
      }
    }
    return displayElement;
  }

  renderMultiValue() {
    const { multi, classPrefix } = this.props;
    if (!multi) {
      return null;
    }

    const value = this.getValue() || [];
    //classPrefix={`${classPrefix}-tag`}
    const tag = value.map(tag => {
      return (
        <Tag
          key={tag}
          closable
          onClose={() => {
            this.handleRemoveTag(tag);
          }}
        >
          {tag}
        </Tag>
      );
    });
    return tag;
  }

  renderInputSearch() {
    const { multi } = this.props;
    const props: Object = {
      componentClass: 'input'
    };

    if (multi) {
      props.componentClass = InputAutosize;
      props.inputStyle = { maxWidth: this.state.maxWidth };
    }

    return (
      <InputSearch
        {...props}
        inputRef={this.bindInputRef}
        onChange={this.handleSearch}
        value={this.state.open ? this.state.searchKeyword : ''}
      />
    );
  }

  render() {
    const {
      data,
      className,
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
      searchable,
      multi,
      ...rest
    } = this.props;

    const unhandled = getUnhandledProps(Dropdown, rest);
    const value: any = this.getValue();
    const hasValue = multi ? !!value.length : !!value;

    const classes = getToggleWrapperClassName('input', this.addPrefix, this.props, hasValue, {
      [this.addPrefix('multi')]: multi,
      [this.addPrefix('focused')]: this.state.open
    });

    const searching = !!this.state.searchKeyword && this.state.open;
    const displaySearchInput = searchable && !disabled;

    return (
      <OverlayTrigger
        ref={this.bindTriggerRef}
        open={open}
        defaultOpen={defaultOpen}
        disabled={disabled}
        trigger="focus"
        placement={placement}
        onEnter={createChainedFunction(this.handleEnter, onEnter)}
        onEntered={createChainedFunction(this.handleEntered, onEntered)}
        onEntering={onEntering}
        onExit={createChainedFunction(this.handleExit, onExit)}
        onExited={createChainedFunction(this.handleExited, onExited)}
        onExiting={onExiting}
        speaker={this.renderDropdownMenu()}
        container={container}
        containerPadding={containerPadding}
        positionRef={this.bindPositionRef}
      >
        <div
          className={classes}
          style={style}
          onKeyDown={this.handleKeyDown}
          tabIndex={-1}
          role="menu"
          ref={this.bindToggleWrapperRef}
        >
          <Toggle
            {...unhandled}
            componentClass={toggleComponentClass}
            onClean={this.handleClean}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
          >
            {searching || (multi && hasValue)
              ? null
              : this.renderSingleValue() || locale.placeholder}
          </Toggle>
          <div className={this.addPrefix('tag-wrapper')}>
            {this.renderMultiValue()}
            {displaySearchInput && this.renderInputSearch()}
          </div>
        </div>
      </OverlayTrigger>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'picker'
});

export default enhance(Dropdown);
