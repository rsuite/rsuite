# Message 消息框

用于页面中展示重要的提示信息。

## 获取组件

<!--{include:(components/message/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 类型

<!--{include:`types.md`}-->

### 显示图标

<!--{include:`icons.md`}-->

### 可关闭的

<!--{include:`close.md`}-->

### 消息框撑满容器

<!--{include:`full.md`}-->

### 与 toaster 组合

<!--{include:`with-toaster.md`}-->

## Props & Methods

### `<Message>`

| 属性名称    | 类型 `(默认值)`                                        | 描述                                                           |
| ----------- | ------------------------------------------------------ | -------------------------------------------------------------- |
| children    | ReactNode                                              | 消息描述信息                                                   |
| classPrefix | string `('message')`                                   | 组件 CSS 类的前缀                                              |
| closable    | boolean                                                | 可以关闭消息框                                                 |
| duration    | number `(2000)`                                        | 延迟自动关闭通知 .当设为 0 时候，则不自动关闭通知 (单位: 毫秒) |
| full        | boolean                                                | 撑满容器                                                       |
| header      | ReactNode                                              | 消息标题                                                       |
| onClose     | (event?: MouseEvent) => void                           | 消息关闭后调用                                                 |
| showIcon    | boolean                                                | 显示图标                                                       |
| type        | enum: 'info', 'success', 'warning', 'error' `('info')` | 消息框类型                                                     |

<!--{include:(components/notification/zh-CN/toaster.md)}-->
