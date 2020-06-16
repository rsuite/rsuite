# DatePicker 时间选择器

时间选择器，可以选择日期和时间。

- `<DatePicker>`

> 当需要选择日期范围，推荐使用 [`<DateRangePicker>`](./date-range-picker)

## 获取组件

```js
import { DatePicker } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<DatePicker>`

| 属性名称              | 类型`(默认值)`                               | 描述                                                      |
| --------------------- | -------------------------------------------- | --------------------------------------------------------- |
| appearance            | enum: 'default', 'subtle' `('default')`      | 设置外观                                                  |
| block                 | boolean                                      | 堵塞整行                                                  |
| calendarDefaultDate   | Date                                         | 日历面板默认呈现的日期时间                                |
| cleanable             | boolean `(true)`                             | 可以清除                                                  |
| container             | HTMLElement or (() => HTMLElement)           | 设置渲染的容器                                            |
| defaultOpen           | boolean                                      | 默认打开                                                  |
| defaultValue          | Date                                         | 默认值                                                    |
| disabled              | boolean                                      | 禁用组件                                                  |
| disabledDate          | (date:Date) => boolean                       | 禁用日期                                                  |
| disabledHours         | (hour:number, date:Date) => boolean          | 禁用小时                                                  |
| disabledMinutes       | (minute:number, date:Date) => boolean        | 禁用分钟                                                  |
| disabledSeconds       | (second:number, date:Date) => boolean        | 禁用秒                                                    |
| format                | string `('YYYY-MM-DD')`                      | 日期显示格式化                                            |
| hideHours             | (hour:number, date:Date) => boolean          | 隐藏小时                                                  |
| hideMinutes           | (minute:number, date:Date) => boolean        | 隐藏分钟                                                  |
| hideSeconds           | (second:number, date:Date) => boolean        | 隐藏秒                                                    |
| inline                | boolean                                      | 默认显示日历面板                                          |
| isoWeek               | boolean                                      | ISO 8601 标准， 每个日历星期从星期一开始，星期日为第 7 天 |
| limitEndYear          | number `(1000)`                              | 相对当前选择日期，设置可选年份下限                        |
| locale                | Object [`(Locale)`](#Locale)                 | 本地化对应的语言描述                                      |
| menuClassName         | string                                       | 选项菜单的 className                                      |
| onChange              | (date:Date) => void                          | 值改变后的回调函数                                        |
| onChangeCalendarDate  | (date: Date, event?: SyntheticEvent) => void | 日历日期改变后的回调函数                                  |
| onClean               | (event:SyntheticEvent) => void               | 清除值后的回调函数                                        |
| onClose               | () => void                                   | 关闭回调函数                                              |
| onEnter               | () => void                                   | 显示前动画过渡的回调函数                                  |
| onEntered             | () => void                                   | 显示后动画过渡的回调函数                                  |
| onEntering            | () => void                                   | 显示中动画过渡的回调函数                                  |
| onExit                | () => void                                   | 退出前动画过渡的回调函数                                  |
| onExited              | () => void                                   | 退出后动画过渡的回调函数                                  |
| onExiting             | () => void                                   | 退出中动画过渡的回调函数                                  |
| onNextMonth           | (date: Date) => void                         | 切换到下一月的回调函数                                    |
| onOk                  | (date: Date, event: SyntheticEvent) => void  | 点击确定后的回调函数                                      |
| onOpen                | () => void                                   | 打开回调函数                                              |
| onPrevMonth           | (date: Date) => void                         | 切换到上一月的回调函数                                    |
| onSelect              | (date:Date) => void                          | 选择日期或者时间的回调函数                                |
| onToggleMonthDropdown | (open: boolean) => void                      | 切换到月份视图的回调函数                                  |
| onToggleTimeDropdown  | (open: boolean) => void                      | 切换到时间视图的回调函数                                  |
| oneTap                | boolean                                      | 一个点击完成选择日期                                      |
| open                  | boolean                                      | 打开 (受控)                                               |
| placeholder           | string                                       | 没有值时候默认显示内容                                    |
| placement             | enum: [Placement](#types) `('bottomStart')`  | 显示位置                                                  |
| preventOverflow       | boolean                                      | 防止浮动元素溢出                                          |
| ranges                | Array<[Range](#types)> [`(Ranges)`](#Ranges) | 快捷项配置                                                |
| showMeridian          | boolean                                      | 显示 12 小时制的时间格式                                  |
| showWeekNumbers       | boolean                                      | 显示周数量                                                |
| toggleComponentClass  | React.ElementType `('a')`                    | 为组件自定义元素类型                                      |
| value                 | Date                                         | 值`受控`                                                  |

## Default

### Locale

```js
const Locale = {
  sunday: 'Su',
  monday: 'Mo',
  tuesday: 'Tu',
  wednesday: 'We',
  thursday: 'Th',
  friday: 'Fr',
  saturday: 'Sa',
  ok: 'OK',
  today: 'Today',
  yesterday: 'Yesterday',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds'
};
```

### Ranges

```js
const Ranges = [
  {
    label: 'today',
    value: new Date(),
    closeOverlay: true
  },
  {
    label: 'yesterday',
    value: dateFns.addDays(new Date(), -1),
    closeOverlay: true
  }
];
```
