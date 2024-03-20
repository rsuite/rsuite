# Tooltip 工具提示框

用于辅助的文字提示，可代替 HTML 元素默认的 title 属性。

## 获取组件

<!--{include:<import-guide>}-->

- `<Tooltip>` 文字提示。
- `<Whisper>` 监听触发器，包裹被监听对象的外面，触发事件后通知到 `<Tooltip>` 展示出来。

## 演示

### 默认

<!--{include:`basic.md`}-->

### 位置

- `left` , `top` , `right` , `bottom` 是物理中的 4 个方向, 表示显示的位置。
- `leftStart` , 在 left 后面加了一个 start, 这里的 start 是逻辑方式，表示对齐方式是 Y 轴的开始。

> 有关 `start` 和 `end` 的描述可参照 W3C 关于 [CSS 逻辑属性和值（CSS Logical Properties and Values Level 1）](https://www.w3.org/TR/2017/WD-css-logical-1-20170518/) 的首份工作草案（First Public Working Draft）

<!--{include:`placement.md`}-->

### 触发事件

`Whisper` 提供了一个 `trigger` 属性，用于在各种场景下控制 `Tooltip` 显示。属性值包括：

- `click`: 当用户点击元素时会被触发，再点击会关闭。
- `contextMenu`: 当用户点击鼠标右键时触发。
- `focus`: 当用户点击或触摸元素或通过键盘的 `tab` 键选择它时会被触发。
- `hover`: 鼠标悬停到元素上时触发，鼠标离开则关闭。
- `active`: 激活元素时会被触发。
- `none`: 无触发事件，一般用于需要通过方法触发时候使用。

<!--{include:`trigger.md`}-->

> 注意: [Safari ignoring tabindex](https://stackoverflow.com/questions/1848390/safari-ignoring-tabindex)

### 容器与防止溢出

<!--{include:`container.md`}-->

### 禁用的元素

具有禁用属性的元素禁用后无法将鼠标悬停或单击它们来触发弹出 `Tooltip`。 解决方法是，您要可以通过包装 `<div>` 或 `<span>` 触发叠加层，同时在元素上覆盖 `pointer-events` 属性。

<!--{include:`disabled-elements.md`}-->

### 隐藏箭头

您可以通过设置 `arrow` 属性为 `false` 隐藏箭头指示器。

<!--{include:`arrow.md`}-->

### 跟随光标

您可以通过设置 `followCursor` 属性为 `true` 来让 `Tooltip` 跟随光标移动。

<!--{include:`follow-cursor.md`}-->

## Props

### `<Tooltip>`

| 属性名称    | 类型 `(默认值)`      | 描述               |
| ----------- | -------------------- | ------------------ |
| arrow       | boolean `(true)`     | 是否显示箭头指示器 |
| children \* | ReactNode            | 组件的内容         |
| classPrefix | string `('tooltip')` | 组件 CSS 类的前缀  |
| visible     | boolean              | 组件默认可见的     |

<!--{include:(components/whisper/zh-CN/props.md)}-->
<!--{include:(_common/types/placement-all.md)}-->
