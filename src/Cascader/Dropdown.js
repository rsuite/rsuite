// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { IntlProvider, FormattedMessage } from 'rsuite-intl';
import { findNodeOfTree, shallowEqual } from 'rsuite-utils/lib/utils';
import { polyfill } from 'react-lifecycles-compat';

import DropdownMenu from './DropdownMenu';
import { defaultProps, prefix, getUnhandledProps, createChainedFunction } from '../utils';
import stringToObject from '../utils/stringToObject';
import type { Placement } from '../utils/TypeDefinition';
import { flattenTree, getNodeParents } from '../utils/treeUtils';

import {
  PickerToggle,
  MenuWrapper,
  SearchBar,
  PickerToggleTrigger,
  getToggleWrapperClassName,
  createConcatChildrenFunction
} from '../_picker';

type DefaultEvent = SyntheticEvent<*>;
type Props = {
  appearance: 'default' | 'subtle',
  classPrefix: string,
  data: any[],
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
  renderValue?: (value: any, activePaths?: any[], selectedElement: React.Node) => React.Node,
  renderExtraFooter?: () => React.Node,
  disabled?: boolean,
  value?: any,
  defaultValue?: any,
  placeholder?: string,
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
  onSearch?: (searchKeyword: string, event: DefaultEvent) => void,
  locale: Object,
  cleanable?: boolean,
  open?: boolean,
  defaultOpen?: boolean,
  placement?: Placement,

  /**
   * Only for `DropdownMenu`
   */
  renderMenuItem?: (itemLabel: React.Node, item: Object) => React.Node,
  menuWidth?: number,
  menuHeight?: number,
  disabledItemValues?: any[],
  style?: Object,
  searchable?: boolean
};

type State = {
  selectNode?: any,
  value?: any,
  activePaths: any[],
  items?: any[],
  tempActivePaths?: any[],
  data: any[],
  active?: boolean,
  flattenData: any[],
  searchKeyword: string
};

function getDerivedStateForCascade(
  nextProps: Props,
  prevState: any,
  selectNodeValue?: any,
  newChildren?: any[]
): Object {
  const { data, labelKey, valueKey, childrenKey, value } = nextProps;
  const activeItemValue =
    selectNodeValue || (typeof value === 'undefined' ? prevState.value : value);
  const nextItems = [];
  const nextPathItems = [];
  const findNode = items => {
    for (let i = 0; i < items.length; i += 1) {
      items[i] = stringToObject(items[i], labelKey, valueKey);
      let children = items[i][childrenKey];

      if (shallowEqual(items[i][valueKey], activeItemValue)) {
        return {
          items,
          active: items[i]
        };
      } else if (children) {
        let v = findNode(children);
        if (v) {
          nextItems.push(
            children.map(item => ({
              ...stringToObject(item, labelKey, valueKey),
              parent: items[i]
            }))
          );
          nextPathItems.push(v.active);
          return {
            items,
            active: items[i]
          };
        }
      }
    }
    return null;
  };

  const activeItem = findNode(data);

  nextItems.push(data);

  if (activeItem) {
    nextPathItems.push(activeItem.active);
  }

  /**
   * 如果是异步更新 data 后，获取到的一个 selectNodeValue，则不更新 activePaths
   * 但是需要更新 items， 因为这里的目的就是把异步更新后的的数据展示出来
   */
  const cascadePathItems = nextPathItems.reverse();
  if (selectNodeValue) {
    return {
      items: [...nextItems.reverse(), newChildren],
      tempActivePaths: cascadePathItems
    };
  }

  return {
    items: nextItems.reverse(),
    activePaths: cascadePathItems
  };
}

class Dropdown extends React.Component<Props, State> {
  static defaultProps = {
    appearance: 'default',
    data: [],
    disabledItemValues: [],
    childrenKey: 'children',
    valueKey: 'value',
    labelKey: 'label',
    locale: {
      placeholder: 'Select',
      searchPlaceholder: 'Search',
      noResultsText: 'No results found'
    },
    cleanable: true,
    searchable: true,
    placement: 'bottomLeft'
  };

