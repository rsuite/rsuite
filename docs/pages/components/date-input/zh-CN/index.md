# DateInput 日期输入框

DateInput 组件允许用户使用键盘选择日期。

## 获取组件

<!--{include:(components/date-input/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 自定义日期格式

<!--{include:`format.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 受控与非受控的值

<!--{include:`controlled.md`}-->

## Props

<!-- prettier-sort-markdown-table -->

| 属性名称     | 类型`(默认值)`                  | 描述               |
| ------------ | ------------------------------- | ------------------ |
| defaultValue | Date                            | 默认值             |
| disabled     | boolean                         | 禁用               |
| format       | string `('yyyy-MM-dd')`         | 日期显示格式化     |
| onChange     | (date: Date, event) => void     | 值改变后的回调函数 |
| plaintext    | boolean                         | 为纯文本呈现       |
| readOnly     | boolean                         | 日期输入框为只读   |
| size         | 'lg'〡'md'〡'sm'〡'xs' `('md')` | 设置日期输入框尺寸 |
| value        | Date                            | 设置值 `受控`      |
