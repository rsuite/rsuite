# IconButton 图标按钮

在按钮中渲染一个图标。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 带文本

<!--{include:`with-text.md`}-->

### 外观

<!--{include:`appearance.md`}-->

### 圆形按钮

<!--{include:`circle.md`}-->

### 按钮尺寸

<!--{include:`size.md`}-->

### 彩色按钮

<!--{include:`color.md`}-->

### 禁用

<!--{include:`disabled.md`}-->

### 激活

<!--{include:`active.md`}-->

### 可切换

<!--{include:`toggleable.md`}-->

### 加载中状态

<!--{include:`loading.md`}-->

## 可访问性

### ARIA 属性

- IconButton 具有 `button` 的角色。

### 键盘交互

- 当 IconButton 获得焦点时，<kbd>Space</kbd> 或 <kbd>Enter</kbd> 可以激活它。

## Props

### `<IconButton>`

| 属性名称    | 类型 `(默认值)`                                      | 描述                              |
| ----------- | ---------------------------------------------------- | --------------------------------- |
| active      | boolean                                              | 激活状态                          |
| appearance  | [Appearance](#code-ts-appearance-code) `('default')` | 设置外观                          |
| as          | ElementType `('button')`                             | 为组件自定义元素类型              |
| children    | ReactNode                                            | 组件的内容                        |
| circle      | boolean                                              | 设置为圆形按钮                    |
| classPrefix | string `('btn-icon')`                                | 组件 CSS 类的前缀                 |
| color       | [Color](#code-ts-color-code)                         | 设置颜色                          |
| disabled    | boolean                                              | 禁用                              |
| href        | string                                               | 按钮跳转链接                      |
| icon        | Element&lt;typeof Icon&gt;                           | 设置图标                          |
| loading     | boolean                                              | 按钮可以显示加载指示器            |
| onToggle    | (event: React.MouseEvent, active: boolean) => void   | 切换状态时的回调<br /> ![][6.0.0] |
| placement   | 'left' \| 'right' `('left')`                         | icon 的位置                       |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                | 设置按钮尺寸                      |
| toggleable  | boolean                                              | 可切换状态<br /> ![][6.0.0]       |

<!--{include:(_common/types/appearance.md)}-->
<!--{include:(_common/types/color.md)}-->

[6.0.0]: https://img.shields.io/badge/>=-v6.0.0-blue
