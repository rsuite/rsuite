# 分割面板 Splitter

可调整大小的面板，适用于工作区、主从视图和数据密集的控制台。

## 导入

<!--{include:<import-guide>}-->

## 示例

### 基础用法

拖动分隔条，或聚焦分隔条后使用方向键，调整相邻面板的大小。

<!--{include:`basic.md`}-->

### 垂直布局

为垂直布局设置高度，让各面板有可分配的空间。

<!--{include:`vertical.md`}-->

### 受控尺寸

通过 `sizes` 和 `onResize` 在应用状态中管理尺寸。指针释放、触发 `pointercancel`、失去指针捕获时，以及每次键盘调整后，会调用 `onResizeEnd`。外部尺寸、方向、约束或禁用状态发生变化、调整按键接管操作或组件卸载时，会丢弃正在进行的指针操作，不调用该操作的结束回调。键盘调整改变尺寸时，会单独调用开始和结束回调。

<!--{include:`controlled.md`}-->

### 多面板

每个分隔条只调整两侧相邻面板，其他面板的百分比保持不变。

<!--{include:`workspace.md`}-->

### 嵌套布局

<!--{include:`nested.md`}-->

## 可访问性

分隔条是可以聚焦的 `separator` 元素。每个分隔条控制子节点顺序中位于其前面的面板，并使用该面板的 `aria-label` 或 `aria-labelledby` 作为可访问名称。请为每个面板提供可访问名称。`aria-orientation` 表示分隔条的方向，因此水平布局中的分隔条方向是垂直的。

| 按键           | 操作                                                          |
| -------------- | ------------------------------------------------------------- |
| 左 / 右方向键  | 在水平布局中向左 / 右移动分隔条，RTL 布局同样遵循实际移动方向 |
| 上 / 下方向键  | 在垂直布局中向上 / 下移动分隔条                               |
| Shift + 方向键 | 按 `keyboardStep` 的十倍步长调整                              |
| Home / End     | 将前一个面板调整到允许的最小 / 最大尺寸                       |

`disabled` 会让所有分隔条退出 Tab 顺序。`resizable={false}` 禁用面板两侧的分隔条。没有可调整范围的分隔条也会禁用。使用 `CustomProvider rtl` 或 `dir="rtl"` 开启从右向左布局；服务端渲染时，服务端和客户端 Provider 的 RTL 设置必须一致。

## 尺寸规则

所有尺寸值都是面板可分配空间的百分比，不包含分隔条、gap 间距和根容器内边距。暂不支持像素或其他 CSS 单位。百分比会包含在服务端输出的标记中，无需测量容器。

面板为 0% 时，内容保持挂载，但会退出焦点顺序和无障碍树。仍可通过分隔条恢复面板，内容状态会保留。

只支持直接的 `Splitter.Panel` 子节点。请将内容放入面板内，不要用其他组件或 Fragment 包裹面板。尺寸数组遵循子节点顺序。面板数量变化时，非受控布局会重置为满足约束的等比分配；受控布局需要同步更新 `sizes` 数组，使其长度匹配面板数量。

首次渲染时，`defaultSizes` 会归一化为总计 100，并调整到面板约束范围内。受控的 `sizes` 必须为每个面板提供有限的非负值，总计 100，并满足所有面板约束。`minSize` / `maxSize` 必须在 0 到 100 之间，最小值不得大于最大值；所有最小值之和不得超过 100，所有最大值之和不得小于 100。无效布局会输出开发环境警告并禁用调整。后续约束变化不会自动重新分配已有面板尺寸。

## Props

### `<Splitter>`

| 属性          | 类型（默认值）                                        | 描述                                     |
| ------------- | ----------------------------------------------------- | ---------------------------------------- |
| defaultSizes  | number[]                                              | 初始百分比，默认等比分配                 |
| disabled      | boolean `(false)`                                     | 禁用所有分隔条                           |
| keyboardStep  | number `(1)`                                          | 方向键每次调整的百分点，Shift 为十倍步长 |
| onResize      | (sizes: number[], event: SplitterResizeEvent) => void | 调整过程中返回下一组百分比               |
| onResizeEnd   | (sizes: number[], event: SplitterResizeEvent) => void | 指针操作或键盘调整结束后的回调           |
| onResizeStart | (sizes: number[], event: SplitterResizeEvent) => void | 指针操作或键盘调整开始前的回调           |
| orientation   | 'horizontal' \| 'vertical' `('horizontal')`           | 面板排列方向                             |
| sizes         | number[]                                              | 受控面板百分比                           |

### `<Splitter.Panel>`

| 属性            | 类型（默认值）   | 描述                                  |
| --------------- | ---------------- | ------------------------------------- |
| aria-label      | string           | 面板及其后方分隔条的可访问名称        |
| aria-labelledby | string           | 面板及其后方分隔条所使用的可见标签 id |
| id              | string           | 面板 id，未提供时自动生成             |
| maxSize         | number `(100)`   | 面板可分配空间的最大百分比            |
| minSize         | number `(0)`     | 面板可分配空间的最小百分比            |
| resizable       | boolean `(true)` | 是否允许通过相邻分隔条调整尺寸        |

两个组件均支持 [Box 样式属性](/guide/style-props)、`as`、`className`、`classPrefix` 和 `style`。面板样式属性、`style`、`showFrom` 和 `hideFrom` 应用到内部内容容器，内边距和边框不会撑大面板的分配尺寸，包括 0% 时。面板 ref、id、类名、DOM 属性和 ARIA 属性属于外层布局框。外层尺寸由 Splitter 管理，请勿覆盖它的 flex 样式，也不要为布局框或分隔条设置内边距、边框或外边距。通过类名设置内容样式时，请使用 `.rs-splitter-panel-content` 选择器。可以使用根容器的 `gap` 为分隔条两侧增加间距。
