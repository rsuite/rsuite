// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { shallowEqualArray } from 'rsuite-utils/lib/utils';
import { polyfill } from 'react-lifecycles-compat';

import DropdownMenu from './DropdownMenu';
import Checkbox from '../Checkbox';
import createUtils from './utils';
import type { Placement } from '../utils/TypeDefinition';

import { defaultProps, prefix, getUnhandledProps, createChainedFunction } from '../utils';
import { flattenTree, getNodeParents } from '../utils/treeUtils';

import {
  PickerToggle,
  MenuWrapper,
  SearchBar,
  SelectedElement,
  PickerToggleTrigger,
  getToggleWrapperClassName,
  createConcatChildrenFunction
} from '../_picker';

type DefaultEvent = SyntheticEvent<*>;
type Props = {
  appearance: 'default' | 'subtle',
  classPrefix: string,
  cascade: boolean,
  data: any[],
  disabledItemValues?: any[],
  className?: string,
  container?: HTMLElement | (() => HTMLElement),
  containerPadding?: number,
  block?: boolean,
  toggleComponentClass?: React.ElementType,
  menuClassName?: string,
  menuStyle?: Object,
  childrenKey?: string,
  valueKey: string,
  labelKey: string,
  renderMenu?: (children: Array<Object>, menu: React.Node, parentNode?: Object) => React.Node,
  renderValue?: (value?: any[], selectedItems: any[], selectedElement: React.Node) => React.Node,
  renderExtraFooter?: () => React.Node,
  disabled?: boolean,
  value?: any[],
  defaultValue?: any[],
  placeholder?: string,
  onSearch?: (searchKeyword: string, event: DefaultEvent) => void,
  onChange?: (value: any, event: DefaultEvent) => void,
  onClean?: (event: DefaultEvent) => void,
  onOpen?: () => void,
  onClose?: () => void,
  onHide?: () => void,
  onEnter?: () => void,
  onEntering?: () => void,
  onEntered?: () => void,
  onExit?: () => void,
  onExiting?: () => void,
  onExited?: () => void,
  onSelect?: (
    value: any,
    activePaths: any[],
    concat: (data: any[], children: any[]) => any[],
    event: DefaultEvent
  ) => void,
  locale: Object,
  cleanable?: boolean,
  open?: boolean,
  defaultOpen?: boolean,
  countable?: boolean,
  placement?: Placement,

  /**
   * Only for `DropdownMenu`
   */
  renderMenuItem?: (itemLabel: React.Node, item: Object) => React.Node,
  menuWidth?: number,
  menuHeight?: number,
  style?: Object,
  uncheckableItemValues?: any[],
  searchable?: boolean,

  /**
   * Prevent floating element overflow
   */
  preventOverflow?: boolean
};

type State = {
  selectNode?: any,
  value?: any[],
  prevValue?: any[],
  activePaths: any[],
  items?: any[],
  data: any[],
  flattenData: any[],
  active?: boolean,
  searchKeyword: string
};

class Dropdown extends React.Component<Props, State> {
  static defaultProps = {
    cascade: true,
    appearance: 'default',
    data: [],
    disabledItemValues: [],
    uncheckableItemValues: [],
    childrenKey: 'children',
    valueKey: 'value',
    labelKey: 'label',
    locale: {
      placeholder: 'Select',
      checkAll: 'All',
      searchPlaceholder: 'Search',
      noResultsText: 'No results found'
    },
    cleanable: true,
    searchable: true,
    countable: true,
    placement: 'bottomStart'
  };

  static utils = {};
  isControlled = null;
  constructor(props: Props) {
    super(props);

    const { data, value, defaultValue } = props;
    const initState = {
      data,
      searchKeyword: '',
      prevValue: value,
      value: defaultValue,
      selectNode: null,
      /**
       * 选中值的路径
       */
      activePaths: []
    };

    Dropdown.utils = createUtils(props);
    const flattenData = flattenTree(data, props.childrenKey);

    this.isControlled = !_.isUndefined(value);
    this.state = {
      ...initState,
      flattenData,
      /**
       * 用于展示面板的数据列表，是一个二维的数组
       * 是通过 data 树结构转换成的二维的数组，其中只包含页面上展示的数据
       */
      items: [flattenData.filter(item => !item.parent)],
      ...Dropdown.getCascadeState(props, flattenData)
    };
  }

