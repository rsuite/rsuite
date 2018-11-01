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
import getDerivedStateForCascade from './getDerivedStateForCascade';

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

/**
 * 获取一个节点的所有子节点的值
 */
function getChildrenValue(
  item: Object,
  childrenKey: string,
  valueKey: string,
  uncheckableItemValues: Array<any>
) {
  let values = [];

  if (!item[childrenKey]) {
    return values;
  }

  item[childrenKey].forEach(n => {
    if (!uncheckableItemValues.some(v => v === n[valueKey])) {
      values.push(n[valueKey]);
    }
    values = values.concat(getChildrenValue(n, childrenKey, valueKey, uncheckableItemValues));
  });

  return values;
}

/**
 * 获取一个节点的所有父辈节点
 */
function getParents(item: Object, uncheckableItemValues: Array<any>) {
  let parents = [];

  if (!item.parent) {
    return parents;
  }

  parents.push(item.parent);
  parents = parents.concat(getParents(item.parent));

  return parents;
}

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

    const initState = {
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
      ...getDerivedStateForCascade(props, initState)
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
       * 在级联的情况下，需要判断当前节点是否被选中，并更新子节点
       */
      if (cascade && value.some(n => n === selectNodeValue)) {
        value = value.concat(
          getChildrenValue(
            { [childrenKey]: newChildren },
            childrenKey,
            valueKey,
            uncheckableItemValues
          )
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

  // 获取所有级联的节点
  getCheckedItemsByCascade(item: Object, checked: boolean) {
    const { valueKey, childrenKey, uncheckableItemValues } = this.props;
    const itemValue = item[valueKey];
    let value = this.getValue();

    const childrenValue = getChildrenValue(item, childrenKey, valueKey, uncheckableItemValues);
    const parents = getParents(item);

    if (checked) {
      value.push(itemValue);
      value = value.concat(childrenValue);

      /**
       * 遍历当前节点所有祖宗节点
       * 然后判断这些节点的子节点是否是否全部被选中，则自身也要被选中
       */

      for (let i = 0, isContinue = true; i < parents.length && isContinue; i++) {
        let isCheckAll = parents[i][childrenKey]
          // 过滤掉被标识为不可选的选项
          .filter(n => !uncheckableItemValues.some(v => v === n[valueKey]))
          // 检查是否所有节点都被选中
          .every(n => value.some(v => v === n[valueKey]));

        if (isCheckAll) {
          value.push(parents[i][valueKey]);
        } else {
          /**
           * 如果 parents[i] 下的子节点没有全选，
           * 那它祖宗节点肯定不会被选中，则没必要再继续循环。
           */
          isContinue = false;
        }
      }
    } else {
      value = value.filter(n => !shallowEqual(n, itemValue));
      const tempValue = childrenValue.concat(parents.map(item => item[valueKey]));

      // 删除相关的子父节点
      _.remove(value, item => tempValue.some(n => n === item));
    }

    return _.uniq(value);
  }

  handleCheck = (item: Object, event: SyntheticEvent<*>, checked: boolean) => {
    const { valueKey, onChange, cascade } = this.props;
    const itemValue = item[valueKey];
    let value = [];

    if (cascade) {
      value = this.getCheckedItemsByCascade(item, checked);
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
