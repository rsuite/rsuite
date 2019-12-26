import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import compose from 'recompose/compose';
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
  getDataGroupBy,
  withPickerMethods
} from '../utils';

import {
  DropdownMenuItem,
  DropdownMenuCheckItem,
  getToggleWrapperClassName,
  onMenuKeyDown,
  PickerToggle,
  MenuWrapper,
  PickerToggleTrigger
} from '../Picker';
import DropdownMenu, { dropdownMenuPropTypes } from '../Picker/DropdownMenu';
import InputAutosize from './InputAutosize';
import InputSearch from './InputSearch';
import Tag from '../Tag';
import { InputPickerProps } from './InputPicker.d';
import { PLACEMENT } from '../constants';

interface InputPickerState {
  data?: any[];
  value?: any | any[];
  // Used to focus the active item  when trigger `onKeydown`
  focusItemValue?: any;
  searchKeyword?: string;
  open?: boolean;
  newData?: any[];
  maxWidth?: number;
}

class InputPicker extends React.Component<InputPickerProps, InputPickerState> {
  static propTypes = {
    data: PropTypes.array,
    cacheData: PropTypes.array,
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
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    placeholder: PropTypes.node,
    searchable: PropTypes.bool,
    cleanable: PropTypes.bool,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    placement: PropTypes.oneOf(PLACEMENT),
    style: PropTypes.object,
    creatable: PropTypes.bool,
    multi: PropTypes.bool,
    preventOverflow: PropTypes.bool,
    groupBy: PropTypes.any,
    sort: PropTypes.func,
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
    virtualized: PropTypes.bool
  };
  static defaultProps = {
    data: [],
    cacheData: [],
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
    placement: 'bottomStart',
    searchable: true,
    cleanable: true,
    menuAutoWidth: true,
    virtualized: true
  };
  menuContainerRef: React.RefObject<any>;
  positionRef: React.RefObject<any>;
  toggleWrapperRef: React.RefObject<any>;
  toggleRef: React.RefObject<any>;
  triggerRef: React.RefObject<any>;
  inputRef: React.RefObject<any>;

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data && !shallowEqual(nextProps.data, prevState.data)) {
      return {
        data: nextProps.data,
        focusItemValue: _.get(nextProps, `data.0.${nextProps.valueKey}`)
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const { defaultValue, groupBy, valueKey, labelKey, defaultOpen, multi, data } = props;
    const value: any = multi ? defaultValue || [] : defaultValue;
    const focusItemValue = multi ? _.get(value, 0) : defaultValue;

    this.state = {
      data,
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

    this.menuContainerRef = React.createRef();
    this.positionRef = React.createRef();
    this.toggleWrapperRef = React.createRef();
    this.toggleRef = React.createRef();
    this.triggerRef = React.createRef();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    if (this.toggleWrapperRef.current) {
      const maxWidth = getWidth(this.toggleWrapperRef.current);
      this.setState({ maxWidth });
    }
  }

  getFocusableMenuItems = () => {
    const { labelKey } = this.props;
    const { menuItems } = this.menuContainerRef.current;
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

  getAllDataAndCache() {
    const { cacheData } = this.props;
    const data = this.getAllData();
    return [].concat(data, cacheData);
  }

  getLabelByValue(value: any) {
    const { renderValue, placeholder, valueKey, labelKey } = this.props;
    // Find active `MenuItem` by `value`
    const activeItem = findNodeOfTree(this.getAllDataAndCache(), item =>
      shallowEqual(item[valueKey], value)
    );
    let displayElement: React.ReactNode = placeholder;

    if (_.get(activeItem, labelKey)) {
      displayElement = _.get(activeItem, labelKey);

      if (renderValue) {
        displayElement = renderValue(value, activeItem, displayElement);
      }
    }

    return {
      isValid: !!activeItem,
      displayElement
    };
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

  focusInput() {
    const input = this.getInput();
    if (!input) return;

    input.focus();
  }

  blurInput() {
    const input = this.getInput();
    if (!input) return;
    input.blur();
  }

  getInput() {
    const { multi } = this.props;
    if (multi) {
      return this.inputRef.current.getInputInstance();
    }

    return this.inputRef.current;
  }

  getToggleInstance = () => {
    return this.toggleRef.current;
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
    if (this.positionRef.current) {
      this.positionRef.current.updatePosition(true);
    }
  }

  handleKeyDown = (event: React.KeyboardEvent) => {
    if (!this.menuContainerRef.current) {
      return;
    }

    const { multi } = this.props;

    onMenuKeyDown(event, {
      down: this.focusNextMenuItem,
      up: this.focusPrevMenuItem,
      enter: multi ? this.selectFocusMenuCheckItem : this.selectFocusMenuItem,
      esc: this.handleCloseDropdown,
      del: multi ? this.removeLastItem : this.handleClean
    });
  };
  handleClick = () => {
    this.focusInput();
  };

  selectFocusMenuItem = (event: React.KeyboardEvent) => {
    const { focusItemValue, searchKeyword } = this.state;
    const { valueKey, data, disabledItemValues } = this.props;
    if (!focusItemValue || !data) {
      return;
    }

    // If the value is disabled in this option, it is returned.
    if (disabledItemValues?.some(item => item === focusItemValue)) {
      return;
    }

    // Find active `MenuItem` by `value`
    let focusItem = findNodeOfTree(this.getAllData(), item =>
      shallowEqual(item[valueKey], focusItemValue)
    );

    if (!focusItem && focusItemValue === searchKeyword) {
      focusItem = this.createOption(searchKeyword);
    }

    this.setState({ value: focusItemValue, searchKeyword: '' });
    this.handleSelect(focusItemValue, focusItem, event);
    this.handleChange(focusItemValue, event);
    this.handleCloseDropdown();
  };

  selectFocusMenuCheckItem = (event: React.KeyboardEvent) => {
    const { valueKey, disabledItemValues } = this.props;
    const { focusItemValue } = this.state;
    const value: any = this.getValue();
    const data = this.getAllData();

    if (!focusItemValue || !data) {
      return;
    }

    // If the value is disabled in this option, it is returned.
    if (disabledItemValues?.some(item => item === focusItemValue)) {
      return;
    }

    if (!value.some(v => shallowEqual(v, focusItemValue))) {
      value.push(focusItemValue);
    } else {
      _.remove(value, itemVal => shallowEqual(itemVal, focusItemValue));
    }

    let focusItem: any = data.find(item => shallowEqual(_.get(item, valueKey), focusItemValue));

    if (!focusItem) {
      focusItem = this.createOption(focusItemValue);
    }

    this.setState({ value, searchKeyword: '' }, this.updatePosition);
    this.handleSelect(value, focusItem, event);
    this.handleChange(value, event);
  };

  handleItemSelect = (value: any, item: any, event: React.MouseEvent) => {
    const nextState = {
      value,
      focusItemValue: value,
      searchKeyword: ''
    };
    this.setState(nextState);
    this.handleSelect(value, item, event);
    this.handleChange(value, event);
    this.handleCloseDropdown();
  };

  handleCheckItemSelect = (
    nextItemValue: any,
    item: any,
    event: React.MouseEvent,
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
      searchKeyword: '',
      focusItemValue: nextItemValue
    };

    this.setState(nextState, this.updatePosition);
    this.handleSelect(value, item, event);
    this.handleChange(value, event);
    this.focusInput();
  };

  handleSelect = (value: any, item: any, event: React.SyntheticEvent<any>) => {
    const { onSelect, creatable } = this.props;
    const { newData } = this.state;

    onSelect?.(value, item, event);

    if (creatable && item.create) {
      delete item.create;
      this.setState({
        newData: newData.concat(item)
      });
    }
  };

  handleSearch = (searchKeyword: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const { onSearch, labelKey, valueKey } = this.props;
    const filteredData = filterNodesOfTree(this.getAllData(), item =>
      this.shouldDisplay(item[labelKey], searchKeyword)
    );
    const nextState = {
      searchKeyword,
      focusItemValue: filteredData.length ? filteredData[0][valueKey] : searchKeyword
    };

    this.setState(nextState, this.updatePosition);
    onSearch?.(searchKeyword, event);
  };

  handleOpenDropdown = () => {
    if (this.triggerRef.current) {
      this.triggerRef.current.show();
    }
  };

  handleCloseDropdown = () => {
    if (this.triggerRef.current) {
      this.triggerRef.current.hide();
    }
  };

  handleChange = (value: any, event: React.SyntheticEvent<any>) => {
    this.props.onChange?.(value, event);
  };

  handleClean = (event: React.SyntheticEvent<any>) => {
    const { disabled, onClean } = this.props;
    const { searchKeyword } = this.state;

    if (disabled || searchKeyword !== '') {
      return;
    }

    const nextState = {
      value: null,
      focusItemValue: null,
      searchKeyword: ''
    };

    this.setState(nextState);
    this.handleChange(null, event);
    this.updatePosition();

    onClean?.(event);
  };

  handleEntered = () => {
    this.props.onOpen?.();
  };

  handleExited = () => {
    const { onClose, multi } = this.props;
    const value: any = this.getValue();

    const nextState: InputPickerState = {
      focusItemValue: multi ? _.get(value, 0) : value
    };

    if (multi) {
      /**
       在多选的情况下, 当 searchKeyword 过长，在 focus 的时候会导致内容换行。
       把 searchKeyword 清空是为了，Menu 在展开时候位置正确。
       */
      nextState.searchKeyword = '';
    }

    onClose?.();
    this.setState(nextState);
  };

  handleEnter = () => {
    this.focusInput();
    this.setState({ open: true });
  };

  handleExit = () => {
    this.blurInput();
    this.setState({ open: false });
  };

  handleRemoveItemByTag = (tag: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const value = this.getValue();
    _.remove(value, itemVal => shallowEqual(itemVal, tag));
    this.setState({ value }, this.updatePosition);
    this.handleChange(value, event);
  };

  removeLastItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const tagName = _.get(event, 'target.tagName');
    if (tagName !== 'INPUT') {
      this.focusInput();
      return;
    }
    if (tagName === 'INPUT' && _.get(event, 'target.value')) {
      return;
    }
    const value: any = this.getValue();
    value.pop();
    this.setState({ value }, this.updatePosition);
    this.handleChange(value, event);
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
      locale,
      renderMenu,
      renderExtraFooter,
      menuClassName,
      menuStyle,
      menuAutoWidth,
      creatable,
      valueKey,
      multi,
      sort,
      virtualized
    } = this.props;

    const { focusItemValue, searchKeyword } = this.state;
    const menuClassPrefix = this.addPrefix(multi ? 'check-menu' : 'select-menu');
    const classes = classNames(menuClassPrefix, menuClassName);

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
      filteredData = getDataGroupBy(filteredData, groupBy, sort);
    } else if (typeof sort === 'function') {
      filteredData = filteredData.sort(sort(false));
    }

    const menuProps = _.pick(
      this.props,
      Object.keys(_.omit(dropdownMenuPropTypes, ['className', 'style', 'classPrefix']))
    );

    const value = this.getValue();
    const menu = filteredData.length ? (
      <DropdownMenu
        {...menuProps}
        classPrefix={menuClassPrefix}
        dropdownMenuItemClassPrefix={multi ? undefined : `${menuClassPrefix}-item`}
        dropdownMenuItemComponentClass={multi ? DropdownMenuCheckItem : DropdownMenuItem}
        ref={this.menuContainerRef}
        activeItemValues={multi ? value : [value]}
        focusItemValue={focusItemValue}
        data={filteredData}
        group={!_.isUndefined(groupBy)}
        onSelect={multi ? this.handleCheckItemSelect : this.handleItemSelect}
        renderMenuItem={this.renderMenuItem}
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
        getToggleInstance={this.getToggleInstance}
        onKeyDown={this.handleKeyDown}
      >
        {renderMenu ? renderMenu(menu) : menu}
        {renderExtraFooter?.()}
      </MenuWrapper>
    );
  }

  renderSingleValue() {
    const value = this.getValue();
    return this.getLabelByValue(value);
  }

  renderMultiValue() {
    const { multi, disabled } = this.props;
    if (!multi) {
      return null;
    }

    const tags = this.getValue() || [];
    return tags
      .map(tag => {
        const { isValid, displayElement } = this.getLabelByValue(tag);
        if (!isValid) {
          return null;
        }
        return (
          <Tag
            key={tag}
            closable={!disabled}
            title={typeof displayElement === 'string' ? displayElement : undefined}
            onClose={this.handleRemoveItemByTag.bind(this, tag)}
          >
            {displayElement}
          </Tag>
        );
      })
      .filter(item => item !== null);
  }

  renderInputSearch() {
    const { multi, onBlur, onFocus } = this.props;
    const props: any = {
      onBlur,
      onFocus,
      componentClass: 'input',
      inputRef: this.inputRef
    };

    if (multi) {
      props.componentClass = InputAutosize;
      // 52 = 55 (right padding)  - 2 (border) - 6 (left padding)
      props.inputStyle = { maxWidth: this.state.maxWidth - 63 };
    }

    return (
      <InputSearch
        {...props}
        onChange={this.handleSearch}
        value={this.state.open ? this.state.searchKeyword : ''}
      />
    );
  }

  render() {
    const {
      disabled,
      cleanable,
      locale,
      toggleComponentClass,
      style,
      onEnter,
      onEntered,
      onExit,
      onExited,
      searchable,
      multi,
      ...rest
    } = this.props;

    const unhandled = getUnhandledProps(InputPicker, rest);
    const { isValid, displayElement } = this.renderSingleValue();
    const tagElements = this.renderMultiValue();
    const hasValue = multi ? !!_.get(tagElements, 'length') : isValid;

    const classes = getToggleWrapperClassName('input', this.addPrefix, this.props, hasValue, {
      [this.addPrefix('tag')]: multi,
      [this.addPrefix('focused')]: this.state.open
    });

    const searching = !!this.state.searchKeyword && this.state.open;
    const displaySearchInput = searchable && !disabled;

    return (
      <PickerToggleTrigger
        pickerProps={this.props}
        ref={this.triggerRef}
        positionRef={this.positionRef}
        trigger="active"
        onEnter={createChainedFunction(this.handleEnter, onEnter)}
        onEntered={createChainedFunction(this.handleEntered, onEntered)}
        onExit={createChainedFunction(this.handleExit, onExit)}
        onExited={createChainedFunction(this.handleExited, onExited)}
        speaker={this.renderDropdownMenu()}
      >
        <div
          className={classes}
          style={style}
          onKeyDown={this.handleKeyDown}
          onClick={this.handleClick}
          ref={this.toggleWrapperRef}
        >
          <PickerToggle
            {...unhandled}
            tabIndex={null}
            ref={this.toggleRef}
            componentClass={toggleComponentClass}
            onClean={this.handleClean}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
          >
            {searching || (multi && hasValue) ? null : displayElement || locale.placeholder}
          </PickerToggle>
          <div className={this.addPrefix('tag-wrapper')}>
            {tagElements}
            {displaySearchInput && this.renderInputSearch()}
          </div>
        </div>
      </PickerToggleTrigger>
    );
  }
}

const enhance = compose(
  defaultProps<InputPickerProps>({
    classPrefix: 'picker'
  }),
  withPickerMethods<InputPickerProps>()
);

export default enhance(InputPicker);
