// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { IntlProvider, FormattedMessage } from 'rsuite-intl';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import { findNodeOfTree, shallowEqual, shallowEqualArray } from 'rsuite-utils/lib/utils';
import { polyfill } from 'react-lifecycles-compat';
import {
  defaultProps,
  prefix,
  getUnhandledProps,
  createChainedFunction,
  tplTransform
} from '../utils';

import stringToObject from '../utils/stringToObject';
import findNodesOfTree from '../utils/findNodesOfTree';
import DropdownMenu from './DropdownMenu';
import PickerToggle from '../_picker/PickerToggle';
import MenuWrapper from '../_picker/MenuWrapper';
import getToggleWrapperClassName from '../_picker/getToggleWrapperClassName';
import {
  getDerivedStateForCascade,
  getChildrenValue,
  getCheckedItemsByCascade,
  flattenNodes
} from './utils';

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
  activePaths: Array<any>,
  items?: Array<any>,
  tempActivePaths?: Array<any>,
  data: Array<any>
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
      selectedValues: '{0} selected'
    },
    cleanable: true,
    placement: 'bottomLeft'
  };

  constructor(props: Props) {
    super(props);

    const { data, defaultValue, cascade, valueKey } = props;
    const initState = {
      data,
      selectNode: null,
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

    let cascadeValue = defaultValue || [];

    /**
     * 如果启用级联，则通过 defaultValue 遍历 data
     * 然后初始化一个新的默认值
     */
    if (cascade && defaultValue && data) {
      const items = flattenNodes(props.data, props).filter(item =>
        defaultValue.some(v => v === item[valueKey])
      );

      cascadeValue = _.uniq(
        _.flatten(
          items.map(item => {
            return getCheckedItemsByCascade(item, true, defaultValue, props);
          })
        )
      );
    }

    this.state = {
      ...initState,
      ...getDerivedStateForCascade(props, initState),
      value: cascadeValue
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { data, labelKey, valueKey, childrenKey, cascade, uncheckableItemValues } = nextProps;
    let value = nextProps.value || prevState.value || [];

    if (!shallowEqualArray(data, prevState.data)) {
      /**
       * 如果更新了 data,
       * 首先获取到被点击节点的值 `selectNodeValue`， 然后再拿到新增后的 `newChildren`,
       */
      const selectNodeValue = _.get(prevState, ['selectNode', valueKey]);
      const newChildren = (
        _.get(
          findNodeOfTree(data, item => shallowEqual(item[valueKey], selectNodeValue)),
          'children'
        ) || []
      ).map(item => ({
        ...stringToObject(item, labelKey, valueKey),
        parent: prevState.selectNode
      }));

      const nextState = getDerivedStateForCascade(
        nextProps,
        prevState,
        selectNodeValue,
        newChildren
      );

      /**
       * 一般在异步更新 data 的情况下，同时是级联状态，
       * 当前 active 的节点是 checked 的则需要把当前所有子节点也选中
       */
      if (cascade && value.some(n => n === selectNodeValue)) {
        value = value.concat(
          getChildrenValue({ [childrenKey]: newChildren }, uncheckableItemValues, nextProps)
        );
      }

      return {
        ...nextState,
        data,
        value
      };
    }

    return null;
  }

  getValue(nextProps?: Props) {
    const { value } = this.props;
    const nextValue = _.isUndefined(value) ? this.state.value : value;
    return nextValue ? [...nextValue] : [];
  }

  handleCheck = (item: Object, event: SyntheticEvent<*>, checked: boolean) => {
    const { valueKey, onChange, cascade } = this.props;
    const itemValue = item[valueKey];
    let value = [];

    if (cascade) {
      value = getCheckedItemsByCascade(item, checked, this.getValue(), this.props);
    } else {
      value = this.getValue();
      if (checked) {
        value.push(itemValue);
      } else {
        value = value.filter(n => !shallowEqual(n, itemValue));
      }
    }

    this.setState({
      value
    });

    onChange && onChange(value, event);
  };

  handleSelect = (node: Object, cascadeItems, activePaths: Array<any>, event: DefaultEvent) => {
    const { onSelect } = this.props;
    onSelect && onSelect(node, activePaths, event);

    this.setState({
      selectNode: node,
      items: cascadeItems,
      tempActivePaths: activePaths
    });
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
      onChange && onChange(null, event);
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
    const { items, tempActivePaths, activePaths } = this.state;
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
          cascadePathItems={tempActivePaths || activePaths}
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
      ...rest
    } = this.props;

    const { activePaths } = this.state;
    const unhandled = getUnhandledProps(Dropdown, rest);
    const value = this.getValue();
    const hasValue = !!value.length;

    let activeItemLabel: any = placeholder;

    if (renderValue) {
      let selectedItems =
        findNodesOfTree(data, item => {
          return value.some(v => v === item[valueKey]);
        }) || [];

      activeItemLabel = renderValue(value, selectedItems);
    } else if (value.length > 0) {
      activeItemLabel = tplTransform(locale.selectedValues, value.length);
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
              {activeItemLabel || <FormattedMessage id="placeholder" />}
            </PickerToggle>
          </OverlayTrigger>
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
