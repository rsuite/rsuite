// @flow
import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import setStatic from 'recompose/setStatic';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import { MenuWrapper } from 'rsuite-utils/lib/Picker';

import Input from './Input';
import AutoCompleteItem from './AutoCompleteItem';
import { defaultProps, getUnhandledProps, prefix } from './utils';
import { globalKey } from './utils/prefix';

type DefaultEvent = SyntheticEvent<*>;
type PlacementEightPoints =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight'
  | 'leftTop'
  | 'rightTop'
  | 'leftBottom'
  | 'rightBottom';

type ItemDataType = {
  label: any,
  value: any
};

type Props = {
  data: Array<string | ItemDataType>,
  disabled?: boolean,
  onSelect?: (item: ItemDataType, event: DefaultEvent) => void,
  onChange?: (value: string, event: DefaultEvent) => void,
  classPrefix?: string,
  value?: string,
  defaultValue?: string,
  className?: string,
  placement?: PlacementEightPoints,
  onFocus?: (event: DefaultEvent) => void,
  onMenuFocus?: (focusItemValue: any, event: DefaultEvent) => void,
  onBlur?: (event: DefaultEvent) => void,
  onKeyDown?: (event: DefaultEvent) => void,
  onOpen?: () => void,
  onClose?: () => void,
  renderItem?: (itemValue: string) => React.Node,
  style?: Object,
  open?: boolean
};

type State = {
  value: string,
  focus?: boolean,
  focusItemValue?: string
};

class AutoComplete extends React.Component<Props, State> {
  static defaultProps = {
    data: [],
    placement: 'bottomLeft'
  };

  constructor(props: Props) {
    super(props);

    const nextValue = props.defaultValue;

    this.state = {
      value: nextValue || '',
      focus: false,
      focusItemValue: nextValue
    };
  }

  getValue() {
    const { value } = this.props;
    return _.isUndefined(value) ? this.state.value : value;
  }

  getData() {
    const { data = [] } = this.props;
    return data.map(item => {
      if (_.isString(item)) {
        return {
          value: item,
          label: item
        };
      }

      if (typeof item === 'object') {
        return item;
      }
    });
  }

  getFocusableMenuItems = (): Array<any> => {
    const data = this.getData();
    if (!data) {
      return [];
    }
    return data.filter(this.shouldDisplay);
  };

  trigger = null;
  menuContainer = null;

  findNode(focus: Function) {
    const items = this.getFocusableMenuItems();
    const { focusItemValue } = this.state;

    for (let i = 0; i < items.length; i += 1) {
      if (_.eq(focusItemValue, items[i].value)) {
        focus(items, i);
        return;
      }
    }

    focus(items, -1);
  }

  shouldDisplay = (item: any) => {
    const { value } = this.state;
    if (!_.trim(value)) {
      return false;
    }
    const keyword = value.toLocaleLowerCase();
    return item.label.toLocaleLowerCase().indexOf(keyword) >= 0;
  };

  handleChange = (value: string, event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    this.setState({
      focus: true,
      focusItemValue: undefined,
      value
    });
    if (this.state.value !== value) {
      onChange && onChange(value, event);
    }
  };

  handleInputFocus = (event: DefaultEvent) => {
    const { onFocus } = this.props;
    this.open();
    onFocus && onFocus(event);
  };

  handleInputBlur = (event: DefaultEvent) => {
    const { onBlur } = this.props;
    setTimeout(this.close, 300);
    onBlur && onBlur(event);
  };

  focusNextMenuItem(event: DefaultEvent) {
    const { onMenuFocus } = this.props;
    this.findNode((items, index) => {
      const item = items[index + 1];
      if (!_.isUndefined(item)) {
        const focusItemValue = item.value;
        this.setState({ focusItemValue });
        onMenuFocus && onMenuFocus(focusItemValue, event);
      }
    });
  }

