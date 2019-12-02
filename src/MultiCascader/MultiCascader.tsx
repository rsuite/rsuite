import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import _ from 'lodash';
import { shallowEqualArray } from 'rsuite-utils/lib/utils';
import { polyfill } from 'react-lifecycles-compat';

import DropdownMenu from './DropdownMenu';
import Checkbox from '../Checkbox';
import createUtils, { UtilType } from './utils';
import { flattenTree, getNodeParents } from '../utils/treeUtils';
import { PLACEMENT } from '../constants';
import {
  defaultProps,
  prefix,
  getUnhandledProps,
  createChainedFunction,
  withPickerMethods
} from '../utils';
import getSafeRegExpString from '../utils/getSafeRegExpString';

import {
  PickerToggle,
  MenuWrapper,
  SearchBar,
  SelectedElement,
  PickerToggleTrigger,
  getToggleWrapperClassName,
  createConcatChildrenFunction
} from '../Picker';

import { MultiCascaderProps } from './MultiCascader.d';

interface MultiCascaderState {
  selectNode?: any;
  value?: any[];
  prevValue?: any[];
  activePaths?: any[];
  items?: any[];
  data?: any[];
  flattenData?: any[];
  active?: boolean;
  searchKeyword?: string;
}

class MultiCascader extends React.Component<MultiCascaderProps, MultiCascaderState> {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'subtle']),
    classPrefix: PropTypes.string,
    cascade: PropTypes.bool,
    data: PropTypes.array,
    disabledItemValues: PropTypes.array,
    className: PropTypes.string,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    containerPadding: PropTypes.number,
    block: PropTypes.bool,
    toggleComponentClass: PropTypes.elementType,
    menuClassName: PropTypes.string,
    menuStyle: PropTypes.object,
    childrenKey: PropTypes.string,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.array,
    defaultValue: PropTypes.array,
    placeholder: PropTypes.node,
    locale: PropTypes.object,
    cleanable: PropTypes.bool,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    countable: PropTypes.bool,
    placement: PropTypes.oneOf(PLACEMENT),
    menuWidth: PropTypes.number,
    menuHeight: PropTypes.number,
    style: PropTypes.object,
    uncheckableItemValues: PropTypes.array,
    searchable: PropTypes.bool,
    preventOverflow: PropTypes.bool,
    renderMenuItem: PropTypes.func,
    renderMenu: PropTypes.func,
    renderValue: PropTypes.func,
    renderExtraFooter: PropTypes.func,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
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
    onSelect: PropTypes.func,
    inline: PropTypes.bool
  };

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

  static utils: UtilType = {};
  isControlled: boolean = null;
  menuContainerRef: React.RefObject<any>;
  positionRef: React.RefObject<any>;
  triggerRef: React.RefObject<any>;
  constructor(props) {
    super(props);

    const { data, value, defaultValue } = props;
    const initState = {
      data,
      searchKeyword: '',
      prevValue: value,
      value: defaultValue || [],
      selectNode: null,
      /**
       * 选中值的路径
       */
      activePaths: []
    };

    MultiCascader.utils = createUtils(props);
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
      ...MultiCascader.getCascadeState(props, flattenData)
    };

    // for test
    this.menuContainerRef = React.createRef();
    this.positionRef = React.createRef();
    this.triggerRef = React.createRef();
  }

  static getCascadeState(nextProps: MultiCascaderProps, flattenData: any[], nextValue?: any[]) {
    const { data, cascade, value, defaultValue, uncheckableItemValues } = nextProps;
    let cascadeValue = nextValue || value || defaultValue || [];

    if (cascade && data) {
      cascadeValue = MultiCascader.utils.transformValue(
        cascadeValue,
        flattenData,
        uncheckableItemValues
      );
    }

    return {
      value: cascadeValue
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
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

      const nextState: MultiCascaderState = {
        selectNode: nextSelectNode,
        flattenData,
        data,
        items: MultiCascader.utils.getItems(nextSelectNode, flattenData),
        ...MultiCascader.getCascadeState(nextProps, flattenData, value)
      };

      if (isChangedValue) {
        nextState.prevValue = nextProps.value;
      }

      return nextState;
    }

    return null;
  }

  getValue() {
    return this.state.value || [];
  }

  handleCheck = (item: any, event: React.SyntheticEvent<any>, checked: boolean) => {
    const { valueKey, onChange, cascade, uncheckableItemValues } = this.props;
    const itemValue = item[valueKey];
    let value = [];

    if (cascade) {
      value = MultiCascader.utils.splitValue(item, checked, this.getValue(), uncheckableItemValues)
        .value;
    } else {
      value = this.getValue();
      if (checked) {
        value.push(itemValue);
      } else {
        value = value.filter(n => n !== itemValue);
      }
    }

    if (!this.isControlled) {
      this.setState({
        value
      });
    }

    onChange?.(value, event);
  };

  handleChangeForSearchItem = (value: any, checked: boolean, event: React.SyntheticEvent<any>) => {
    this.handleCheck(value, event, checked);
  };

  handleSelect = (
    node: any,
    cascadeItems,
    activePaths: any[],
    event: React.SyntheticEvent<any>
  ) => {
    const { onSelect, valueKey, childrenKey } = this.props;

    this.setState(
      {
        selectNode: node,
        items: cascadeItems,
        activePaths
      },
      () => {
        if (this.positionRef.current) {
          this.positionRef.current.updatePosition();
        }
      }
    );

    onSelect?.(
      node,
      activePaths,
      createConcatChildrenFunction(node, node[valueKey], { valueKey, childrenKey }),
      event
    );
  };

  handleSearch = (searchKeyword: string, event: React.SyntheticEvent<any>) => {
    this.setState({
      searchKeyword
    });
    this.props.onSearch?.(searchKeyword, event);
  };

  handleCloseDropdown = () => {
    if (this.triggerRef.current) {
      this.triggerRef.current.hide();
    }
  };

  handleOpenDropdown = () => {
    if (this.triggerRef.current) {
      this.triggerRef.current.show();
    }
  };

  handleClean = (event: React.SyntheticEvent<any>) => {
    const { disabled, onChange, data } = this.props;
    if (disabled) {
      return;
    }
    const nextState: MultiCascaderState = {
      items: [data],
      selectNode: null,
      activePaths: []
    };

    if (!this.isControlled) {
      nextState.value = [];
    }

    this.setState(nextState);
    onChange?.([], event);
  };

  handleEntered = () => {
    this.props.onOpen?.();
    this.setState({
      active: true
    });
  };

  handleExit = () => {
    this.props.onClose?.();
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

      if (item[labelKey].match(new RegExp(getSafeRegExpString(searchKeyword), 'i'))) {
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

  renderSearchRow = (item: any, key: number) => {
    const { labelKey, valueKey, cascade, disabledItemValues = [] } = this.props;
    const { searchKeyword } = this.state;
    const values = this.getValue();
    const nodes = getNodeParents(item);
    const regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
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

    const active = values.some(value => {
      if (cascade) {
        return nodes.some(node => node[valueKey] === value);
      }
      return item[valueKey] === value;
    });
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
          indeterminate={cascade && !active && MultiCascader.utils.isSomeChildChecked(item, values)}
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
      locale,
      inline
    } = this.props;

    const classes = classNames(
      this.addPrefix('cascader-menu'),
      this.addPrefix('multi-cascader-menu'),
      menuClassName,
      {
        [this.addPrefix('inline')]: inline
      }
    );

    const menuProps = _.pick(this.props, Object.keys(DropdownMenu.propTypes));

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
            ref={this.menuContainerRef}
            cascadeItems={items}
            cascadePathItems={activePaths}
            value={this.getValue()}
            onSelect={this.handleSelect}
            onCheck={this.handleCheck}
            renderMenu={renderMenu}
          />
        )}

        {renderExtraFooter?.()}
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
      inline,
      ...rest
    } = this.props;

    if (inline) {
      return this.renderDropdownMenu();
    }

    const { flattenData } = this.state;
    const unhandled = getUnhandledProps(MultiCascader, rest);
    const value = this.getValue();

    const selectedItems = flattenData.filter(item => value.some(v => v === item[valueKey])) || [];
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
      <div className={classes} style={style} tabIndex={-1} role="menu">
        <PickerToggleTrigger
          pickerProps={this.props}
          ref={this.triggerRef}
          positionRef={this.positionRef}
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

polyfill(MultiCascader);

const enhance = compose(
  defaultProps<MultiCascaderProps>({
    classPrefix: 'picker'
  }),
  withPickerMethods<MultiCascaderProps>()
);

export default enhance(MultiCascader);
