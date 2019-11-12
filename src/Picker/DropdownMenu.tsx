import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getPosition, scrollTop, getHeight } from 'dom-lib';
import classNames from 'classnames';
import { shallowEqual } from 'rsuite-utils/lib/utils';

import { getUnhandledProps, prefix, defaultProps } from '../utils';
import DropdownMenuGroup from './DropdownMenuGroup';

export interface DropdownMenuProps {
  classPrefix: string;
  data?: any[];
  group?: boolean;
  disabledItemValues?: any[];
  activeItemValues?: any[];
  focusItemValue?: any;
  maxHeight?: number;
  valueKey?: string;
  labelKey?: string;
  className?: string;
  style?: React.CSSProperties;
  dropdownMenuItemComponentClass: React.ElementType;
  dropdownMenuItemClassPrefix?: string;
  renderMenuItem?: (itemLabel: React.ReactNode, item: any) => React.ReactNode;
  renderMenuGroup?: (title: React.ReactNode, item: any) => React.ReactNode;
  onSelect?: (value: any, item: any, event: React.MouseEvent, checked?: boolean) => void;
  onGroupTitleClick?: (event: React.MouseEvent) => void;
}

class DropdownMenu extends React.Component<DropdownMenuProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    data: PropTypes.array,
    group: PropTypes.bool,
    disabledItemValues: PropTypes.array,
    activeItemValues: PropTypes.array,
    focusItemValue: PropTypes.any,
    maxHeight: PropTypes.number,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    renderMenuItem: PropTypes.func,
    renderMenuGroup: PropTypes.func,
    onSelect: PropTypes.func,
    onGroupTitleClick: PropTypes.func,
    dropdownMenuItemComponentClass: PropTypes.elementType,
    dropdownMenuItemClassPrefix: PropTypes.string
  };

  static defaultProps = {
    data: [],
    activeItemValues: [],
    disabledItemValues: [],
    maxHeight: 320,
    valueKey: 'value',
    labelKey: 'label'
  };
  menuBodyContainerRef: React.RefObject<HTMLDivElement>;
  constructor(props) {
    super(props);
    this.menuBodyContainerRef = React.createRef();
  }

  componentDidMount() {
    this.updateScrollPoistion();
  }

  componentDidUpdate(prevProps: DropdownMenuProps) {
    if (!shallowEqual(prevProps.focusItemValue, this.props.focusItemValue)) {
      this.updateScrollPoistion();
    }
  }

  menuItems = {};

  updateScrollPoistion() {
    const container = this.menuBodyContainerRef.current;
    let activeItem = container.querySelector(`.${this.addPrefix('item-focus')}`);

    if (!activeItem) {
      activeItem = container.querySelector(`.${this.addPrefix('item-active')}`);
    }

    if (!activeItem) {
      return;
    }
    const position = getPosition(activeItem, container);
    const sTop = scrollTop(container);
    const sHeight = getHeight(container);
    if (sTop > position.top) {
      scrollTop(container, Math.max(0, position.top - 20));
    } else if (position.top > sTop + sHeight) {
      scrollTop(container, Math.max(0, position.top - sHeight + 32));
    }
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleSelect = (item: any, value: any, event: React.MouseEvent, checked?: boolean) => {
    this.props.onSelect?.(value, item, event, checked);
  };

  bindMenuItems = (disabled: boolean, key: string, ref: React.Ref<any>) => {
    if (ref && !disabled) {
      this.menuItems[key] = ref;
    }
  };

  getItemData = (itemData: any) => {
    return itemData;
  };

  createMenuItems = (items: any[] = [], groupId: string | number = 0) => {
    const {
      activeItemValues,
      focusItemValue,
      valueKey,
      labelKey,
      renderMenuItem,
      renderMenuGroup,
      onGroupTitleClick,
      disabledItemValues,
      group,
      dropdownMenuItemClassPrefix,
      dropdownMenuItemComponentClass: DropdownMenuItem
    } = this.props;

    const nextItems: any[] = items.map((item: any, index: number) => {
      const value = item[valueKey];
      const label = item[labelKey];

      if (_.isUndefined(label) && _.isUndefined(item.groupTitle)) {
        throw Error(`labelKey "${labelKey}" is not defined in "data" : ${index}`);
      }

      // Use `value` in keys when If `value` is string or number
      const onlyKey = _.isString(value) || _.isNumber(value) ? value : index;

      /**
       * Render <DropdownMenuGroup>
       * when if `group` is enabled and `itme.children` is array
       */
      if (group && _.isArray(item.children)) {
        return (
          <DropdownMenuGroup
            classPrefix={this.addPrefix('group')}
            key={onlyKey}
            title={renderMenuGroup ? renderMenuGroup(item.groupTitle, item) : item.groupTitle}
            onClick={onGroupTitleClick}
          >
            {this.createMenuItems(item.children, onlyKey)}
          </DropdownMenuGroup>
        );
      } else if (_.isUndefined(value) && !_.isArray(item.children)) {
        throw Error(`valueKey "${valueKey}" is not defined in "data" : ${index} `);
      }

      const disabled = disabledItemValues.some(disabledValue => shallowEqual(disabledValue, value));

      return (
        <DropdownMenuItem
          classPrefix={dropdownMenuItemClassPrefix}
          getItemData={this.getItemData.bind(this, item)}
          key={`${groupId}-${onlyKey}`}
          disabled={disabled}
          active={
            !_.isUndefined(activeItemValues) && activeItemValues.some(v => shallowEqual(v, value))
          }
          focus={!_.isUndefined(focusItemValue) && shallowEqual(focusItemValue, value)}
          value={value}
          ref={this.bindMenuItems.bind(this, disabled, `${groupId}-${onlyKey}`)}
          onSelect={this.handleSelect.bind(this, item)}
        >
          {renderMenuItem ? renderMenuItem(label, item) : label}
        </DropdownMenuItem>
      );
    });

    return nextItems;
  };

  renderItems() {
    const { data } = this.props;
    this.menuItems = {};
    return this.createMenuItems(data);
  }

  render() {
    const { maxHeight, className, style, ...rest } = this.props;
    const classes = classNames(this.addPrefix('items'), className);
    const unhandled = getUnhandledProps(DropdownMenu, rest);
    const styles = {
      ...style,
      maxHeight
    };

    return (
      <div {...unhandled} className={classes} ref={this.menuBodyContainerRef} style={styles}>
        <ul>{this.renderItems()}</ul>
      </div>
    );
  }
}

export default defaultProps<DropdownMenuProps>({
  classPrefix: 'dropdown-menu'
})(DropdownMenu);
