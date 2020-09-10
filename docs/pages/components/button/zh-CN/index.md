# Button 按钮

常用的操作按钮，按钮组合，按钮布局。

- `<Button>` 是组件中最基础的元素，可以快速创建一个带样式的按钮。
- `<IconButton>` 图标按钮组件。
- `<ButtonGroup>` 按钮组控件，可以把一组按钮放在一起，并统一控制布局。
- `<ButtonToolbar>` 按钮工具栏控件。

## 获取组件

<!--{include:(components/button/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 外观

`appearance` property can set appearance of button:

- 'default'(default) default button.
- 'primary' Emphasi, guide button.
- 'link' Button like link.
- 'subtle' Weakened button.
- 'ghost' Ghost button, background transparent, place button on background element.

<!--{include:`appearance.md`}-->

### 按钮尺寸

`size` 属性设置按钮尺寸, 选项包括:'lg', 'md', 'sm', 'xs'

<!--{include:`size.md`}-->

### 彩色按钮

`color` 属性设置按钮样式，选项包括: 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'

<!--{include:`color.md`}-->

### 自定义组合按钮

<!--{include:`custom.md`}-->

### 图标按钮

`<IconButton>` 是专为图标按钮设计的组件，设置`icon`属性定义所需要的图标。 只有图标按钮可以设置为一个圆形按钮。

<!--{include:`icon-button.md`}-->

### 适应容器宽度

一般适用于流式布局，或者在某个容器的顶部、底部撑满整行。设置一个 `block` 属性。

<!--{include:`block.md`}-->

### 禁用

<!--{include:`disabled.md`}-->

### 激活

<!--{include:`active.md`}-->

### 加载中状态

<!--{include:`loading.md`}-->

### 按钮组

<!--{include:`group-basic.md`}-->

### 垂直按钮组

<!--{include:`vertical.md`}-->

### 按钮工具栏

<!--{include:`toolbar.md`}-->

### 等宽

按钮在按钮组中横向布局，并且等宽。

<!--{include:`justified.md`}-->

## Props

<!--{include:(_common/types/appearance.md)}-->
<!--{include:(_common/types/color.md)}-->

## Props

### `<Button>`

| 属性名称    | 类型 `(默认值)`                                   | 描述                   |
| ----------- | ------------------------------------------------- | ---------------------- |
| active      | boolean                                           | 激活状态               |
| appearance  | Appearance `('default')`                          | 设置外观               |
| as          | ElementType `('button')`                          | 为组件自定义元素类型   |
| block       | boolean                                           | 显示为块级元素         |
| children \* | ReactNode                                         | 组件的内容             |
| classPrefix | string `('btn')`                                  | 组件 CSS 类的前缀      |
| color       | Color                                             | 设置颜色               |
| disabled    | boolean                                           | 禁用                   |
| href        | string                                            | 按钮跳转链接           |
| loading     | boolean                                           | 按钮可以显示加载指示器 |
| size        | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' `('md')` | 设置按钮尺寸           |

### `<IconButton>`

IconButton 继承所有 Button 的属性

| 属性名称    | 类型`(默认值)`                       | 描述              |
| ----------- | ------------------------------------ | ----------------- |
| circle      | boolean                              | 设置为圆形按钮    |
| classPrefix | string `('btn-icon')`                | 组件 CSS 类的前缀 |
| icon        | Element&lt;typeof Icon&gt;           | 设置图标          |
| placement   | enum: 'left'&#124;'right' `('left')` | icon 的位置       |

### `<ButtonGroup>`

| 属性名称    | 类型`(默认值)`                                    | 描述              |
| ----------- | ------------------------------------------------- | ----------------- |
| block       | boolean                                           | 适应容器宽度      |
| classPrefix | string `('btn-group')`                            | 组件 CSS 类的前缀 |
| justified   | boolean                                           | 横向等宽布局      |
| size        | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' `('md')` | 设置按钮尺寸      |
| vertical    | boolean                                           | 按钮垂直布局      |
