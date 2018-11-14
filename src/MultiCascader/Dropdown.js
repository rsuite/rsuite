// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { IntlProvider, FormattedMessage } from 'rsuite-intl';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import { findNodeOfTree, shallowEqualArray } from 'rsuite-utils/lib/utils';
import { polyfill } from 'react-lifecycles-compat';
import {
  defaultProps,
  prefix,
  getUnhandledProps,
  createChainedFunction,
  tplTransform
} from '../utils';

import findNodesOfTree from '../utils/findNodesOfTree';
import DropdownMenu from './DropdownMenu';
import PickerToggle from '../_picker/PickerToggle';
import MenuWrapper from '../_picker/MenuWrapper';
import SelectedElement from '../_picker/SelectedElement';
import getToggleWrapperClassName from '../_picker/getToggleWrapperClassName';
import createUtils from './utils';

import type { Placement } from '../utils/TypeDefinition';

type DefaultEvent = SyntheticEvent<*>;
type Props = {
  appearance: 'default' | 'subtle',
  classPrefix: string,
  cascade: boolean,
  data: Array<any>,
  disabledItemValues?: Array<any>,
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
  renderMenu?: (itemLabel: React.Node, item: Object) => React.Node,
  renderValue?: (value?: Array<any>, selectedItems: Array<any>) => React.Node,
  renderExtraFooter?: () => React.Node,
  disabled?: boolean,
  value?: Array<any>,
  defaultValue?: Array<any>,
  placeholder?: string,
  onChange?: (value: any, event: DefaultEvent) => void,
  onOpen?: () => void,
  onClose?: () => void,
  onHide?: () => void,
  onEnter?: Function,
  onEntering?: Function,
  onEntered?: Function,
  onExit?: Function,
  onExiting?: Function,
  onExited?: Function,
  onSelect?: (value: any, activePaths: Array<any>, event: DefaultEvent) => void,
  locale?: Object,
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
  uncheckableItemValues?: Array<any>
};

type State = {
  selectNode?: any,
  value?: Array<any>,
  prevValue?: Array<any>,
  activePaths: Array<any>,
  items?: Array<any>,
  data: Array<any>,
  flattenData: Array<any>
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
      checkAll: 'All'
    },
    cleanable: true,
    countable: true,
    placement: 'bottomLeft'
  };

  constructor(props: Props) {
    super(props);

    const { data, value, defaultValue, cascade } = props;
    const initState = {
      data,
      prevValue: value,
      value: defaultValue,
      selectNode: null,
      /**
       * 选中值的路径
       */
      activePaths: []
    };

    Dropdown.utils = createUtils(props);
    const flattenData = Dropdown.utils.flattenNodes(data);

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

  static getCascadeState(nextProps: Props, flattenData: Array<any>, nextValue: Array<any>) {
    const { data, cascade, value, defaultValue, uncheckableItemValues, valueKey } = nextProps;
    let cascadeValue = nextValue || value || defaultValue || [];

    if (cascade && data) {
      const items = flattenData.filter(item => cascadeValue.some(v => v === item[valueKey]));
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
    const { data, labelKey, valueKey, childrenKey, cascade, uncheckableItemValues } = nextProps;

    let value = nextProps.value || prevState.value || [];
    let { prevValue, flattenData, selectNode, items } = prevState;

    const isChangedData = !shallowEqualArray(data, prevState.data);
    const isChangedValue = !shallowEqualArray(prevValue, nextProps.value);

    if (isChangedData || isChangedValue) {
      if (isChangedData) {
        flattenData = Dropdown.utils.flattenNodes(data);
      }

      /**
       * 如果更新了 data,
       * 首先获取到被点击节点的值 `selectNode`， 然后再拿到新增后的 `newChildren`,
       */
      const nextSelectNode = flattenData.find(n => n[valueKey] === selectNode[valueKey]);
      const newChildren = (_.get(nextSelectNode, childrenKey) || []).map(item => {
        item.parent = nextSelectNode;
        return item;
      });

      if (newChildren.length) {
        items[items.length - 1] = newChildren;
      }

      const nextState = {
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

  handleSelect = (node: Object, cascadeItems, activePaths: Array<any>, event: DefaultEvent) => {
    const { onSelect } = this.props;

    this.setState({
      selectNode: node,
      items: cascadeItems,
      activePaths
    });

    onSelect && onSelect(node, activePaths, event);
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
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    const nextState = {
      value: null,
      activePaths: []
    };
    this.setState(nextState, () => {
      onChange && onChange([], event);
    });
  };

  handleEntered = () => {
    const { onOpen } = this.props;
    onOpen && onOpen();
  };

  handleExited = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderDropdownMenu() {
    const { items, activePaths } = this.state;
    const {
      renderMenu,
      placement,
      renderExtraFooter,
      menuClassName,
      menuStyle,
      classPrefix
    } = this.props;

    const classes = classNames(
      this.addPrefix('cascader-menu'),
      this.addPrefix(`placement-${_.kebabCase(placement)}`),
      menuClassName
    );

    const menuProps = _.pick(this.props, DropdownMenu.handledProps);

    return (
      <MenuWrapper className={classes} style={menuStyle}>
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
        {renderExtraFooter && renderExtraFooter()}
      </MenuWrapper>
    );
  }

  render() {
    const {
      data,
      valueKey,
      labelKey,
      childrenKey,
      className,
      placeholder,
      renderValue,
      disabled,
      cleanable,
      locale,
      open,
      defaultOpen,
      onClose,
      placement,
      classPrefix,
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
      cascade,
      ...rest
    } = this.props;

    const { activePaths, flattenData } = this.state;
    const unhandled = getUnhandledProps(Dropdown, rest);
    const value = this.getValue();

    const selectedItems = flattenData.filter(item => value.some(v => v === item[valueKey])) || [];
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
          childrenKey={childrenKey}
          prefix={this.addPrefix}
          cascade={cascade}
          locale={locale}
        />
      );
    }

    const classes = getToggleWrapperClassName('cascader', this.addPrefix, this.props, hasValue);

    return (
      <div className={classes} style={style} tabIndex={-1} role="menu" ref={this.bindContainerRef}>
        <OverlayTrigger
          ref={this.bindTriggerRef}
          open={open}
          defaultOpen={defaultOpen}
          disabled={disabled}
          trigger="click"
          placement={placement}
          onEnter={createChainedFunction(this.handleEntered, onEnter)}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={createChainedFunction(this.handleExited, onExited)}
          onHide={onHide}
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
            {selectedElement || locale.placeholder}
          </PickerToggle>
        </OverlayTrigger>
      </div>
    );
  }
}

polyfill(Dropdown);

const enhance = defaultProps({
  classPrefix: 'picker'
});

export default enhance(Dropdown);
