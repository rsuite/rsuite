# Popover 弹出框

鼠标点击/移入的时候，弹出的弹出框，用于显示更多内容。

## 获取组件

<!--{include:<import-guide>}-->

- `<Popover>` 弹出框。
- `<Whisper>` 监听触发器，包裹被监听对象的外面，触发事件后通知到 `<Popover>` 展示出来。

## 演示

### 默认

<!--{include:`basic.md`}-->

### 位置

<!--{include:`placement.md`}-->

### 触发事件

`Whisper` 提供了一个 `trigger` 属性，用于在各种场景下控制 `Popover` 显示。属性值包括：

- `click`: 当用户点击元素时会被触发，再点击会关闭。
- `contextMenu`: 当用户点击鼠标右键时触发。
- `focus`: 当用户点击或触摸元素或通过键盘的 `tab` 键选择它时会被触发。
- `hover`: 鼠标悬停到元素上时触发，鼠标离开则关闭。
- `active`: 激活元素时会被触发。
- `none`: 无触发事件，一般用于需要通过方法触发时候使用。

<!--{include:`trigger.md`}-->

> 注意: [Safari ignoring tabindex](https://stackoverflow.com/questions/1848390/safari-ignoring-tabindex)

### 容器与防止溢出

`Popover` 会渲染在容器内部，跟随按钮一起滚动。

<!--{include:`container.md`}-->

### 与 Dropdown 组合使用

<!--{include:`with-dropdown.md`}-->

### 隐藏箭头

您可以通过设置 `arrow` 属性为 `false` 隐藏箭头指示器。

<!--{include:`arrow.md`}-->

### 跟随光标

您可以通过设置 `followCursor` 属性为 `true` 来让 `Popover` 跟随光标移动。

<!--{include:`follow-cursor.md`}-->

## Props

### `<Popover>`

| 属性名称    | 类型                 | 描述               |
| ----------- | -------------------- | ------------------ |
| arrow       | boolean `(true)`     | 是否显示箭头指示器 |
| children \* | ReactNode            | 组件的内容         |
| classPrefix | string `('popover')` | 组件 CSS 类的前缀  |
| title       | ReactNode            | 标题               |
| visible     | boolean              | 组件默认可见的     |
| full        | boolean              | 撑满容器           |

<!--{include:(components/whisper/zh-CN/props.md)}-->
<!--{include:(_common/types/placement-all.md)}-->
