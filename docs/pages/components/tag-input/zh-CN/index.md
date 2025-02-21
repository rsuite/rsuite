# TagInput 标签输入

对 Input 的增强，支持输入标签，管理标签。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 撑满

<!--{include:`block.md`}-->

### 触发事件

通过 `trigger` 属性设置创建标签的触发器。 可选择包括：`Enter`, `Space`, `Comma`，默认值为 `Enter`, 可以同时设置多个触发事件。

<!--{include:`trigger.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

## 无障碍设计

了解更多有关[无障碍设计](/zh/guide/accessibility)的信息。

## Props

### `<TagInput>`

| 属性名称     | 类型`(默认值)`                                               | 描述                   |
| ------------ | ------------------------------------------------------------ | ---------------------- |
| defaultValue | string[]                                                     | 默认值（非受控）       |
| disabled     | boolean                                                      | 禁用组件               |
| onChange     | (value:string, event) => void                                | 值发生改变时的回调函数 |
| onClean      | (event) => void                                              | 值清理后触发回调       |
| onTagRemove  | (value: string, event: MouseEvent) => void                   | 移除标签时的回调函数   |
| size         | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`            | 设置组件尺寸           |
| trigger      | 'Enter' &#124; 'Space' &#124; 'Comma' `(['Enter', 'Space'])` | 设置创建标签的触发事件 |
| value        | string[]                                                     | 当前值（受控）         |
