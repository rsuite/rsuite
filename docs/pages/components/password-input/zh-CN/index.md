# PasswordInput 密码输入框

只能输入密码的文本输入组件。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 禁用

<!--{include:`disabled.md`}-->

### 自定义可见性图标

<!--{include:`custom-icon.md`}-->

### 前置图标和后置图标

可以通过 `startIcon` 和 `endIcon` 分别设置前置图标和后置图标。
当使用 `endIcon` 时，密码输入框的可见性切换图标将被覆盖。

<!--{include:`icons.md`}-->

### 密码强度

<!--{include:`password-strength-meter.md`}-->

## Props

### `<PasswordInput>`

| 属性名               | 类型 `(默认值)`                       | 说明                    |
| -------------------- | ------------------------------------- | ----------------------- |
| classPrefix          | string `('password-input')`           | 组件 CSS 类前缀         |
| defaultValue         | string                                | 默认值（非受控）        |
| defaultVisible       | boolean                               | 默认密码可见状态        |
| disabled             | boolean                               | 是否禁用                |
| endIcon              | ReactNode                             | 后置图标                |
| htmlSize             | number                                | 设置原生 HTML size 属性 |
| onChange             | (value: string, event) => void        | 输入变更回调            |
| onVisibleChange      | (visible: boolean) => void            | 密码可见性变化回调      |
| readOnly             | boolean                               | 是否只读                |
| renderVisibilityIcon | (visible: boolean) => ReactNode       | 自定义可见性切换图标    |
| size                 | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | 输入框尺寸              |
| startIcon            | ReactNode                             | 前置图标                |
| value                | string                                | 当前值（受控）          |
| visible              | boolean                               | 控制密码是否可见        |

### `<PasswordStrengthMeter>`

| 属性名      | 类型 `(默认值)`                      | 说明                       |
| ----------- | ------------------------------------ | -------------------------- |
| classPrefix | string `('password-strength-meter')` | 组件 CSS 类前缀            |
| label       | ReactNode                            | 显示在强度条下方的标签文本 |
| level       | number                               | 当前密码强度等级           |
| max         | number `(4)`                         | 强度分段数量               |
