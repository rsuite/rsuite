# Tag 标签

用于标记和选择的标签。

## 获取组件

<!--{include:<import-guide>}-->

- `<Tag>` 标签
- `<TagGroup>` 标签组

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 多彩标签

<!--{include:`color.md`}-->

### 动态添加标签

<!--{include:`dynamic.md`}-->

## Props

### `<Tag>`

| 属性名称    | 类型`(默认值)`                                         | 描述                                    |
| ----------- | ------------------------------------------------------ | --------------------------------------- |
| as          | ElementType `('div')`                                  | 为组件自定义元素类型                    |
| children \* | ReactNode                                              | 组件的内容                              |
| classPrefix | string `('tag')`                                       | 组件 CSS 类的前缀                       |
| closable    | boolean                                                | 是否显示关闭按钮                        |
| color       | [Color](#code-ts-color-code) \| CSSProperties['color'] | 标签颜色，支持预设颜色和自定义 CSS 颜色 |
| onClose     | (event) => void                                        | 点击关闭按钮的回调函数                  |
| size        | 'sm' \| 'md' \| 'lg' `('md')`                          | 标签尺寸                                |

### `<TagGroup>`

| 属性名称    | 类型`(默认值)`         | 描述                 |
| ----------- | ---------------------- | -------------------- |
| as          | ElementType `('div')`  | 为组件自定义元素类型 |
| children \* | ReactNode              | 组件的内容           |
| classPrefix | string `('tag-group')` | 组件 CSS 类的前缀    |

<!--{include:(_common/types/color.md)}-->
