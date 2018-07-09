// @flow

import * as React from 'react';
import _ from 'lodash';
import { getPosition, scrollTop, getHeight } from 'dom-lib';
import classNames from 'classnames';
import { shallowEqual } from 'rsuite-utils/lib/utils';

import { getUnhandledProps, defaultProps, prefix } from '../utils';
import DropdownMenuGroup from './DropdownMenuGroup';

type DefaultEvent = SyntheticEvent<*>;
type DefaultEventFunction = (event: DefaultEvent) => void;
type Props = {
  classPrefix: string,
  data?: Array<any>,
  group?: boolean,
  disabledItemValues: Array<any>,
  activeItemValues: Array<any>,
  focusItemValue?: any,
  maxHeight?: number,
  valueKey: string,
  labelKey: string,
  className?: string,
  style?: Object,
  renderMenuItem?: (itemLabel: React.Node, item: Object) => React.Node,
  renderMenuGroup?: (title: React.Node, item: Object) => React.Node,
  onSelect?: (value: any, item: Object, event: DefaultEvent, checked?: boolean) => void,
  onGroupTitleClick?: DefaultEventFunction,
  dropdownMenuItemComponentClass: React.ElementType,
  dropdownMenuItemClassPrefix?: string
};

class DropdownMenu extends React.Component<Props> {
  static defaultProps = {
    data: [],
    activeItemValues: [],
    disabledItemValues: [],
    maxHeight: 320,
    valueKey: 'value',
    labelKey: 'label'
  };

  /**
   * Note that `handledProps` are generated automatically during
   * build with `babel-plugin-transform-react-flow-handled-props`
   */
  static handledProps = [];

  componentDidMount() {
    this.updateScrollPoistion();
  }

  componentDidUpdate(prevProps: Props) {
    if (!shallowEqual(prevProps.focusItemValue, this.props.focusItemValue)) {
      this.updateScrollPoistion();
    }
  }

  menuItems = {};
  menuBodyContainer = {};

  updateScrollPoistion() {
    const activeItem = this.menuBodyContainer.querySelector(`.${this.addPrefix('item-focus')}`);
    if (!activeItem) {
      return;
    }
    const position = getPosition(activeItem, this.menuBodyContainer);
    const sTop = scrollTop(this.menuBodyContainer);
    const sHeight = getHeight(this.menuBodyContainer);
    if (sTop > position.top) {
      scrollTop(this.menuBodyContainer, Math.max(0, position.top - 20));
    } else if (position.top > sTop + sHeight) {
      scrollTop(this.menuBodyContainer, Math.max(0, position.top - sHeight + 32));
    }
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  // value: any, item: Object, event: DefaultEvent
  handleSelect = (value: any, item: Object, event: DefaultEvent, checked?: boolean) => {
    const { onSelect } = this.props;
    onSelect && onSelect(value, item, event, checked);
  };

  renderItems() {
    const {
      activeItemValues,
      focusItemValue,
      valueKey,
      labelKey,
      data,
      renderMenuItem,
      renderMenuGroup,
      onGroupTitleClick,
      disabledItemValues,
      group,
      dropdownMenuItemClassPrefix,
      dropdownMenuItemComponentClass: DropdownMenuItem
    } = this.props;

    const createMenuItems = (items = [], groupId = 0) =>
      items.map((item, index) => {
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
              {createMenuItems(item.children, onlyKey)}
            </DropdownMenuGroup>
          );
        } else if (_.isUndefined(value) && !_.isArray(item.children)) {
          throw Error(`valueKey "${valueKey}" is not defined in "data" : ${index} `);
        }

        const disabled = disabledItemValues.some(disabledValue =>
          shallowEqual(disabledValue, value)
        );

        return (
          <DropdownMenuItem
            classPrefix={dropdownMenuItemClassPrefix}
            getItemData={() => item}
            key={`${groupId}-${onlyKey}`}
            disabled={disabled}
            active={
              !_.isUndefined(activeItemValues) && activeItemValues.some(v => shallowEqual(v, value))
            }
            focus={!_.isUndefined(focusItemValue) && shallowEqual(focusItemValue, value)}
            value={value}
            ref={ref => {
              if (ref && !disabled) {
                this.menuItems[`${groupId}-${onlyKey}`] = ref;
              }
            }}
            onSelect={(val, event, checked) => {
              console.log(item, '-----item-----');
              this.handleSelect(val, item, event, checked);
            }}
          >
            {renderMenuItem ? renderMenuItem(label, item) : label}
          </DropdownMenuItem>
        );
      });

    return createMenuItems(data);
  }

  render() {
    const { maxHeight, className, style, classPrefix, ...rest } = this.props;
    const classes = classNames(this.addPrefix('items'), className);
    const unhandled = getUnhandledProps(DropdownMenu, rest);

    return (
      <div
        {...unhandled}
        className={classes}
        ref={ref => {
          this.menuBodyContainer = ref;
        }}
        style={{
          ...style,
          maxHeight
        }}
      >
        <ul>{this.renderItems()}</ul>
      </div>
    );
  }
}

export default DropdownMenu;
