# AutoComplete 自动完成

为输入框提供自动完成的功能。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 自动补齐后缀

<!--{include:`email.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 自定义选项

<!--{include:`render-item.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 与 InputGroup 组合

<!--{include:`input-group.md`}-->

### 受控的

<!--{include:`controlled.md`}-->

## 可访问性

### ARIA 属性

- Autocomplete 组件的 `role` 属性为 `combobox`。
- 有 `aria-haspopup="listbox"` 属性来指示输入框有一个弹出的列表框。
- 有 `aria-expanded` 属性来指示列表框是否打开。
- 有 `aria-controls` 属性来指示列表框元素的 ID。
- 有 `aria-activedescendant` 属性来指示焦点选项的 ID。

### 键盘交互

- <kbd>↓</kbd> - 移动焦点到下一个选项。
- <kbd>↑</kbd> - 移动焦点到上一个选项。
- <kbd>Enter</kbd> - 选择焦点选项。
- <kbd>Esc</kbd> - 关闭列表框。

## Props

### `<AutoComplete>`

| 属性名称       | 类型`(默认值)`                                                                     | 描述                                                                      |
| -------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| classPrefix    | string `('auto-complete')`                                                         | 组件 CSS 类的前缀                                                         |
| data \*        | [ItemDataType](#code-ts-item-data-type-code)[] &#124; string[]                     | 组件数据                                                                  |
| defaultValue   | string                                                                             | 默认值（非受控）                                                          |
| disabled       | boolean                                                                            | 禁用组件                                                                  |
| filterBy       | (value: string, item: [ItemDataType](#code-ts-item-data-type-code)) => boolean     | 自定义每个 item 是否显示（默认只会显示 data 中 value 是它的子字符串的项） |
| menuClassName  | string                                                                             | 选项菜单的 className                                                      |
| onChange       | (value:string, event) => void                                                      | `value` 发生改变时的回调函数                                              |
| onClose        | () => void                                                                         | 隐藏时的回调函数                                                          |
| onEnter        | () => void                                                                         | 显示前动画过渡的回调函数                                                  |
| onEntered      | () => void                                                                         | 显示后动画过渡的回调函数                                                  |
| onEntering     | () => void                                                                         | 显示中动画过渡的回调函数                                                  |
| onExit         | () => void                                                                         | 退出前动画过渡的回调函数                                                  |
| onExited       | () => void                                                                         | 退出后动画过渡的回调函数                                                  |
| onExiting      | () => void                                                                         | 退出中动画过渡的回调函数                                                  |
| onSelect       | (item: [ItemDataType](#code-ts-item-data-type-code), event) => void                | 选项被点击选择后的回调函数                                                |
| placeholder    | ReactNode                                                                          | 占位符                                                                    |
| renderMenu     | (menu:ReactNode) => ReactNode                                                      | 自定义渲染菜单列表                                                        |
| renderMenuItem | (label:ReactNode, item: [ItemDataType](#code-ts-item-data-type-code)) => ReactNode | 自定义选项                                                                |
| selectOnEnter  | boolean `(true)`                                                                   | 当设为 `false` 时，回车键不能作选值操作                                   |
| size           | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs'                                           | 设置组件尺寸                                                              |
| value          | string                                                                             | 当前值（受控）                                                            |

<!--{include:(_common/types/item-data-type.md)}-->
