# Toaster 轻量弹框

Toaster 用于在应用程序中显示简短的、临时的通知，用于表示操作、错误或其他事件。通常和 Message 和 Notification 组件一起使用。

## 获取组件

<!--{include:<import-guide>}-->

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

## Hooks

### useToaster

`useToaster` 是一个用于创建和管理 Toast 的 React Hook。

```ts
import { useToaster } from 'rsuite';

function App() {
  const toaster = useToaster();

  const handleClick = () => {
    // 通过 toaster.push 弹出一个消息
    toaster.push(<Message>message</Message>);
  };

  return <Button onClick={handleClick}>Push</Button>;
}
```

通过 `useToaster` 创建的 toaster 实例需要在指定的容器中使用。因此，我们需要在 App 组件外部提供一个 `CustomProvider` 组件来包裹应用。示例如下：

```tsx
import { createRoot } from 'react-dom/client';
import { CustomProvider } from 'rsuite';

const root = createRoot(document.getElementById('root')!);

root.render(
  <CustomProvider>
    <App />
  </CustomProvider>
);
```

#### toaster.push

推送一个消息，并返回一个唯一的 toastId

```
toaster.push(message: ReactNode, toastProps?: ToastProps): string;
```

##### ToastProps

| 属性       | 类型`(默认值)`                                                                                          | 说明                             | 版本        |
| ---------- | ------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| container  | HTMLElement \| (() => HTMLElement)                                                                      | 设置消息出现在指定的容器中       |             |
| duration   | number                                                                                                  | 自动关闭消息前等待的毫秒数       |             |
| mouseReset | boolean `(true)`                                                                                        | 鼠标移入时是否重置自动关闭计时器 | ![][5.65.0] |
| placement  | 'topCenter' \| 'topStart' \| 'topEnd' \| 'bottomCenter' \| 'bottomStart' \| 'bottomEnd' `('topCenter')` | 设置消息出现的位置               |             |

#### toaster.remove

通过 toastId 删除一个消息

```ts
toaster.remove(toastId: string): void;
```

#### toaster.clear

删除所有消息

```ts
toaster.clear(): void;
```
