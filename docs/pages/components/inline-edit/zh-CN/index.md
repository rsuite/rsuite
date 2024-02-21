# InlineEdit 内联编辑

`InlineEdit` 显示一个自定义输入组件，可以在同一个页面上切换读取和编辑。

## 获取组件

<!--{include:<import-guide>}-->

## 示例

### 基础

<!--{include:`basic.md`}-->

### TextArea

<!--{include:`text-area.md`}-->

### 使用 InputPicker 并且不显示控制按钮

<!--{include:`with-input-picker.md`}-->

### 使用 TagPicker

<!--{include:`with-tag-picker.md`}-->

### 使用 DatePicker

<!--{include:`with-date-picker.md`}-->

### 使用 Slider

<!--{include:`with-slider.md`}-->

### 自定义输入

InlineEdit 可以包裹任何数据输入组件，包括自定义输入组件。

<!--{include:`custom-input.md`}-->

### 用户资料

<!--{include:`user-profile.md`}-->

### 不同尺寸

<!--{include:`size.md`}-->

## Props

### `<InlineEdit>`

| 属性         | 类型 `(默认值)`                                                 | 说明                                      |
| ------------ | --------------------------------------------------------------- | ----------------------------------------- |
| as           | elementType `('div')`                                           | 自定义元素类型。                          |
| disabled     | boolean                                                         | 如果为 `true`，则 `InlineEdit` 将被禁用。 |
| defaultValue | any                                                             | 当未受控时，`InlineEdit` 的初始值。       |
| value        | any                                                             | `InlineEdit` 的值。                       |
| showControls | boolean `(true)`                                                | 编辑时显示控制按钮。                      |
| placeholder  | string                                                          | `InlineEdit` 的占位符。                   |
| size         | `'lg'` \| `'md'` \| `'sm'` \| `'xs'`                            | `InlineEdit` 的大小。                     |
| stateOnBlur  | `'save'` \| `'cancel'`                                          | 当失焦时，`InlineEdit` 的状态。           |
| onChange     | (value: any, event: ChangeEvent) => void                        | `InlineEdit` 的值发生变化时的回调函数。   |
| onCancel     | (event?: SyntheticEvent) => void                                | 当 `InlineEdit` 被取消时的回调函数。      |
| onSave       | (event?: SyntheticEvent) => void                                | 当 `InlineEdit` 被保存时的回调函数。      |
| onEdit       | (event: SyntheticEvent) => void                                 | 当 `InlineEdit` 被点击时的回调函数。      |
| children     | ReactNode \| (props: ChildrenProps, ref: Ref<any>) => ReactNode | `InlineEdit` 的渲染函数。                 |
