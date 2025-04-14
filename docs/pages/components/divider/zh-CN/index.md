# Divider 分割线

分隔线用于将内容水平或垂直分组。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 带标签

<!--{include:`with-label.md`}-->

### 外观

<!--{include:`appearance.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 颜色

<!--{include:`color.md`}-->

### 垂直分割线

<!--{include:`vertical.md`}-->

## Props

### `<Divider>`

| 属性名称      | 类型`(默认值)`                                   | 描述                             |
| ------------- | ------------------------------------------------ | -------------------------------- |
| appearance    | 'solid' \| 'dashed' \| 'dotted'                  | 分割线的外观样式                 |
| as            | ElementType `(div)`                              | 自定义元素类型                   |
| classPrefix   | string `('divider')`                             | 组件 CSS 类的前缀                |
| color         | Color \| CSSProperties['color']                  | 分割线的颜色                     |
| label         | ReactNode                                        | 标签内容                         |
| labelPlacement | 'start' \| 'center' \| 'end'                    | 标签位置                         |
| size          | 'xs' \| 'sm' \| 'md' \| 'lg' \| number \| string | 分割线的尺寸                     |
| spacing       | 'xs' \| 'sm' \| 'md' \| 'lg' \| number \| string | 分割线与内容之间的间距           |
| vertical      | boolean                                          | 垂直分割线（不能与标签同时使用） |

<!--{include:(_common/types/color.md)}-->
