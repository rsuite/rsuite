# Whisper 弹窗触发器

`Whisper` 是一个触发浮动元素显示的组件。它主要用于包装 `Tooltip`、`Popover` 等需要悬浮显示的组件，提供了统一的触发行为和定位功能。通过 `Whisper`，您可以更灵活地控制浮层的显示和隐藏，以及自定义触发事件。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 基本用法

默认支持的 speaker 组件为 `Tooltip` 和 `Popover`。

<!--{include:`basic.md`}-->

### 自定义浮层

通过 `speaker` 属性可以自定义浮层内容。以下示例展示了如何创建一个自定义的浮层组件，并支持延迟显示。

<!--{include:`overlay.md`}-->

## Props

<!--{include:(components/whisper/zh-CN/props.md)}-->
<!--{include:(_common/types/placement-all.md)}-->
