# AutoComplete 自动完成

为输入框提供自动完成功能。

## 获取组件

```js
import { AutoComplete } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<AutoComplete>`

| 属性名称      | 类型`(默认值)`                                                 | 描述                                    |
| ------------- | -------------------------------------------------------------- | --------------------------------------- |
| classPrefix   | string `('auto-complete')`                                     | 组件 CSS 类的前缀                       |
| data \*       | string[], Array&lt;[DataItemType](#types)&gt;                  | 组件数据                                |
| defaultValue  | string                                                         | 设置默认值 `非受控`                     |
| disabled      | boolean                                                        | 禁用组件                                |
| filterBy      | (value: string, item: [DataItemType](#types)) => boolean       | 自定义每个item是否显示（默认只会显示data中value是它的子字符串的项）|
| menuClassName | string                                                         | 选项菜单的 className                    |
| onChange      | (value:string, event) => void                                  | `value` 发生改变时的回调函数            |
| onClose       | () => void                                                     | 隐藏时的回调函数                        |
| onEnter       | () => void                                                     | 显示前动画过渡的回调函数                |
| onEntered     | () => void                                                     | 显示后动画过渡的回调函数                |
| onEntering    | () => void                                                     | 显示中动画过渡的回调函数                |
| onExit        | () => void                                                     | 退出前动画过渡的回调函数                |
| onExited      | () => void                                                     | 退出后动画过渡的回调函数                |
| onExiting     | () => void                                                     | 退出中动画过渡的回调函数                |
| onSelect      | (item:[DataItemType](#types), event) => void                   | 选项被点击选择后的回调函数              |
| placeholder   | React.Node                                                     | 占位符                                  |
| renderItem    | (label:React.Node, item: [DataItemType](#types)) => React.Node | 自定义被选中的选项                      |
| selectOnEnter | boolean `(true)`                                               | 当设为 `false` 时，回车键不能作选值操作 |
| value         | string                                                         | 设置值 `受控`                           |
