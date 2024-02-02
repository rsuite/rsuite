# Message 消息框

用于页面中展示重要的提示信息。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 消息类型

<!--{include:`types.md`}-->

### 带标题和操作

<!--{include:`header.md`}-->

### 显示图标

<!--{include:`icons.md`}-->

### 可关闭的

<!--{include:`close.md`}-->

### 消息框撑满容器

<!--{include:`full.md`}-->

### 与 toaster 组合

一种包含 Alert 的消息类型

<!--{include:`with-toaster.md`}-->

## 可访问性

### ARIA 属性

Message 的 `role` 为 `alert`。

### Keyboard interactions

无需键盘交互。

## Props & Hooks

### `<Message>`

| 属性名称    | 类型 `(默认值)`                                                    | 描述                                                                                            |
| ----------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| children    | ReactNode                                                          | 消息描述信息                                                                                    |
| classPrefix | string `('message')`                                               | 组件 CSS 类的前缀                                                                               |
| closable    | boolean                                                            | 可以关闭消息框                                                                                  |
| duration    | number `(2000)`                                                    | 延迟自动关闭消息，与 `toaster` 组合使用时候才有效。当设为 0 时候，则不自动关闭通知 (单位: 毫秒) |
| full        | boolean                                                            | 撑满容器                                                                                        |
| header      | ReactNode                                                          | 消息标题                                                                                        |
| onClose     | (event?: MouseEvent) => void                                       | 消息关闭后调用                                                                                  |
| showIcon    | boolean                                                            | 显示图标                                                                                        |
| type        | 'info' &#124; 'success' &#124; 'warning' &#124; 'error' `('info')` | 消息框类型                                                                                      |

<!--{include:(components/notification/zh-CN/toaster.md)}-->
