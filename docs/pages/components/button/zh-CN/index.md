# Button 按钮

常用的操作按钮。

## 获取组件

<!--{include:<import-guide>}-->

- `<Button>` 是组件中最基础的元素，可以快速创建一个带样式的按钮。

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

### 图标在文字之前

<!--{include:`with-icon-before.md`}-->

### 图标在文字之后

<!--{include:`with-icon-after.md`}-->

### 适应容器宽度

<!--{include:`block.md`}-->

### 禁用

<!--{include:`disabled.md`}-->

### 激活

<!--{include:`active.md`}-->

### 可切换

按钮可以在激活和非激活状态之间切换。

<!--{include:`toggleable.md`}-->

### 加载中状态

<!--{include:`loading.md`}-->

## 可访问性

### ARIA 属性

- Button 具有 `button` 的角色。

### 键盘交互

- 当 Button 获得焦点时，<kbd>Space</kbd> 或 <kbd>Enter</kbd> 可以激活它。

## Props

### `<Button>`

| 属性名称    | 类型 `(默认值)`                                      | 描述                              |
| ----------- | ---------------------------------------------------- | --------------------------------- |
| active      | boolean                                              | 激活状态                          |
| appearance  | [Appearance](#code-ts-appearance-code) `('default')` | 设置外观                          |
| as          | ElementType `('button')`                             | 为组件自定义元素类型              |
| block       | boolean                                              | 显示为块级元素                    |
| children    | ReactNode                                            | 组件的内容                        |
| classPrefix | string `('btn')`                                     | 组件 CSS 类的前缀                 |
| color       | [Color](#code-ts-color-code)                         | 设置颜色                          |
| disabled    | boolean                                              | 禁用                              |
| endIcon     | ReactNode                                            | 在按钮文字之后显示一个图标        |
| href        | string                                               | 按钮跳转链接                      |
| loading     | boolean                                              | 按钮可以显示加载指示器            |
| onToggle    | (event: React.MouseEvent, active: boolean) => void   | 切换状态时的回调<br /> ![][6.0.0] |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                | 设置按钮尺寸                      |
| startIcon   | ReactNode                                            | 在按钮文字之前显示一个图标        |
| toggleable  | boolean                                              | 可切换状态<br /> ![][6.0.0]       |

<!--{include:(_common/types/appearance.md)}-->
<!--{include:(_common/types/color.md)}-->

[6.0.0]: https://img.shields.io/badge/>=-v6.0.0-blue
