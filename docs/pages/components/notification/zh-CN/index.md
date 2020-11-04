# Notification 通知框

用于系统通知。 通常用于推送消息。

## 获取组件

<!--{include:(components/notification/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 通知类型

<!--{include:`type.md`}-->

### 可关闭的

<!--{include:`close.md`}-->

### 与 toaster 组合

<!--{include:`with-toaster.md`}-->

## Props & Methods

### `<Notification>`

| Property    | Type `(Default)`                                       | Description                                                    |
| ----------- | ------------------------------------------------------ | -------------------------------------------------------------- |
| children \* | ReactNode                                              | 通知的内容                                                     |
| closable    | boolean                                                | 是否显示关闭按钮                                               |
| duration    | number `(4500)`                                        | 延迟自动关闭通知 .当设为 0 时候，则不自动关闭通知 (单位: 毫秒) |
| header \*   | string                                                 | 通知的标题                                                     |
| onClose     | () => void                                             | 通知被移除后的回调函数                                         |
| placement   | enum: [NotificationPlacement](#types)`('topCenter')`   | 通知出现的位置                                                 |
| type        | enum: 'info', 'success', 'warning', 'error' `('info')` | 通知类型                                                       |

<!--{include:(components/notification/zh-CN/toaster.md)}-->
