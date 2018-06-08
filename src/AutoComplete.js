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
type Placement =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight'
  | 'leftTop'
  | 'rightTop'
  | 'leftBottom'
  | 'rightBottom'
  | 'auto'
  | 'autoVerticalLeft'
  | 'autoVerticalRight'
  | 'autoHorizontalTop'
  | 'autoHorizontalBottom';

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
  menuClassName?: string,
  placement?: Placement,
  onFocus?: (event: DefaultEvent) => void,
  onMenuFocus?: (focusItemValue: any, event: DefaultEvent) => void,
  onBlur?: (event: DefaultEvent) => void,
  onKeyDown?: (event: DefaultEvent) => void,
  onOpen?: () => void,
  onClose?: () => void,
  renderItem?: (itemValue: string) => React.Node,
  style?: Object,
  open?: boolean,
  selectOnEnter?: boolean
};

type State = {
  value: string,
  focus?: boolean,
  focusItemValue?: any
};

class AutoComplete extends React.Component<Props, State> {
  static defaultProps = {
    data: [],
    placement: 'bottomLeft',
    selectOnEnter: true
  };

  constructor(props: Props) {
    super(props);
    const { defaultValue } = props;

    this.state = {
      value: defaultValue || '',
      focus: false,
      focusItemValue: defaultValue
    };
  }

  getValue() {
    const { value } = this.props;
    return _.isUndefined(value) ? this.state.value : value;
  }

  getData(props) {
    const { data = [] } = props || this.props;
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
    const value = this.getValue();
    if (!_.trim(value)) {
      return false;
    }
    const keyword = (value || '').toLocaleLowerCase();
    return item.label.toLocaleLowerCase().indexOf(keyword) >= 0;
  };

  handleChange = (value: string, event: SyntheticInputEvent<HTMLInputElement>) => {
    const nextState = {
      focus: true,
      focusItemValue: undefined,
      value
    };
    this.setState(nextState);
    this.handleChangeValue(value, event);
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
    const { focusItemValue, value: prevValue } = this.state;
    if (!focusItemValue) {
      return;
    }
    const nextState = {
      value: focusItemValue,
      focusItemValue
    };

    const data = this.getData();
    const focusItem: any = data.find(item => _.get(item, 'value') === focusItemValue);

    this.setState(nextState);
    this.handleSelect(focusItem, event);
    if (prevValue !== focusItemValue) {
      this.handleChangeValue(focusItemValue, event);
    }

    this.close();
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

    const { onKeyDown, selectOnEnter } = this.props;

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
        selectOnEnter && this.selectFocusMenuItem(event);
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

  handleChangeValue = (value: any, event: DefaultEvent) => {
    const { onChange } = this.props;
    onChange && onChange(value, event);
  };

  handleSelect = (item: ItemDataType, event: DefaultEvent) => {
    const { onSelect } = this.props;
    onSelect && onSelect(item, event);
  };

  handleItemSelect = (item: ItemDataType, event: DefaultEvent) => {
    const { onSelect } = this.props;
    const value = item.value;
    const prevValue = this.state.value;
    const nextState = {
      value,
      focusItemValue: value
    };
    this.setState(nextState);
    this.handleSelect(item, event);
    if (prevValue !== value) {
      this.handleChangeValue(value, event);
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
    const { placement, renderItem, menuClassName } = this.props;
    const data = this.getData();
    const { focusItemValue } = this.state;
    const classes = classNames(
      this.addPrefix('menu'),
      menuClassName,
      `${globalKey}placement-${_.kebabCase(placement)}`
    );
    const items = data.filter(this.shouldDisplay);

    return (
      <MenuWrapper className={classes} onKeyDown={this.handleKeyDown} ref={this.menuContainerRef}>
        <ul role="menu">
          {items.map(item => (
            <AutoCompleteItem
              key={item.value}
              focus={focusItemValue === item.value}
              itemData={item}
              onSelect={this.handleItemSelect}
              renderItem={renderItem}
            >
              {item.label}
            </AutoCompleteItem>
          ))}
        </ul>
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
