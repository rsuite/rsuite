# Button 按钮

常用的操作按钮，按钮组合，按钮布局。

## 获取组件

<!--{include:<import-guide>}-->

- `<Button>` 是组件中最基础的元素，可以快速创建一个带样式的按钮。
- `<ButtonGroup>` 按钮组控件，可以把一组按钮放在一起，并统一控制布局。
- `<ButtonToolbar>` 按钮工具栏控件。

## 演示

### 默认

<!--{include:`basic.md`}-->

### 外观

`appearance` 属性设置按钮样式，选项包括: `default`, `primary`, `link`, `subtle`, `ghost`。

<!--{include:`appearance.md`}-->

### 按钮尺寸

`size` 属性设置按钮尺寸, 选项包括: `lg`, `md`, `sm`, `xs`。

<!--{include:`size.md`}-->

### 彩色按钮

`color` 属性设置按钮样式，选项包括: `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `violet`。

<!--{include:`color.md`}-->

### 自定义组合按钮

<!--{include:`custom.md`}-->

### 适应容器宽度

<!--{include:`block.md`}-->

### 禁用

<!--{include:`disabled.md`}-->

### 激活

<!--{include:`active.md`}-->

### 加载中状态

<!--{include:`loading.md`}-->

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

## 可访问性

### ARIA 属性

- Button 具有 `button` 的角色。

### 键盘交互

- 当 Button 获得焦点时，<kbd>Space</kbd> 或 <kbd>Enter</kbd> 可以激活它。

## Props

### `<Button>`

| 属性名称    | 类型 `(默认值)`                                      | 描述                       |
| ----------- | ---------------------------------------------------- | -------------------------- |
| active      | boolean                                              | 激活状态                   |
| appearance  | [Appearance](#code-ts-appearance-code) `('default')` | 设置外观                   |
| as          | ElementType `('button')`                             | 为组件自定义元素类型       |
| block       | boolean                                              | 显示为块级元素             |
| children    | ReactNode                                            | 组件的内容                 |
| classPrefix | string `('btn')`                                     | 组件 CSS 类的前缀          |
| color       | [Color](#code-ts-color-code)                         | 设置颜色                   |
| disabled    | boolean                                              | 禁用                       |
| endIcon     | ReactNode                                            | 在按钮文字之后显示一个图标 |
| href        | string                                               | 按钮跳转链接               |
| loading     | boolean                                              | 按钮可以显示加载指示器     |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                | 设置按钮尺寸               |
| startIcon   | ReactNode                                            | 在按钮文字之前显示一个图标 |

### `<ButtonGroup>`

| 属性名称    | 类型`(默认值)`                        | 描述              |
| ----------- | ------------------------------------- | ----------------- |
| block       | boolean                               | 适应容器宽度      |
| classPrefix | string `('btn-group')`                | 组件 CSS 类的前缀 |
| justified   | boolean                               | 横向等宽布局      |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | 设置按钮尺寸      |
| vertical    | boolean                               | 按钮垂直布局      |

<!--{include:(_common/types/appearance.md)}-->
<!--{include:(_common/types/color.md)}-->