  focusPrevMenuItem(event: DefaultEvent) {
    const { onMenuFocus } = this.props;
    this.findNode((items, index) => {
      const item = items[index - 1];
      if (!_.isUndefined(item)) {
        const focusItemValue = item.value;
        this.setState({ focusItemValue });
        onMenuFocus && onMenuFocus(focusItemValue, event);
      }
    });
  }

  selectFocusMenuItem(event: DefaultEvent) {
    const { onChange } = this.props;
    const { focusItemValue } = this.state;

    if (!focusItemValue) {
      return;
    }

    this.setState(
      {
        value: focusItemValue,
        focusItemValue
      },
      () => {
        onChange && onChange(focusItemValue, event);
        this.close();
      }
    );
  }

  close = () => {
    this.setState({ focus: false }, this.props.onClose);
  };
  open = () => {
    this.setState({ focus: true }, this.props.onOpen);
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    if (!this.menuContainer) {
      return;
    }

    const { onKeyDown } = this.props;

    switch (event.keyCode) {
      // down
      case 40:
        this.focusNextMenuItem(event);
        event.preventDefault();
        break;
      // up
      case 38:
        this.focusPrevMenuItem(event);
        event.preventDefault();
        break;
      // enter
      case 13:
        this.selectFocusMenuItem(event);
        event.preventDefault();
        break;
      // esc | tab
      case 27:
      case 9:
        this.close();
        event.preventDefault();
        break;
      default:
    }
    onKeyDown && onKeyDown(event);
  };

  handleSelect = (item: ItemDataType, event: DefaultEvent) => {
    const { onChange, onSelect } = this.props;
    const value = item.value;
    this.setState({
      value,
      focusItemValue: value
    });

    onSelect && onSelect(item, event);

    if (this.state.value !== value) {
      onChange && onChange(value, event);
    }
    this.close();
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  menuContainerRef = ref => {
    this.menuContainer = ref;
  };

  triggerRef = ref => {
    this.trigger = ref;
  };

  renderDropdownMenu() {
    const { placement, renderItem } = this.props;
    const data = this.getData();
    const { focusItemValue } = this.state;
    const classes = classNames(
      this.addPrefix('menu'),
      `${globalKey}placement-${_.kebabCase(placement)}`
    );
    const items = data.filter(this.shouldDisplay);

    return (
      <MenuWrapper className={classes} onKeyDown={this.handleKeyDown}>
        <div ref={this.menuContainerRef}>
          <ul role="menu">
            {items.map(item => (
              <AutoCompleteItem
                key={item.value}
                focus={focusItemValue === item.value}
                itemData={item}
                onSelect={this.handleSelect}
                renderItem={renderItem}
              >
                {item.label}
              </AutoCompleteItem>
            ))}
          </ul>
        </div>
      </MenuWrapper>
    );
  }
  render() {
    const {
      disabled,
      className,
      classPrefix,
      defaultValue,
      placement,
      open,
      style,
      ...rest
    } = this.props;

    const data = this.getData();
    const value = this.getValue();
    const unhandled = getUnhandledProps(AutoComplete, rest);
    const classes = classNames(classPrefix, className, {
      [this.addPrefix('disabled')]: disabled
    });

    const hasItems = data.filter(this.shouldDisplay).length > 0;

    return (
      <div className={classes} style={style}>
        <OverlayTrigger
          ref={this.triggerRef}
          disabled={disabled}
          trigger={['click', 'focus']}
          placement={placement}
          open={open || (this.state.focus && hasItems)}
          speaker={this.renderDropdownMenu()}
        >
          <Input
            {...unhandled}
            disabled={disabled}
            value={value}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </OverlayTrigger>
      </div>
    );
  }
}

const EnhancedAutoComplete = defaultProps({
  classPrefix: 'auto-complete'
})(AutoComplete);

setStatic('Item', AutoCompleteItem)(AutoComplete);

export default EnhancedAutoComplete;
