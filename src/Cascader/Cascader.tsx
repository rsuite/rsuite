import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import _ from 'lodash';
import { findNodeOfTree, shallowEqual } from 'rsuite-utils/lib/utils';
import { polyfill } from 'react-lifecycles-compat';

import IntlProvider from '../IntlProvider';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import DropdownMenu from './DropdownMenu';
import stringToObject from '../utils/stringToObject';
import getSafeRegExpString from '../utils/getSafeRegExpString';
import { flattenTree, getNodeParents } from '../utils/treeUtils';
import { getDerivedStateForCascade } from './utils';

import {
  defaultProps,
  prefix,
  getUnhandledProps,
  createChainedFunction,
  withPickerMethods
} from '../utils';

import {
  PickerToggle,
  MenuWrapper,
  SearchBar,
  PickerToggleTrigger,
  getToggleWrapperClassName,
  createConcatChildrenFunction
} from '../Picker';

import { CascaderProps } from './Cascader.d';
import { PLACEMENT } from '../constants';
import { ItemDataType } from '../@types/common';

interface CascaderState {
  selectNode?: any;
  value?: any;
  activePaths?: any[];
  items?: any[];
  tempActivePaths?: any[];
  data?: any[];
  active?: boolean;
  flattenData?: any[];
  searchKeyword?: string;
}

