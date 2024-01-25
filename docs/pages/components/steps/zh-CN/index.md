# Steps 步骤条

引导用户按照流程完成任务的导航条。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 设置标题

<!--{include:`title.md`}-->

### 设置描述

<!--{include:`description.md`}-->

### 垂直布局

<!--{include:`vertical.md`}-->

### 设置错误状态

<!--{include:`status.md`}-->

### 设置小尺寸

<!--{include:`size.md`}-->

### 自定义图标

<!--{include:`icon.md`}-->

### 动态展示

<!--{include:`dynamic.md`}-->

## Props

### `<Steps>`

| 属性名称      | 类型 `(默认值)`                                                      | 描述               |
| ------------- | -------------------------------------------------------------------- | ------------------ |
| classPrefix   | string `('steps')`                                                   | 组件 CSS 类的前缀  |
| current       | number`(0)`                                                          | 当前执行步骤       |
| currentStatus | 'finish' &#124; 'wait' &#124; 'process' &#124; 'error' `('process')` | 当前执行步骤状态   |
| small         | boolean                                                              | 设置小尺寸的步骤条 |
| vertical      | boolean                                                              | 设置垂直显示       |

### `<Steps.Item>`

| 属性名称    | 类型 `(默认值)`                                        | 描述               |
| ----------- | ------------------------------------------------------ | ------------------ |
| classPrefix | string `('steps-item')`                                | 组件 CSS 类的前缀  |
| description | ReactNode                                              | 设置描述           |
| icon        | Element&lt;typeof Icon&gt; ,                           | 设置小尺寸的步骤条 |
| status      | 'finish' &#124; 'wait' &#124; 'process' &#124; 'error' | 步骤状态           |
| title       | ReactNode                                              | 设置标题           |