  static getCascadeState(nextProps: Props, flattenData: any[], nextValue?: any[]) {
    const { data, cascade, value, defaultValue, uncheckableItemValues } = nextProps;
    let cascadeValue = nextValue || value || defaultValue || [];

    if (cascade && data) {
      cascadeValue = Dropdown.utils.transformValue(
        cascadeValue,
        flattenData,
        uncheckableItemValues
      );
    }

    return {
      value: cascadeValue
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { data, valueKey, childrenKey } = nextProps;

    let value = nextProps.value || prevState.value || [];
    let { prevValue, flattenData, selectNode = {}, items } = prevState;

    const isChangedData = data !== prevState.data;
    const isChangedValue = !shallowEqualArray(prevValue, nextProps.value);

    if (isChangedData || isChangedValue) {
      if (isChangedData) {
        flattenData = flattenTree(data, nextProps.childrenKey);
      }

      /**
       * 如果更新了 data,
       * 首先获取到被点击节点的值 `selectNode`， 然后再拿到新增后的 `newChildren`,
       */
      const nextSelectNode = flattenData.find(n => {
        return selectNode && n[valueKey] === selectNode[valueKey];
      });
      const newChildren = (_.get(nextSelectNode, childrenKey) || []).map(item => {
        item.parent = nextSelectNode;
        return item;
      });

      if (newChildren.length && items) {
        items[items.length - 1] = newChildren;
      }

      const nextState: Object = {
        selectNode: nextSelectNode,
        flattenData,
        data,
        items: Dropdown.utils.getItems(nextSelectNode, flattenData),
        ...Dropdown.getCascadeState(nextProps, flattenData, value)
      };

      if (isChangedValue) {
        nextState.prevValue = nextProps.value;
      }

      return nextState;
    }

    return null;
  }

  getValue() {
    const { value } = this.state;
    return value || [];
  }

  handleCheck = (item: Object, event: SyntheticEvent<*>, checked: boolean) => {
    const { valueKey, onChange, cascade, uncheckableItemValues } = this.props;
    const itemValue = item[valueKey];
    let value = [];

    if (cascade) {
      value = Dropdown.utils.splitValue(item, checked, this.getValue(), uncheckableItemValues)
        .value;
    } else {
      value = this.getValue();
      if (checked) {
        value.push(itemValue);
      } else {
        value = value.filter(n => n !== itemValue);
      }
    }

    this.setState({
      value
    });

    onChange && onChange(value, event);
  };

  handleChangeForSearchItem = (
    value: any,
    checked: boolean,
    event: SyntheticInputEvent<HTMLInputElement>
  ) => {
    this.handleCheck(value, event, checked);
  };

  handleSelect = (node: Object, cascadeItems, activePaths: any[], event: DefaultEvent) => {
    const { onSelect, valueKey } = this.props;

    this.setState(
      {
        selectNode: node,
        items: cascadeItems,
        activePaths
      },
      () => {
        if (this.position) {
          this.position.updatePosition();
        }
      }
    );

    onSelect &&
      onSelect(node, activePaths, createConcatChildrenFunction(node, node[valueKey]), event);
  };

  handleSearch = (searchKeyword: string, event: DefaultEvent) => {
    const { onSearch } = this.props;
    this.setState({
      searchKeyword
    });
    onSearch && onSearch(searchKeyword, event);
  };

  trigger = null;

  bindTriggerRef = (ref: React.ElementRef<*>) => {
    this.trigger = ref;
  };

  position = null;

  bindPositionRef = (ref: React.ElementRef<*>) => {
    this.position = ref;
  };

  menuContainer = null;

  bindMenuContainerRef = (ref: React.ElementRef<*>) => {
    this.menuContainer = ref;
  };

  container = null;

  bindContainerRef = (ref: React.ElementRef<*>) => {
    this.container = ref;
  };

  closeDropdown = () => {
    if (this.trigger) {
      this.trigger.hide();
    }
  };

  handleClean = (event: DefaultEvent) => {
    const { disabled, onChange, data } = this.props;
    if (disabled) {
      return;
    }
    const nextState = {
      items: [data],
      value: [],
      selectNode: null,
      activePaths: []
    };
    this.setState(nextState, () => {
      onChange && onChange([], event);
    });
  };

  handleEntered = () => {
    const { onOpen } = this.props;
    onOpen && onOpen();
    this.setState({
      active: true
    });
  };

  handleExit = () => {
    const { onClose } = this.props;
    onClose && onClose();
    this.setState({
      searchKeyword: '',
      active: false
    });
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  getSearchResult() {
    const { labelKey, valueKey, uncheckableItemValues = [] } = this.props;
    const { searchKeyword, flattenData } = this.state;

    const items = [];
    const result = flattenData.filter(item => {
      if (uncheckableItemValues.some(value => item[valueKey] === value)) {
        return false;
      }

      if (item[labelKey].match(new RegExp(searchKeyword, 'i'))) {
        return true;
      }
      return false;
    });

    for (let i = 0; i < result.length; i++) {
      items.push(result[i]);

      if (i === 99) {
        return items;
      }
    }
    return items;
  }

  renderSearchRow = (item: Object, key: number) => {
    const { labelKey, valueKey, cascade, disabledItemValues = [] } = this.props;
    const { searchKeyword } = this.state;
    const values = this.getValue();
    const nodes = getNodeParents(item);
    const regx = new RegExp(searchKeyword, 'ig');
    const labelElements = [];

    let a = item[labelKey].split(regx);
    let b = item[labelKey].match(regx);

    for (let i = 0; i < a.length; i++) {
      labelElements.push(a[i]);
      if (b[i]) {
        labelElements.push(<strong key={i}>{b[i]}</strong>);
      }
    }

    nodes.push({
      ...item,
      [labelKey]: labelElements
    });

    const active = values.some(value => nodes.some(node => node[valueKey] === value));
    const disabled = disabledItemValues.some(value => nodes.some(node => node[valueKey] === value));
    const itemClasses = classNames(this.addPrefix('cascader-row'), {
      [this.addPrefix('cascader-row-disabled')]: disabled
    });

    return (
      <div key={key} className={itemClasses}>
        <Checkbox
          disabled={disabled}
          checked={active}
          value={item}
          indeterminate={cascade && !active && Dropdown.utils.isSomeChildChecked(item, values)}
          onChange={this.handleChangeForSearchItem}
        >
          <span className={this.addPrefix('cascader-cols')}>
            {nodes.map((node, index) => (
              <span key={`col-${index}`} className={this.addPrefix('cascader-col')}>
                {node[labelKey]}
              </span>
            ))}
          </span>
        </Checkbox>
      </div>
    );
  };

  renderSearchResultPanel() {
    const { locale } = this.props;
    const { searchKeyword } = this.state;

    if (searchKeyword === '') {
      return null;
    }

    const items = this.getSearchResult();
    return (
      <div className={this.addPrefix('cascader-search-panel')}>
        {items.length ? (
          items.map(this.renderSearchRow)
        ) : (
          <div className={this.addPrefix('none')}>{locale.noResultsText}</div>
        )}
      </div>
    );
  }

  renderDropdownMenu() {
    const { items, activePaths, searchKeyword } = this.state;
    const {
      renderMenu,
      renderExtraFooter,
      menuClassName,
      menuStyle,
      classPrefix,
      searchable,
      locale
    } = this.props;

    const classes = classNames(
      this.addPrefix('cascader-menu'),
      this.addPrefix('multi-cascader-menu'),
      menuClassName
    );

    const menuProps = _.pick(this.props, DropdownMenu.handledProps);

    return (
      <MenuWrapper className={classes} style={menuStyle}>
        {searchable && (
          <SearchBar
            placeholder={locale.searchPlaceholder}
            onChange={this.handleSearch}
            value={searchKeyword}
          />
        )}

        {this.renderSearchResultPanel()}

        {searchKeyword === '' && (
          <DropdownMenu
            {...menuProps}
            classPrefix={classPrefix}
            ref={this.bindMenuContainerRef}
            cascadeItems={items}
            cascadePathItems={activePaths}
            value={this.getValue()}
            onSelect={this.handleSelect}
            onCheck={this.handleCheck}
            renderMenu={renderMenu}
          />
        )}

        {renderExtraFooter && renderExtraFooter()}
      </MenuWrapper>
    );
  }

  render() {
    const {
      valueKey,
      labelKey,
      childrenKey,
      placeholder,
      renderValue,
      disabled,
      cleanable,
      locale,
      toggleComponentClass,
      style,
      onEnter,
      onExited,
      onClean,
      countable,
      cascade,
      ...rest
    } = this.props;

    const { flattenData } = this.state;
    const unhandled = getUnhandledProps(Dropdown, rest);
    const value = this.getValue();

    const selectedItems = flattenData.filter(item => value.some(v => v === item[valueKey])) || [];
    const count = selectedItems.length;
    const hasValue = !!count;

    let selectedElement = placeholder;

    if (count > 0) {
      selectedElement = (
        <SelectedElement
          selectedItems={selectedItems}
          countable={countable}
          valueKey={valueKey}
          labelKey={labelKey}
          childrenKey={childrenKey}
          prefix={this.addPrefix}
          cascade={cascade}
          locale={locale}
        />
      );
      if (renderValue) {
        selectedElement = renderValue(value, selectedItems, selectedElement);
      }
    }

    const classes = getToggleWrapperClassName('cascader', this.addPrefix, this.props, hasValue);

    return (
      <div className={classes} style={style} tabIndex={-1} role="menu" ref={this.bindContainerRef}>
        <PickerToggleTrigger
          pickerProps={this.props}
          innerRef={this.bindTriggerRef}
          positionRef={this.bindPositionRef}
          onEnter={createChainedFunction(this.handleEntered, onEnter)}
          onExit={createChainedFunction(this.handleExit, onExited)}
          speaker={this.renderDropdownMenu()}
        >
          <PickerToggle
            {...unhandled}
            componentClass={toggleComponentClass}
            onClean={createChainedFunction(this.handleClean, onClean)}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
            active={this.state.active}
          >
            {selectedElement || locale.placeholder}
          </PickerToggle>
        </PickerToggleTrigger>
      </div>
    );
  }
}

polyfill(Dropdown);

const enhance = defaultProps({
  classPrefix: 'picker'
});

export default enhance(Dropdown);
