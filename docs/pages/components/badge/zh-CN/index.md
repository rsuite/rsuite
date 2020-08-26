# Badge 标记

用于按钮、图标旁的数字或状态标记。

## 获取组件

<!--{include:(components/badge/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 附加内容

<!--{include:`content.md`}-->

### 不可见的

<!--{include:`invisible.md`}-->

### 独立使用

<!--{include:`independent.md`}-->

### 彩色指示器

`color` 属性设置徽标提示点样式，选项包括: 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'。

<!--{include:`color.md`}-->

## Props

<!--{include:(_common/types/color.md)}-->

### `<Badge>`

| 属性名称    | 类型`(默认值)`     | 描述                                            |
| ----------- | ------------------ | ----------------------------------------------- |
| children    | ReactNode          | 包裹的组件                                      |
| classPrefix | string `('badge')` | 组件 CSS 类的前缀                               |
| content     | ReactNode          | 内容                                            |
| color       | Color              | 设置颜色                                        |
| maxCount    | number`(99)`       | 最大计数（仅当 `content` 为 number 类型时有效） |
