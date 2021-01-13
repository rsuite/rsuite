import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getPosition, scrollTop, getHeight } from 'dom-lib';
import classNames from 'classnames';
import List, { ListProps } from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import shallowEqual from '../utils/shallowEqual';
import { getUnhandledProps, prefix, defaultProps } from '../utils';
import DropdownMenuGroup from './DropdownMenuGroup';
import { KEY_GROUP, KEY_GROUP_TITLE } from '../utils/getDataGroupBy';

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
  virtualized?: boolean;
  // https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#prop-types
  listProps?: ListProps;
  renderMenuItem?: (itemLabel: React.ReactNode, item: any) => React.ReactNode;
  renderMenuGroup?: (title: React.ReactNode, item: any) => React.ReactNode;
  onSelect?: (value: any, item: any, event: React.MouseEvent, checked?: boolean) => void;
  onGroupTitleClick?: (event: React.MouseEvent) => void;
}

interface DropdownMenuState {
  foldedGroupKeys: string[];
}

export const dropdownMenuPropTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  dropdownMenuItemComponentClass: PropTypes.elementType,
  dropdownMenuItemClassPrefix: PropTypes.string,
  data: PropTypes.array,
  group: PropTypes.bool,
  disabledItemValues: PropTypes.array,
  activeItemValues: PropTypes.array,
  focusItemValue: PropTypes.any,
  maxHeight: PropTypes.number,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  style: PropTypes.object,
  renderMenuItem: PropTypes.func,
  renderMenuGroup: PropTypes.func,
  onSelect: PropTypes.func,
  onGroupTitleClick: PropTypes.func,
  virtualized: PropTypes.bool,
  listProps: PropTypes.object
};

const ROW_HEIGHT = 36;

