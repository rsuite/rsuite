# Stack 堆叠

通过 Flexbox 对组件进行快速布局，支持垂直和水平方向的堆叠，支持自定义间距和换行。

## 获取组件

<!--{include:<import-guide>}-->

- `Stack` 用于水平或垂直堆叠元素。
- `HStack` 用于水平堆叠元素。![][5.65.0]
- `VStack` 用于垂直堆叠元素。![][5.65.0]

## 演示

### 水平

<!--{include:`horizontal.md`}-->

### 垂直

<!--{include:`vertical.md`}-->

### 分割线

<!--{include:`divider.md`}-->

### 间距

<!--{include:`space.md`}-->

### 换行

<!--{include:`wrap.md`}-->

### 交互

<!--{include:`interactive.md`}-->

### 子项对齐

<!--{include:`align-self.md`}-->

### 子项拉伸

<!--{include:`grow.md`}-->

## 响应式

<!--{include:<example-responsive>}-->

## Props

### `<Stack>`

| 属性名称    | 类型 `(默认值)`                                | 描述                                   |
| ----------- | ---------------------------------------------- | -------------------------------------- |
| align       | [ResponsiveCSSProperty<'alignItems'>][rcp]     | 定义一组子项在交叉轴上的对齐方式       |
| as          | ElementType                                    | 自定义根元素                           |
| classPrefix | string `('stack')`                             | 组件 CSS 类的前缀                      |
| direction   | [ResponsiveCSSProperty<'flexDirection'>][rcp]  | 定义一组子项的方向, 支持响应式值       |
| divider     | ReactNode                                      | 为每一个子项直接添加分隔符             |
| justify     | [ResponsiveCSSProperty<'justifyContent'>][rcp] | 定义一组子项在主轴上的对齐方式         |
| spacing     | [ResponsiveCSSProperty<gap>][rcp]              | 为每一个子项直接设置间距               |
| wrap        | boolean                                        | 定义一组子项是强制在一行上还是在多行上 |

### `<HStack>`

| 属性名称    | 类型 `(默认值)`                                             | 描述                                   |
| ----------- | ----------------------------------------------------------- | -------------------------------------- |
| align       | [ResponsiveCSSProperty<'alignItems'>][rcp] `('flex-start')` | 定义一组子项在交叉轴上的对齐方式       |
| classPrefix | string `('stack')`                                          | 组件 CSS 类的前缀                      |
| divider     | ReactNode                                                   | 为每一个子项直接添加分隔符             |
| justify     | [ResponsiveCSSProperty<'justifyContent'>][rcp]              | 定义一组子项在主轴上的对齐方式         |
| reverse     | boolean                                                     | 反转一组子项在堆叠中的顺序             |
| spacing     | [ResponsiveCSSProperty<'gap'>][rcp]                         | 为每一个子项直接设置间距               |
| wrap        | boolean                                                     | 定义一组子项是强制在一行上还是在多行上 |

### `<VStack>`

| 属性名称    | 类型 `(默认值)`                                             | 描述                                   |
| ----------- | ----------------------------------------------------------- | -------------------------------------- |
| align       | [ResponsiveCSSProperty<'alignItems'>][rcp] `('flex-start')` | 定义一组子项在交叉轴上的对齐方式       |
| classPrefix | string `('stack')`                                          | 组件 CSS 类的前缀                      |
| divider     | ReactNode                                                   | 为每一个子项直接添加分隔符             |
| justify     | [ResponsiveCSSProperty<'justifyContent'>][rcp]              | 定义一组子项在主轴上的对齐方式         |
| reverse     | boolean                                                     | 反转一组子项在堆叠中的顺序             |
| spacing     | [ResponsiveCSSProperty<'gap'>][rcp]                         | 为每一个子项直接设置间距               |
| wrap        | boolean                                                     | 定义一组子项是强制在一行上还是在多行上 |

### `<Stack.Item>`

| 属性名称 | 类型 `(默认值)`                            | 描述                           |
| -------- | ------------------------------------------ | ------------------------------ |
| self     | [ResponsiveCSSProperty<'alignSelf'>][rcp]  | 定义一组子项在堆叠中的对齐方式 |
| basis    | [ResponsiveCSSProperty<'flexBasis'>][rcp]  | 定义一组子项的 basis 属性      |
| flex     | [ResponsiveCSSProperty<'flex'>][rcp]       | 定义一组子项的 flex 属性       |
| grow     | [ResponsiveCSSProperty<'flexGrow'>][rcp]   | 定义一组子项的 grow 属性       |
| order    | [ResponsiveCSSProperty<'order'>][rcp]      | 定义一组子项在堆叠中的顺序     |
| shrink   | [ResponsiveCSSProperty<'flexShrink'>][rcp] | 定义一组子项的 shrink 属性     |

### 类型定义

<!--{include:(_common/types/responsive-css-property.md)}-->

[rcp]: #code-ts-responsive-css-property-code