  constructor(props: Props) {
    super(props);

    const initState = {
      searchKeyword: '',
      selectNode: null,
      data: props.data,
      value: props.defaultValue,
      /**
       * 选中值的路径
       */
      activePaths: [],
      /**
       * 用于展示面板的数据列表，是一个二维的数组
       * 是通过 data 树结构转换成的二维的数组，其中只包含页面上展示的数据
       */
      items: []
    };

    this.state = {
      ...initState,
      ...getDerivedStateForCascade(props, initState),
      flattenData: flattenTree(props.data)
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { value, data, labelKey, valueKey } = nextProps;

    if (data !== prevState.data) {
      /**
       * 如果更新了 data,
       * 首先获取到被点击节点的值 `selectNodeValue`， 然后再拿到新增后的 `newChildren`,
       */
      const selectNodeValue = _.get(prevState, ['selectNode', valueKey]);
      const newChildren =
        _.get(
          findNodeOfTree(data, item => shallowEqual(item[valueKey], selectNodeValue)),
          'children'
        ) || [];

      const nextState = getDerivedStateForCascade(
        nextProps,
        prevState,
        selectNodeValue,
        newChildren.map(item => stringToObject(item, labelKey, valueKey))
      );
      return {
        ...nextState,
        data,
        flattenData: flattenTree(data)
      };
    } else if (typeof value !== 'undefined' && !shallowEqual(value, prevState.value)) {
      const nextState = getDerivedStateForCascade(nextProps, prevState);
      return {
        ...nextState,
        value
      };
    }

    return null;
  }

  getValue(nextProps?: Props) {
    const { value } = nextProps || this.props;
    return _.isUndefined(value) ? this.state.value : value;
  }

  handleSelect = (
    node: any,
    cascadeItems,
    activePaths: any[],
    isLeafNode: boolean,
    event: DefaultEvent
  ) => {
    const { onChange, onSelect, valueKey } = this.props;
    const prevValue = this.getValue();
    const value = node[valueKey];

    onSelect && onSelect(node, activePaths, createConcatChildrenFunction(node), event);

    /**
     * 只有在叶子节点的时候才当做是可以选择的值
     * 一个节点的 children 为 null 或者 undefined 的是就是叶子节点
     */
    if (isLeafNode) {
      this.closeDropdown();
      const nextState: any = {
        selectNode: node,
        ...getDerivedStateForCascade(this.props, { value })
      };

      if (typeof this.props.value === 'undefined') {
        nextState.value = value;
      }

      this.setState(nextState);

      if (!shallowEqual(value, prevValue)) {
        onChange && onChange(value, event);
      }

      return;
    }

    this.setState({
      selectNode: node,
      items: cascadeItems,
      tempActivePaths: activePaths
    });
  };

  handleSearchRowSelect = (item: Object, event: DefaultEvent) => {
    const { valueKey, onChange } = this.props;
    const value = item[valueKey];
    const { activePaths, items } = getDerivedStateForCascade(this.props, { value });

    this.closeDropdown();
    this.setState({
      selectNode: item,
      searchKeyword: '',
      activePaths,
      items,
      value
    });

    onChange && onChange(value, event);
  };

  trigger = null;

  bindTriggerRef = (ref: React.ElementRef<*>) => {
    this.trigger = ref;
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
      value: null,
      selectNode: null,
      activePaths: [],
      tempActivePaths: []
    };
    this.setState(nextState, () => {
      onChange && onChange(null, event);
    });
  };

  handleSearch = (searchKeyword: string, event: DefaultEvent) => {
    const { onSearch } = this.props;
    this.setState({
      searchKeyword
    });
    onSearch && onSearch(searchKeyword, event);
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
      active: false
    });
  };

  /**
   * 在 data 对象中的数据类型是字符串比如: ['foo']
   * 通过这个行数可以把值转换成 [{name:'foo':value:'foo'}]
   */
  stringToObject(value: any) {
    const { labelKey, valueKey } = this.props;
    return stringToObject(value, labelKey, valueKey);
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderSearchRow = (item: Object, key: number) => {
    const { labelKey, valueKey, disabledItemValues = [] } = this.props;
    const { searchKeyword } = this.state;
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

    const disabled = disabledItemValues.some(value => nodes.some(node => node[valueKey] === value));
    const itemClasses = classNames(this.addPrefix('cascader-row'), {
      [this.addPrefix('cascader-row-disabled')]: disabled
    });

    return (
      <div
        key={key}
        className={itemClasses}
        onClick={event => {
          if (!disabled) {
            this.handleSearchRowSelect(item, event);
          }
        }}
      >
        {nodes.map((node, index) => (
          <span key={`col-${index}`} className={this.addPrefix('cascader-col')}>
            {node[labelKey]}
          </span>
        ))}
      </div>
    );
  };

  getSearchResult() {
    const { labelKey } = this.props;
    const { searchKeyword, flattenData } = this.state;
    const items = [];

    const result = flattenData.filter(item => {
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
    const { items, tempActivePaths, activePaths, searchKeyword } = this.state;
    const {
      renderMenu,
      placement,
      renderExtraFooter,
      menuClassName,
      menuStyle,
      searchable,
      locale
    } = this.props;

    const classes = classNames(
      this.addPrefix('cascader-menu'),
      this.addPrefix(`placement-${_.kebabCase(placement)}`),
      menuClassName
    );

    const menuProps = _.pick(
      this.props,
      DropdownMenu.handledProps.filter(name => name !== 'classPrefix')
    );

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
            classPrefix={this.addPrefix('cascader-menu')}
            ref={this.bindMenuContainerRef}
            cascadeItems={items}
            cascadePathItems={tempActivePaths || activePaths}
            activeItemValue={this.getValue()}
            onSelect={this.handleSelect}
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
      ...rest
    } = this.props;

    const { activePaths, active } = this.state;
    const unhandled = getUnhandledProps(Dropdown, rest);
    const value = this.getValue();
    const hasValue = !!value;

    let activeItemLabel: any = placeholder;

    if (activePaths.length > 0) {
      activeItemLabel = [];
      activePaths.forEach((item, index) => {
        let key = item[valueKey] || item[labelKey];
        activeItemLabel.push(<span key={key}>{item[labelKey]}</span>);
        if (index < activePaths.length - 1) {
          activeItemLabel.push(
            <span className="separator" key={`${key}-separator`}>
              {' / '}
            </span>
          );
        }
      });
      if (renderValue) {
        activeItemLabel = renderValue(value, activePaths, activeItemLabel);
      }
    }

    const classes = getToggleWrapperClassName('cascader', this.addPrefix, this.props, hasValue);

    return (
      <IntlProvider locale={locale}>
        <div
          className={classes}
          style={style}
          tabIndex={-1}
          role="menu"
          ref={this.bindContainerRef}
        >
          <PickerToggleTrigger
            pickerProps={this.props}
            innerRef={this.bindTriggerRef}
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
              active={active}
            >
              {activeItemLabel || <FormattedMessage id="placeholder" />}
            </PickerToggle>
          </PickerToggleTrigger>
        </div>
      </IntlProvider>
    );
  }
}

polyfill(Dropdown);

const enhance = defaultProps({
  classPrefix: 'picker'
});

export default enhance(Dropdown);
