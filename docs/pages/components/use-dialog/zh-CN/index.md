# useDialog

`useDialog` 是一个 React Hook，提供了一种声明式的方式来显示不同类型的对话框（提醒、确认、输入框）和自定义对话框。

## 使用

<div class="rs-doc-steps">

<h3 class="rs-doc-step-header">安装 CustomProvider</h3>

<div class="rs-doc-step-body">

您需要做的第一件事是在应用程序的根目录下安装 CustomProvider, 用于管理对话框的渲染容器。

```jsx
import { CustomProvider } from 'rsuite';

function App({ children }) {
  return <CustomProvider>{children}</CustomProvider>;
}
```

</div>

<h3 class="rs-doc-step-header">使用 useDialog</h3>

<div class="rs-doc-step-body">

```jsx
import { useDialog } from 'rsuite';

function MyApp() {
  const dialog = useDialog();

  // 对话框
  dialog.alert('Hello, world!');

  // 确认对话框
  dialog.confirm('Are you sure?');

  // 输入对话框
  dialog.prompt('What is your name?');

  // 自定义对话框
  dialog.open(CustomDialog);
}
```

</div>

</div>

## 示例

### 提醒对话框

类似于 `window.alert` 它会打开一个对话框，向用户显示一条消息。

<!--{include:`alert.md`}-->

### 确认对话框

类似于 `window.confirm` 它会打开一个对话框，向用户提问。

<!--{include:`confirm.md`}-->

### 输入对话框

类似于 `window.prompt` 它会打开一个对话框，询问用户输入一些文本。

<!--{include:`prompt.md`}-->

### 带验证的输入对话框

您可以为输入对话框添加验证功能，以确保用户输入满足特定条件后才能继续操作。

<!--{include:`prompt-validation.md`}-->

### 自定义对话框

显示一个自定义对话框组件。

<!--{include:`custom.md`}-->

### 堆叠对话框

<!--{include:`stacked.md`}-->

## API

### `useDialog()`

返回一个包含以下方法的对象：

| 属性    | 类型                                                                                                             | 描述             |
| ------- | ---------------------------------------------------------------------------------------------------------------- | ---------------- |
| alert   | (message: ReactNode, options?: [AlertOptions](#code-ts-alert-options-code)) => Promise&lt;void&gt;               | 显示提醒对话框   |
| confirm | (message: ReactNode, options?: [ConfirmOptions](#code-ts-confirm-options-code)) => Promise&lt;boolean&gt;        | 显示确认对话框   |
| prompt  | (message: ReactNode, options?: [PromptOptions](#code-ts-prompt-options-code)) => Promise&lt;string&gt;           | 显示输入对话框   |
| open    | (component: ComponentType, payload?: P, options?: [OpenOptions](#code-ts-open-options-code)) => Promise&lt;T&gt; | 显示自定义对话框 |

### 类型定义

#### `ts:AlertOptions`

```ts
interface AlertOptions {
  title?: string; // 对话框标题,默认值为 'Alert'
  okText?: string; // 确定按钮文本,默认值为 'OK'
  onClose?: () => void; // 对话框关闭时的回调函数
}
```

#### `ts:ConfirmOptions`

```ts
interface ConfirmOptions {
  title?: string; // 对话框标题,默认值为 'Confirm'
  okText?: string; // 确定按钮文本,默认值为 'OK'
  cancelText?: string; // 取消按钮文本
  severity?: 'info' | 'success' | 'warning' | 'error'; // 对话框的视觉样式
  onClose?: (result: boolean) => void; // 对话框关闭时的回调函数
}
```

#### `ts:PromptOptions`

```ts
interface PromptOptions {
  title?: string; // 对话框标题,默认值为 'Confirm'
  okText?: string; // 确定按钮文本,默认值为 'OK'
  cancelText?: string; // 取消按钮文本
  defaultValue?: string; // 输入框的默认值
  validate?: (value: string) => [isValid: boolean, errorMessage?: string]; // 验证函数
  onClose?: (result: string) => void; // 对话框关闭时的回调函数
}
```

#### `ts:OpenOptions`

```ts
interface OpenOptions<T> {
  onClose?: (result?: T) => void; // 对话框关闭时的回调函数
}
```
