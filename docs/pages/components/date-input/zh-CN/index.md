# DateInput 日期输入框

DateInput 组件允许用户使用键盘选择日期。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 自定义日期格式

<!--{include:`format.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 受控与非受控的值

<!--{include:`controlled.md`}-->

## 可访问性

### ARIA 属性

- DateInput 组件是 `<input type="text">`元素。
- 当 DateInput 组件被禁用时，`disabled` 属性被添加到 `<input>` 元素。
- 当 DateInput 组件为只读时，`readonly` 属性被添加到 `<input>` 元素。

### 键盘交互

- 使用 <kbd>→</kbd> <kbd>←</kbd> 键切换到选择年/月/日/时/分/秒。
- 使用 <kbd>↓</kbd> <kbd>↑</kbd> 键增加和减少值。
- 使用 <kbd>Backspace</kbd> 键删除选中的值。
- 使用数字健更新选中的值。

## Props

| 属性名称     | 类型`(默认值)`                  | 描述               |
| ------------ | ------------------------------- | ------------------ |
| defaultValue | Date                            | 默认值（非受控）   |
| disabled     | boolean                         | 禁用               |
| format       | string `('yyyy-MM-dd')`         | 日期显示格式化     |
| onChange     | (date: Date, event) => void     | 值改变后的回调函数 |
| plaintext    | boolean                         | 为纯文本呈现       |
| readOnly     | boolean                         | 日期输入框为只读   |
| size         | 'lg'〡'md'〡'sm'〡'xs' `('md')` | 设置日期输入框尺寸 |
| value        | Date                            | 当前值 （受控）    |
