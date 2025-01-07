# Notification 通知框

用于系统通知。 通常用于推送消息。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 通知类型

<!--{include:`type.md`}-->

### 可关闭的

<!--{include:`close.md`}-->

### 与 toaster 组合

<!--{include:`with-toaster.md`}-->

## Props

### `<Notification>`

| Property    | Type `(Default)`                                                   | Description            |
| ----------- | ------------------------------------------------------------------ | ---------------------- |
| children \* | ReactNode                                                          | 通知的内容             |
| closable    | boolean                                                            | 是否显示关闭按钮       |
| header \*   | string                                                             | 通知的标题             |
| onClose     | () => void                                                         | 通知被移除后的回调函数 |
| placement   | [Placement](#code-ts-placement-code)`('topCenter')`                | 通知出现的位置         |
| type        | 'info' &#124; 'success' &#124; 'warning' &#124; 'error' `('info')` | 通知类型               |

<!--{include:(_common/types/placement-toaster.md)}-->
