# Message 消息框

用于页面中展示重要的提示信息。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

默认的消息框样式。

<!--{include:`basic.md`}-->

### 消息类型

通过 `type` 属性设置不同的消息类型：`info`、`success`、`warning` 和 `error`。

<!--{include:`types.md`}-->

### 带标题和操作

通过 `header` 属性添加标题，并在消息内容中添加操作按钮。

<!--{include:`header.md`}-->

### 显示图标

使用 `showIcon` 属性显示与消息类型对应的图标。

<!--{include:`icons.md`}-->

### 带边框

使用 `bordered` 属性为消息框添加边框。

<!--{include:`bordered.md`}-->

### 垂直居中

使用 `centered` 属性使消息框在容器中垂直居中显示。

<!--{include:`centered.md`}-->

### 可关闭的

使用 `closable` 属性添加关闭按钮，并可通过 `onClose` 回调处理关闭事件。

<!--{include:`close.md`}-->

### 消息框撑满容器

使用 `full` 属性使消息框撑满其父容器。

<!--{include:`full.md`}-->

### 与 toaster 组合

展示如何与 `toaster` 组件结合使用，显示包含 `Alert` 组件的消息。

> **注意**：`useToaster` 必须在 `CustomProvider` 内部使用。如果您的应用未使用 `CustomProvider` 包装，请确保在使用 `useToaster` 前添加 `<CustomProvider>` 包装您的应用，否则可能会收到警告提示。

<!--{include:`with-toaster.md`}-->

## 可访问性

### ARIA 属性

Message 的 `role` 为 `alert`。

### Keyboard interactions

无需键盘交互。

## Props

### `<Message>`

| 属性名称    | 类型 `(默认值)`                                        | 描述              | 版本        |
| ----------- | ------------------------------------------------------ | ----------------- | ----------- |
| bordered    | boolean                                                | 显示消息框边框    | ![][5.53.0] |
| centered    | boolean                                                | 垂直居中消息框    | ![][5.53.0] |
| children    | ReactNode                                              | 消息描述信息      |             |
| classPrefix | string `('message')`                                   | 组件 CSS 类的前缀 |             |
| closable    | boolean                                                | 可以关闭消息框    |             |
| full        | boolean                                                | 撑满容器          |             |
| header      | ReactNode                                              | 消息标题          |             |
| onClose     | (event?: MouseEvent) => void                           | 消息关闭后调用    |             |
| showIcon    | boolean                                                | 显示图标          |             |
| type        | 'info' \| 'success' \| 'warning' \| 'error' `('info')` | 消息框类型        |             |
