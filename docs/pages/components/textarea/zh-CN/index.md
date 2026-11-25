# Textarea 文本域

用于多行文本输入的组件，支持内容自适应高度、尺寸和拖动调整。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 自动换行

<!--{include:`autosize.md`}-->

### 调整大小

<!--{include:`resize.md`}-->

## 属性

### `<Textarea>`

| 属性         | 类型（默认值）                                          | 说明                     |
| ------------ | ------------------------------------------------------- | ------------------------ |
| as           | ElementType `('textarea')`                              | 自定义组件元素类型       |
| autosize     | boolean                                                 | 是否根据内容自动调整高度 |
| classPrefix  | string `('textarea')`                                   | 组件 CSS 类名前缀        |
| defaultValue | string                                                  | 非受控初始值             |
| disabled     | boolean                                                 | 禁用状态                 |
| maxRows      | number                                                  | 自动高度时的最大行数     |
| minRows      | number                                                  | 自动高度时的最小行数     |
| onChange     | (value: string, event) => void                          | 值变化时回调             |
| placeholder  | string                                                  | 占位文本                 |
| readOnly     | boolean                                                 | 只读状态                 |
| resize       | 'none' \| 'both' \| 'horizontal' \| 'vertical' `(none)` | 是否允许用户拖动调整大小 |
| rows         | number `(3)`                                            | 可见文本行数             |
| size         | 'xs' \| 'sm' \| 'md' \| 'lg' `(md)`                     | 文本域尺寸               |
| value        | string                                                  | 受控值                   |