class DropdownMenu extends React.Component<DropdownMenuProps, DropdownMenuState> {
  static propTypes = dropdownMenuPropTypes;
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
    this.state = {
      foldedGroupKeys: []
    };
  }

  componentDidMount() {
    this.updateScrollPoistion();
  }

  componentDidUpdate(prevProps: DropdownMenuProps) {
    if (!shallowEqual(prevProps.focusItemValue, this.props.focusItemValue)) {
      this.updateScrollPoistion();
    }
  }

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

  getRowHeight(list: any[], { index }) {
    const item = list[index];

    if (this.props.group && item[KEY_GROUP] && index !== 0) {
      return 48;
    }

    return ROW_HEIGHT;
  }

  /**
   * public: Provided to Picker calls, support keyboard operation to get focus.
   */
  getItemData = (itemData: any) => {
    return itemData;
  };

  /**
   * public: Provided to Picker calls, support keyboard operation to get focus.
   */
  menuItems = {};
  bindMenuItems = (disabled: boolean, key: string, ref: React.Ref<any>) => {
    if (ref && !disabled) {
      this.menuItems[key] = ref;
    }
  };

  handleGroupTitleClick = (key: string, event: React.MouseEvent) => {
    const { foldedGroupKeys } = this.state;
    const nextGroupKeys = foldedGroupKeys.filter(item => item !== key);

    if (nextGroupKeys.length === foldedGroupKeys.length) {
      nextGroupKeys.push(key);
    }

    this.setState({ foldedGroupKeys: nextGroupKeys });
    this.props.onGroupTitleClick?.(event);
  };
  renderItem(list: any[], { index, style }: { index: number; style?: React.CSSProperties }) {
    const {
      valueKey,
      labelKey,
      group,
      renderMenuGroup,
      disabledItemValues,
      activeItemValues,
      focusItemValue,
      renderMenuItem,
      dropdownMenuItemClassPrefix,
      dropdownMenuItemComponentClass: DropdownMenuItem
    } = this.props;

    const { foldedGroupKeys } = this.state;
    const item = list[index];
    const value = item[valueKey];
    const label = item[labelKey];

    if (_.isUndefined(label) && !item[KEY_GROUP]) {
      throw Error(`labelKey "${labelKey}" is not defined in "data" : ${index}`);
    }

    // Use `value` in keys when If `value` is string or number
    const itemKey = _.isString(value) || _.isNumber(value) ? value : index;

    /**
     * Render <DropdownMenuGroup>
     * when if `group` is enabled
     */
    if (group && item[KEY_GROUP]) {
      const groupValue = item[KEY_GROUP_TITLE];
      return (
        <DropdownMenuGroup
          style={style}
          classPrefix={this.addPrefix('group')}
          className={classNames({
            folded: foldedGroupKeys.some(key => key === groupValue)
          })}
          key={`group-${groupValue}`}
          data-key={`group-${groupValue}`}
          onClick={this.handleGroupTitleClick.bind(null, groupValue)}
        >
          {renderMenuGroup ? renderMenuGroup(groupValue, item) : groupValue}
        </DropdownMenuGroup>
      );
    } else if (_.isUndefined(value) && !_.isUndefined(item[KEY_GROUP])) {
      throw Error(`valueKey "${valueKey}" is not defined in "data" : ${index} `);
    }

    const disabled = disabledItemValues?.some(disabledValue => shallowEqual(disabledValue, value));
    const active = activeItemValues?.some(v => shallowEqual(v, value));
    const focus = !_.isUndefined(focusItemValue) && shallowEqual(focusItemValue, value);

    return (
      <DropdownMenuItem
        data-key={itemKey}
        style={style}
        key={itemKey}
        disabled={disabled}
        active={active}
        focus={focus}
        value={value}
        classPrefix={dropdownMenuItemClassPrefix}
        getItemData={this.getItemData.bind(this, item)}
        ref={this.bindMenuItems.bind(this, disabled, itemKey)}
        onSelect={this.handleSelect.bind(this, item)}
      >
        {renderMenuItem ? renderMenuItem(label, item) : label}
      </DropdownMenuItem>
    );
  }
  renderMenuItems() {
    this.menuItems = {};
    const {
      data = [],
      group,
      maxHeight,
      activeItemValues,
      valueKey,
      virtualized,
      listProps
    } = this.props;
    const { foldedGroupKeys } = this.state;
    const filteredItems = group
      ? data.filter(item => !foldedGroupKeys?.some(key => key === item.parent?.[KEY_GROUP_TITLE]))
      : data;
    const rowCount = filteredItems.length;

    if (virtualized && rowCount * ROW_HEIGHT > maxHeight) {
      return (
        <AutoSizer defaultHeight={maxHeight} style={{ width: 'auto', height: 'auto' }}>
          {({ height, width }) => (
            <List
              {...listProps}
              width={width}
              height={height || maxHeight}
              scrollToIndex={_.findIndex(data, item => item[valueKey] === activeItemValues?.[0])}
              rowCount={rowCount}
              rowHeight={this.getRowHeight.bind(this, filteredItems)}
              rowRenderer={this.renderItem.bind(this, filteredItems)}
            />
          )}
        </AutoSizer>
      );
    }

    return (
      <React.Fragment>
        {filteredItems.map((_item, index: number) => this.renderItem(filteredItems, { index }))}
      </React.Fragment>
    );
  }

  render() {
    const { maxHeight, className, style, group, ...rest } = this.props;
    const classes = classNames(className, this.addPrefix('items'), {
      grouped: group
    });
    const unhandled = getUnhandledProps(DropdownMenu, rest);
    const styles = {
      ...style,
      maxHeight
    };

    return (
      <div
        role="list"
        className={classes}
        ref={this.menuBodyContainerRef}
        style={styles}
        {...unhandled}
      >
        {this.renderMenuItems()}
      </div>
    );
  }
}

export default defaultProps<DropdownMenuProps>({
  classPrefix: 'dropdown-menu'
})(DropdownMenu);