class Cascader extends React.Component<CascaderProps, CascaderState> {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'subtle']),
    classPrefix: PropTypes.string,
    data: PropTypes.array,
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
    renderMenu: PropTypes.func,
    renderValue: PropTypes.func,
    renderExtraFooter: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    placeholder: PropTypes.string,
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
    onSearch: PropTypes.func,
    locale: PropTypes.object,
    cleanable: PropTypes.bool,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    placement: PropTypes.oneOf(PLACEMENT),
    renderMenuItem: PropTypes.func,
    menuWidth: PropTypes.number,
    menuHeight: PropTypes.number,
    disabledItemValues: PropTypes.array,
    style: PropTypes.object,
    searchable: PropTypes.bool,
    preventOverflow: PropTypes.bool,
    inline: PropTypes.bool
  };
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
    placement: 'bottomStart'
  };

  triggerRef: React.RefObject<any>;
  containerRef: React.RefObject<any>;
  positionRef: React.RefObject<any>;
  menuContainerRef: React.RefObject<any>;
  isControlled: boolean;

  constructor(props: CascaderProps) {
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

    this.isControlled = !_.isUndefined(props.value);
    this.triggerRef = React.createRef();
    this.containerRef = React.createRef();
    this.positionRef = React.createRef();

    // for test
    this.menuContainerRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value, data, labelKey, valueKey } = nextProps;
    if (data !== prevState.data) {
      // First get the value of the clicked node `selectNodeValue`, and then get the new `newChildren`.
      const selectNodeValue = prevState?.selectNode?.[valueKey];

      if (selectNodeValue) {
        const newChildren =
          findNodeOfTree(data, item => shallowEqual(item[valueKey], selectNodeValue))?.children ||
          [];
        return {
          ...getDerivedStateForCascade(
            nextProps,
            prevState,
            selectNodeValue,
            newChildren.map(item => stringToObject(item, labelKey, valueKey))
          ),
          data,
          flattenData: flattenTree(data)
        };
      }

      return {
        ...getDerivedStateForCascade(nextProps, prevState),
        flattenData: flattenTree(data),
        data
      };
    }

    if (typeof value !== 'undefined' && !shallowEqual(value, prevState.value)) {
      return {
        ...getDerivedStateForCascade(nextProps, prevState),
        value
      };
    }

    return null;
  }

  getValue(nextProps?: CascaderProps) {
    const { value } = nextProps || this.props;
    return _.isUndefined(value) ? this.state.value : value;
  }

  handleSelect = (
    node: any,
    cascadeItems,
    activePaths: any[],
    isLeafNode: boolean,
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    const { onChange, onSelect, valueKey, childrenKey } = this.props;
    const prevValue = this.getValue();
    const value = node[valueKey];

    onSelect?.(
      node,
      activePaths,
      createConcatChildrenFunction(node, value, { valueKey, childrenKey }),
      event
    );

    /**
     * 只有在叶子节点的时候才当做是可以选择的值
     * 一个节点的 children 为 null 或者 undefined 的是就是叶子节点
     */
    if (isLeafNode) {
      this.handleCloseDropdown();

      let nextState: CascaderState = {
        selectNode: node
      };

      if (!this.isControlled) {
        nextState = {
          ...nextState,
          value,
          ...getDerivedStateForCascade(this.props, this.state, value)
        };
      }

      this.setState(nextState);

      if (!shallowEqual(value, prevValue)) {
        onChange?.(value, event);
      }

      return;
    }

    this.setState(
      {
        selectNode: node,
        items: cascadeItems,
        tempActivePaths: activePaths
      },
      () => {
        this.positionRef.current?.updatePosition?.();
      }
    );
  };

  handleSearchRowSelect = (item: object, event: React.SyntheticEvent<HTMLElement>) => {
    const { valueKey, onChange, onSelect } = this.props;
    const value = item[valueKey];

    this.handleCloseDropdown();
    let nextState: CascaderState = {
      selectNode: item,
      searchKeyword: ''
    };

    if (!this.isControlled) {
      nextState = {
        ...nextState,
        ...getDerivedStateForCascade(this.props, this.state, value),
        value
      };
    }

    this.setState(nextState);

    onSelect?.(item, null, null, event);
    onChange?.(value, event);
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

  handleClean = (event: React.SyntheticEvent<HTMLElement>) => {
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
      onChange?.(null, event);
    });
  };

  handleSearch = (searchKeyword: string, event: React.SyntheticEvent<HTMLElement>) => {
    this.setState({
      searchKeyword
    });
    this.props.onSearch?.(searchKeyword, event);
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

  /**
   * 在 data 对象中的数据类型是字符串比如: ['foo']
   * 通过这个行数可以把值转换成 [{name:'foo':value:'foo'}]
   */
  stringToObject(value: any) {
    const { labelKey, valueKey } = this.props;
    return stringToObject(value, labelKey, valueKey);
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderSearchRow = (item: ItemDataType, key: number) => {
    const { labelKey, valueKey, disabledItemValues = [] } = this.props;
    const { searchKeyword } = this.state;
    const regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
    let nodes = getNodeParents(item);

    nodes.push(item);
    nodes = nodes.map(node => {
      let labelElements = [];
      let a = node[labelKey].split(regx);
      let b = node[labelKey].match(regx);

      for (let i = 0; i < a.length; i++) {
        labelElements.push(a[i]);
        if (b && b[i]) {
          labelElements.push(<strong key={i}>{b[i]}</strong>);
        }
      }
      return {
        ...node,
        [labelKey]: labelElements
      };
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

  someKeyword(item: ItemDataType) {
    const { labelKey } = this.props;
    const { searchKeyword } = this.state;

    if (item[labelKey].match(new RegExp(getSafeRegExpString(searchKeyword), 'i'))) {
      return true;
    }

    if (item.parent && this.someKeyword(item.parent)) {
      return true;
    }

    return false;
  }

  getSearchResult() {
    const { childrenKey } = this.props;
    const { flattenData } = this.state;
    const items = [];

    const result = flattenData.filter(item => {
      if (item[childrenKey]) {
        return false;
      }
      return this.someKeyword(item);
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
      renderExtraFooter,
      menuClassName,
      menuStyle,
      searchable,
      locale,
      inline
    } = this.props;

    const classes = classNames(this.addPrefix('cascader-menu'), menuClassName, {
      [this.addPrefix('inline')]: inline
    });

    const menuProps = _.pick(
      this.props,
      Object.keys(_.omit(DropdownMenu.propTypes, ['classPrefix']))
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
            ref={this.menuContainerRef}
            cascadeItems={items}
            cascadePathItems={tempActivePaths || activePaths}
            activeItemValue={this.getValue()}
            onSelect={this.handleSelect}
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
      inline,
      ...rest
    } = this.props;

    if (inline) {
      return this.renderDropdownMenu();
    }

    const { activePaths, active } = this.state;
    const unhandled = getUnhandledProps(Cascader, rest);
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
        <div className={classes} style={style} tabIndex={-1} role="menu" ref={this.containerRef}>
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

polyfill(Cascader);

const enhance = compose(
  defaultProps<CascaderProps>({
    classPrefix: 'picker'
  }),
  withPickerMethods<CascaderProps>()
);

export default enhance(Cascader);
