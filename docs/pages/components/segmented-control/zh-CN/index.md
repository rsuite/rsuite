# SegmentedControl 分段器

分段器用于在多个互斥选项中提供选择。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`sizes.md`}-->

### 禁用

禁用状态的分段器，不可交互。

<!--{include:`disabled.md`}-->

### 指示器外观

分段器支持两种指示器样式：圆角矩形（Pill）和下划线（Underline）。

<!--{include:`indicator-styles.md`}-->

### 使用图标

可以在分段器中结合图标使用，使选项更加直观。

<!--{include:`custom-data.md`}-->

### 受控的

受控模式下的分段器，通过 `value` 和 `onChange` 属性控制选中状态。

<!--{include:`controlled.md`}-->

### 块级显示

将分段器设置为块级元素，使其填充父容器的宽度。

<!--{include:`block.md`}-->

## 可访问性

### ARIA 属性

- 分段器的 `role` 属性为 `radiogroup`。
- 每个分段的 `role` 属性为 `radio`。
- 如果选中分段，则将 `aria-checked` 设置为 `true`。

### 键盘交互

- <kbd>→</kbd> 或者 <kbd>↓</kbd> - 将焦点移动到下一个分段，当焦点位于分段组中的最后一个分段上则移动到第一个分段。
- <kbd>←</kbd> 或者 <kbd>↑</kbd> - 将焦点移动到上一个分段。焦点位于分段组中的第一个分段上则移动到最后个分段。

## Props

### `<SegmentedControl>`

| 属性名称     | 类型 `(默认值)`                                                   | 描述                   |
| ------------ | ----------------------------------------------------------------- | ---------------------- |
| block        | boolean                                                           | 块级显示，撑满容器宽度 |
| data         | [SegmentedItemDataType](#code-ts-segmented-item-data-type-code)[] | 分段项数据             |
| defaultValue | string \| number                                                  | 默认值                 |
| disabled     | boolean                                                           | 是否禁用组件           |
| indicator    | 'pill' \| 'underline' `('pill')`                                  | 分段控件的指示器样式   |
| name         | string                                                            | 表单名称               |
| onChange     | (value: string \| number, event) => void                          | 值变化时的回调函数     |
| size         | [Size](#code-ts-size-code) `('md')`                               | 设置组件尺寸           |
| value        | string \| number                                                  | 值（受控）             |

### 类型定义

#### `ts:SegmentedItemDataType`

```ts
interface SegmentedItemDataType {
  /** The label of the item */
  label: React.ReactNode;
  /** The value of the item */
  value: string | number;
}
```

#### `ts:Size`

```ts
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```
