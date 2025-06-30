# useToaster

`useToaster` 是一个用于创建和管理 Toast 的 React Hook。

## 使用

<div class="rs-doc-steps">

<h3 class="rs-doc-step-header">安装 CustomProvider</h3>

<div class="rs-doc-step-body">

您需要做的第一件事是在应用程序的根目录下安装 CustomProvider, 用于管理 Toast 的渲染容器。

```jsx
import { CustomProvider } from 'rsuite';

function App({ children }) {
  return <CustomProvider>{children}</CustomProvider>;
}
```

</div>

<h3 class="rs-doc-step-header">使用 useToaster</h3>

<div class="rs-doc-step-body">

```jsx
import { useToaster, Message, Notification } from 'rsuite';

function MyApp() {
  const toaster = useToaster();

  // 显示一个消息
  toaster.push(<Message>message</Message>);

  // 显示一个通知
  toaster.push(<Notification>notification</Notification>);
}
```

</div>

</div>

## 演示

### 与 Message 组合

展示如何将 Toaster 与 `Message` 组件结合使用，显示临时消息通知。

<!--{include:`with-message.md`}-->

### 与 Notification 组合

展示如何将 Toaster 与 `Notification` 组件结合使用，显示更丰富的通知内容。

<!--{include:`with-notification.md`}-->

### 自定义 Toast

展示如何创建自定义样式的 Toast 消息，包括自定义内容和样式。

<!--{include:`custom.md`}-->

### 自定义容器

演示如何将 Toast 消息渲染到指定的 DOM 容器中，而不是默认的 body。

<!--{include:`custom-container.md`}-->

## API

### `useToaster()`

返回一个包含以下方法的对象：

| 方法   | 类型                                                                                  | 描述                |
| ------ | ------------------------------------------------------------------------------------- | ------------------- |
| push   | (message: ReactNode, options?: [ToastOptions](#code-ts-toast-options-code)) => string | 显示一个 Toast 消息 |
| remove | (toastId: string) => void                                                             | 删除指定 ID 的消息  |
| clear  | () => void                                                                            | 清除所有消息        |

### 类型定义

#### `ts:ToastOptions`

```ts
interface ToastOptions {
  /**
   * 设置消息出现在指定的容器中
   * @default document.body
   */
  container?: HTMLElement | (() => HTMLElement);

  /**
   * 自动关闭消息前等待的毫秒数
   * @default 4500
   */
  duration?: number;

  /**
   * 鼠标移入时是否重置自动关闭计时器
   * @default true
   * @version 5.65.0
   */
  mouseReset?: boolean;

  /**
   * 设置消息出现的位置
   * @default 'topCenter'
   */
  placement?: 'topCenter' | 'topStart' | 'topEnd' | 'bottomCenter' | 'bottomStart' | 'bottomEnd';
}
```
