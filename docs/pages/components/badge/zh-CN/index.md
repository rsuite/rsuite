# Badge 标记

用于在图标或者其他组件上显示未读消息数量或者状态。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 带内容

<!--{include:`content.md`}-->

### 位置

<!--{include:`placement.md`}-->

### 形状

如果包裹元素为圆形时, 为了让 Badge 的位置更加合理, 可以使用 `shape` 属性 `circle`。

<!--{include:`shape.md`}-->

### 偏移

如果 Badge 的位置不合理, 可以使用 `offset` 属性进行微调。

<!--{include:`offset.md`}-->

### 不可见的

<!--{include:`invisible.md`}-->

### 没有 children 的 Badge

<!--{include:`independent.md`}-->

### 颜色

<!--{include:`color.md`}-->

## Props

### `<Badge>`

| 属性名称    | 类型`(默认值)`                                         | 描述                                                      |
| ----------- | ------------------------------------------------------ | --------------------------------------------------------- |
| children    | ReactNode                                              | 包裹的组件                                                |
| classPrefix | string `('badge')`                                     | 组件 CSS 类名的前缀                                       |
| color       | [Color](#code-ts-color-code) \| CSSProperties['color'] | 设置标记的颜色                                            |
| compact     | boolean                                                | 是否为紧凑模式<br/>![][6.0.0]                             |
| content     | number \| ReactNode                                    | 标记内容                                                  |
| invisible   | boolean                                                | 标记是否不可见<br/>![][6.0.0]                             |
| maxCount    | number`(99)`                                           | 最大计数（仅当 `content` 为 number 类型时有效）           |
| offset      | [number,number] \| [string, string]                    | 定义标记相对于其被包裹元素的水平和垂直偏移<br/>![][6.0.0] |
| outline     | boolean`(true)`                                        | 是否为轮廓模式<br/>![][6.0.0]                             |
| placement   | [PlacementCorners](#code-ts-placement-corners-code)    | 设置标记在被包裹元素的位置<br/>![][6.0.0]                 |
| shape       | 'rectangle' \| 'circle'                                | 被包裹元素的形状<br/>![][6.0.0]                           |

<!--{include:(_common/types/color.md)}-->
<!--{include:(_common/types/placement-corners.md)}-->

[6.0.0]: https://img.shields.io/badge/>=-v6.0.0-blue
