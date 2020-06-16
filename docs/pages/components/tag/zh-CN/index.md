# Tag 标签

`<Tag>`

## 获取组件

```js
import { Tag, TagGroup } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Tag>`

| 属性名称       | 类型`(默认值)`                             | 描述                   |
| -------------- | ------------------------------------------ | ---------------------- |
| children \*    | React.Node                                 | 组件的内容             |
| classPrefix    | string `('tag')`                           | 组件 CSS 类的前缀      |
| closable       | boolean                                    |
| componentClass | React.ElementType `('div')`                | 为组件自定义元素类型   |
| onClose        | (event: SyntheticEvent&lt;any&gt;) => void | 点击关闭按钮的回调函数 |
