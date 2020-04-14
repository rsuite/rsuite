# Toggle 开关

开关选择器，用于两个值之间的选择。

`<Toggle>` 开关组件

## 获取组件

```js
import { Toggle } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Toggle>`

| 属性名称          | 类型 `(默认值)`                                   | 描述                 |
| ----------------- | ------------------------------------------------- | -------------------- |
| checked           | boolean                                           | 指定当前是否选中     |
| checkedChildren   | React.Node                                        | 选中显示的内容       |
| classPrefix       | string `('toggle')`                               | 组件 CSS 类的前缀    |
| defaultChecked    | boolean                                           | 初始是否选中         |
| disabled          | boolean                                           | 禁用                 |
| onChange          | (checked: boolean, event: SyntheticEvent) => void | 状态改变时的回调函数 |
| size              | enum: 'lg', 'md', 'sm'                            | 开关尺寸             |
| unCheckedChildren | React.Node                                        | 非选中显示的内容     |
