# AutoComplete 自动完成

为输入框提供自动完成功能。

## 获取组件

<!--{include:(components/auto-complete/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 自动补齐

<!--{include:`email.md`}-->

### 自定义选项

<!--{include:`render-item.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 与 InputGroup 组合

<!--{include:`input-group.md`}-->

### 受控的

<!--{include:`controlled.md`}-->

## Props

<!--{include:(_common/types/data-item-type.md)}-->

### `<AutoComplete>`

| 属性名称       | 类型`(默认值)`                                     | 描述                                                                      |
| -------------- | -------------------------------------------------- | ------------------------------------------------------------------------- |
| classPrefix    | string `('auto-complete')`                         | 组件 CSS 类的前缀                                                         |
| data \*        | DataItemType[] &#124; string[]                     | 组件数据                                                                  |
| defaultValue   | string                                             | 设置默认值                                                                |
| disabled       | boolean                                            | 禁用组件                                                                  |
| filterBy       | (value: string, item: DataItemType) => boolean     | 自定义每个 item 是否显示（默认只会显示 data 中 value 是它的子字符串的项） |
| menuClassName  | string                                             | 选项菜单的 className                                                      |
| onChange       | (value:string, event) => void                      | `value` 发生改变时的回调函数                                              |
| onClose        | () => void                                         | 隐藏时的回调函数                                                          |
| onEnter        | () => void                                         | 显示前动画过渡的回调函数                                                  |
| onEntered      | () => void                                         | 显示后动画过渡的回调函数                                                  |
| onEntering     | () => void                                         | 显示中动画过渡的回调函数                                                  |
| onExit         | () => void                                         | 退出前动画过渡的回调函数                                                  |
| onExited       | () => void                                         | 退出后动画过渡的回调函数                                                  |
| onExiting      | () => void                                         | 退出中动画过渡的回调函数                                                  |
| onSelect       | (item:DataItemType, event) => void                 | 选项被点击选择后的回调函数                                                |
| placeholder    | ReactNode                                          | 占位符                                                                    |
| renderMenu     | (menu:ReactNode) => ReactNode                      | 自定义渲染菜单列表                                                        |
| renderMenuItem | (label:ReactNode, item: DataItemType) => ReactNode | 自定义选项                                                                |
| selectOnEnter  | boolean `(true)`                                   | 当设为 `false` 时，回车键不能作选值操作                                   |
| value          | string                                             | 设置值 `受控`                                                             |
