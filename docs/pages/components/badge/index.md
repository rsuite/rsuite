# Badge 标记

用于按钮、图标旁的数字或状态标记。

## 获取组件

```js
import { Badge } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Badge>`

| 属性名称    | 类型`(默认值)`           | 描述                                            |
| ----------- | ------------------------ | ----------------------------------------------- |
| children    | React.Node               | 包裹的组件                                      |
| classPrefix | string `('badge')`       | 组件 CSS 类的前缀                               |
| content     | string,number,React.Node | 内容                                            |
| maxCount    | number`99`               | 最大计数（仅当 `content` 为 number 类型时有效） |
