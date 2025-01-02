# Rate 评分

一个评分组件，表示用户对内容的兴趣

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}}-->

### 尺寸

设置组件的大小

<!--{include:`size.md`}}-->

### 颜色

设置组件的颜色。支持预设主题颜色和自定义颜色（hex、rgb 等）。

<!--{include:`color.md`}}-->

### 允许半选

<!--{include:`half-select.md`}}-->

### 竖直方向

半选变为上下半选

<!--{include:`vertical.md`}}-->

### 辅助文字

<!--{include:`hover.md`}}-->

### 禁用与只读

<!--{include:`disabled.md`}}-->

### 字符

您可以使用其他 icon、emoji、数字、中文或是其他自定义的图案

<!--{include:`character.md`}}-->

### 自定义渲染

当有多级评价时，您可以自定义每级展现的 character，不过这需要您自己实现

<!--{include:`custom-character.md`}}-->

## 无障碍设计

WAI tutorial: https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating

## Props

| 属性名称        | 类型 `(默认值)`                                        | 描述                                                      |
| --------------- | ------------------------------------------------------ | --------------------------------------------------------- | --- |
| allowHalf       | boolean                                                | 是否支持半选                                              |
| character       | ReactNode                                              | 自定义字符                                                |
| cleanable       | boolean`(true)`                                        | 是否支持清除                                              |
| defaultValue    | number`(0)`                                            | 默认值（非受控）                                          |
| disabled        | boolean                                                | 是否禁用，为 true 时无法进行交互                          |     |
| max             | number`(5)`                                            | 最大分数                                                  |
| renderCharacter | (value: number,index: number) => ReactNode             | 自定义渲染 character 函数                                 |
| readOnly        | boolean                                                | 是否只读，为 true 时无法进行交互                          |
| size            | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                  | 设置组件尺寸                                              |
| color           | [Color](#code-ts-color-code) \| CSSProperties['color'] | 设置组件颜色。支持预设主题颜色和自定义颜色（hex、rgb 等） |
| value           | number                                                 | 当前值（受控）                                            |
| vertical        | boolean                                                | 是否竖直方向上半选                                        |
| onChange        | (value: number, event) => void                         | `value` 发生改变时的回调函数                              |
| onChangeActive  | (value: number, event) => void                         | 悬停状态更改时触发的回调函数。                            |

<!--{include:(_common/types/color.md)}-->
