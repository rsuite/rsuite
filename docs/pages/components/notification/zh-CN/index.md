# Notification 通知框

用于系统通知。 通常用于推送消息。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

默认的通知框样式。

<!--{include:`basic.md`}-->

### 通知类型

通过 `type` 属性设置不同的通知类型：`info`、`success`、`warning` 和 `error`。

<!--{include:`type.md`}-->

### 可关闭的

使用 `closable` 属性添加关闭按钮，并可通过 `onClose` 回调处理关闭事件。

<!--{include:`close.md`}-->

### 与 toaster 组合

展示如何与 `toaster` 组件结合使用，显示通知消息。

> **注意**：`useToaster` 必须在 `CustomProvider` 内部使用。如果您的应用未使用 `CustomProvider` 包装，请确保在使用 `useToaster` 前添加 `<CustomProvider>` 包装您的应用。

<!--{include:`with-toaster.md`}-->

## Props

### `<Notification>`

| Property    | Type `(Default)`                                       | Description            |
| ----------- | ------------------------------------------------------ | ---------------------- |
| children \* | ReactNode                                              | 通知的内容             |
| closable    | boolean                                                | 是否显示关闭按钮       |
| header \*   | string                                                 | 通知的标题             |
| onClose     | () => void                                             | 通知被移除后的回调函数 |
| placement   | [Placement](#code-ts-placement-code)`('topCenter')`    | 通知出现的位置         |
| type        | 'info' \| 'success' \| 'warning' \| 'error' `('info')` | 通知类型               |

<!--{include:(_common/types/placement-toaster.md)}-->
