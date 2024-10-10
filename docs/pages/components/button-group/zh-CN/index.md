# Button Group 按钮组

按钮组为用户提供了访问频繁执行的相关操作的途径。

## 获取组件

<!--{include:<import-guide>}-->

- `<ButtonGroup>` 按钮组控件，可以把一组按钮放在一起，并统一控制布局。
- `<ButtonToolbar>` 按钮工具栏控件。

## 演示

### 按钮组

<!--{include:`group.md`}-->

### 垂直按钮组

<!--{include:`vertical.md`}-->

### 分体式按钮

<!--{include:`split-button.md`}-->

### 按钮工具栏

<!--{include:`toolbar.md`}-->

### 等宽

按钮在按钮组中横向布局，并且等宽。

<!--{include:`justified.md`}-->

### 图标

<!--{include:`icon-group.md`}-->

## 可访问性

### ARIA 属性

- ButtonGroup 具有 `group` 的角色。

## Props

### `<ButtonGroup>`

| 属性名称    | 类型`(默认值)`                        | 描述              |
| ----------- | ------------------------------------- | ----------------- |
| block       | boolean                               | 适应容器宽度      |
| classPrefix | string `('btn-group')`                | 组件 CSS 类的前缀 |
| justified   | boolean                               | 横向等宽布局      |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | 设置按钮尺寸      |
| vertical    | boolean                               | 按钮垂直布局      |
