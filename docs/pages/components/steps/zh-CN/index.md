# Steps 步骤条

引导用户按照流程完成任务的导航条。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 设置标题

为步骤设置标题，提供更清晰的导航。

<!--{include:`title.md`}-->

### 设置描述

为每个步骤添加描述，提供更多上下文信息。

<!--{include:`description.md`}-->

### 设置错误状态

在步骤流程中标记错误状态，突出显示问题。

<!--{include:`status.md`}-->

### 设置小尺寸

使用更紧凑的小尺寸步骤条。

<!--{include:`size.md`}-->

### 垂直布局

在水平空间有限时使用垂直布局展示步骤。

<!--{include:`vertical.md`}-->

### 自定义图标

使用自定义图标替换默认步骤图标。

<!--{include:`icon.md`}-->

### 动态展示

通过操作按钮动态更新步骤。

<!--{include:`dynamic.md`}-->

## Props

### `<Steps>`

| 属性名称      | 类型 `(默认值)`                                          | 描述               |
| ------------- | -------------------------------------------------------- | ------------------ |
| classPrefix   | string `('steps')`                                       | 组件 CSS 类的前缀  |
| current       | number`(0)`                                              | 当前执行步骤       |
| currentStatus | 'finish' \| 'wait' \| 'process' \| 'error' `('process')` | 当前执行步骤状态   |
| small         | boolean                                                  | 设置小尺寸的步骤条 |
| vertical      | boolean                                                  | 设置垂直显示       |

### `<Steps.Item>`

| 属性名称    | 类型 `(默认值)`                            | 描述               |
| ----------- | ------------------------------------------ | ------------------ |
| classPrefix | string `('steps-item')`                    | 组件 CSS 类的前缀  |
| description | ReactNode                                  | 设置描述           |
| icon        | Element&lt;typeof Icon&gt; ,               | 设置小尺寸的步骤条 |
| status      | 'finish' \| 'wait' \| 'process' \| 'error' | 步骤状态           |
| title       | ReactNode                                  | 设置标题           |
