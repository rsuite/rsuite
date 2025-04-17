# PinInput 验证码输入框

用于从用户处捕获 PIN 码或一次性密码(OTP)。

## 获取组件

<!--{include:<import-guide>}-->

## 示例

### 基本用法

<!--{include:`basic.md`}-->

### 大小

不同 `size` 的输入框。

<!--{include:`size.md`}-->

### 长度

通过 `length` 属性自定义输入框数量。

<!--{include:`length.md`}-->

### 遮罩 (Password)

使用 `mask` 属性隐藏输入内容。

<!--{include:`mask.md`}-->

### 一次性密码

使用 `otp` 属性优化一次性密码（OTP）输入。

<!--{include:`otp.md`}-->

### 紧凑

使用 `attached` 属性移除输入框间隙。

<!--{include:`attached.md`}-->

### 占位符

通过 `placeholder` 属性设置占位符。

<!--{include:`placeholder.md`}-->

### 禁用

使用 `disabled` 属性禁用输入框。

<!--{include:`disabled.md`}-->

### 只读

使用 `readonly` 属性设置只读。

<!--{include:`readonly.md`}-->

### 受控用法

受控 PinInput 及处理值变化和完成事件。

<!--{include:`controlled.md`}-->

### 允许的输入字符

使用 `allowedKeys` 属性限制可输入字符。例如 `/^[A-Fa-f0-9]$/`。

<!--{include:`allowed-keys.md`}-->

## 无障碍支持

### ARIA 属性

- 每个 PIN 输入框使用 `role="textbox"`，并通过隐藏的 `<input type="hidden"/>` 进行表单提交。
- 当 `otp` 为 `true` 时，输入框具有 `autocomplete="one-time-code"`；否则为 `autocomplete="off"`。

### 键盘交互

- 输入字符后，自动聚焦下一个输入框。
- 按 <kbd>Backspace</kbd> 清除当前输入，或在当前输入为空时聚焦上一个输入框。
- 使用 <kbd>ArrowLeft</kbd> 和 <kbd>ArrowRight</kbd> 在输入框之间导航。
- 粘贴内容时，依次填充输入框，并根据 `allowedKeys` 进行过滤。

## 属性

| 名称         | 类型                         | 默认值      | 说明                                 |
| ------------ | ---------------------------- | ----------- | ------------------------------------ |
| allowedKeys  | RegExp                       | /\d/        | 允许输入字符的正则模式               |
| attached     | boolean                      | false       | 是否紧凑排列输入框（无间隙）         |
| autoFocus    | boolean                      | false       | 是否在组件挂载后自动聚焦第一个输入框 |
| classPrefix  | string                       | 'pin-input' | 组件样式类名前缀                     |
| defaultValue | string                       | ''          | 默认 PIN 值（非受控）                |
| disabled     | boolean                      | false       | 是否禁用 PIN 输入                    |
| length       | number                       | 4           | PIN 位数                             |
| mask         | boolean                      | false       | 是否隐藏输入内容（如密码）           |
| name         | string                       |             | 表单提交时的 name 属性               |
| onChange     | (value: string) => void      |             | PIN 值变化时触发的回调               |
| onComplete   | (value: string) => void      |             | PIN 输入完成时触发的回调             |
| otp          | boolean                      | false       | 是否优化为一次性密码（OTP）输入      |
| placeholder  | string                       |             | 输入框占位提示                       |
| readOnly     | boolean                      | false       | 是否只读                             |
| size         | 'lg' \| 'md' \| 'sm' \| 'xs' | 'md'        | 输入框尺寸                           |
| value        | string                       |             | 受控值                               |
