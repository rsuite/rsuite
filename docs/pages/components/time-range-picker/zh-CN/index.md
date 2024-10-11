# TimePicker 时间选择器

TimePicker 是一个允许用户选择时间值的组件。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 12 小时制/24 小时制

<!--{include:`meridiem.md`}-->

### 时间步长

<!--{include:`time-step.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 外观

<!--{include:`appearance.md`}-->

### 撑满

<!--{include:`block.md`}-->

### 占位符

<!--{include:`placeholder.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 加载中状态

<!--{include:`loading.md`}-->

### 受控与非受控的值

<!--{include:`controlled.md`}-->

## 可访问性

### ARIA 属性

默认拥有 DateRangeInput 组件的 ARIA 属性。

- 当值无效时，`aria-invalid="true"` 属性被添加到 `<input>` 元素。
- 当设置了 `label`, `aria-labelledby` 属性被添加到 `<input>` 元素和 `dialog` 元素上，并将值设置为 `label` 的 `id` 属性值。
- 拥有 `aria-haspopup="dialog"` 属性，用于指示组件拥有一个可交互的弹出层。

## Props

### `<TimeRangePicker>`

| 属性名称        | 类型`(默认值)`                                         | 描述                                               |
| --------------- | ------------------------------------------------------ | -------------------------------------------------- |
| appearance      | 'default' \| 'subtle' `('default')`                    | 设置外观                                           |
| block           | boolean                                                | 堵塞整行                                           |
| caretAs         | ElementType                                            | 自定义右侧箭头图标的组件                           |
| character       | string `(' ~ ')`                                       | 两个日期之间的分隔符                               |
| cleanable       | boolean `(true)`                                       | 可以清除选择值                                     |
| container       | HTMLElement \| (() => HTMLElement)                     | 设置渲染的容器                                     |
| defaultOpen     | boolean                                                | 默认打开                                           |
| defaultValue    | [Date, Date]                                           | 默认值（非受控）                                   |
| disabled        | boolean                                                | 禁用组件                                           |
| editable        | boolean `(true)`                                       | 渲染为 Input 输入框，可以通过键盘输入日期          |
| format          | string `('HH:mm')`                                     | 日期显示格式化                                     |
| hideHours       | (hour:number, date:Date) => boolean                    | 隐藏指定的小时选项                                 |
| hideMinutes     | (minute:number, date:Date) => boolean                  | 隐藏指定的分钟选项                                 |
| hideSeconds     | (second:number, date:Date) => boolean                  | 隐藏指定的秒选项                                   |
| label           | ReactNode                                              | 在按钮开头显示的标签                               |
| loading         | boolean `(false)`                                      | 是否显示一个加载中状态指示器                       |
| locale          | [DateTimeFormats](/zh/guide/i18n/#date-time-formats)   | 定义本地化设置，使组件文本根据用户地区显示相应语言 |
| onChange        | (value: [Date, Date]) => void                          | 值改变后的回调函数                                 |
| onClean         | (event) => void                                        | 清除值后的回调函数                                 |
| onClose         | () => void                                             | 关闭回调函数                                       |
| onEnter         | () => void                                             | 显示前动画过渡的回调函数                           |
| onEntered       | () => void                                             | 显示后动画过渡的回调函数                           |
| onEntering      | () => void                                             | 显示中动画过渡的回调函数                           |
| onExit          | () => void                                             | 退出前动画过渡的回调函数                           |
| onExited        | () => void                                             | 退出后动画过渡的回调函数                           |
| onExiting       | () => void                                             | 退出中动画过渡的回调函数                           |
| onOk            | (value: [Date, Date]) => void                          | 点击 "确定" 按钮后的回调函数                       |
| onOpen          | () => void                                             | 打开回调函数                                       |
| onShortcutClick | (shortcut: Range, event) => void                       | 点击快捷项的回调函数                               |
| open            | boolean                                                | 打开 (受控)                                        |
| placeholder     | string                                                 | 没有值时候默认显示内容                             |
| placement       | [Placement](#code-ts-placement-code) `('bottomStart')` | 显示位置                                           |
| preventOverflow | boolean                                                | 防止浮动元素溢出                                   |
| renderValue     | (date: [Date, Date], format: string) => string         | 自定义渲染值                                       |
| showMeridiem    | boolean                                                | 显示 12 小时制的时间格式                           |
| size            | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                  | 设置组件尺寸                                       |
| value           | [Date, Date]                                           | 当前值（受控）                                     |

<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/range.md)}-->
