# Stack 堆叠

通过 Flexbox 对组件进行快速布局，支持垂直和水平方向的堆叠，支持自定义间距和换行。

## 获取组件

<!--{include:(components/stack/fragments/import.md)}-->

## 演示

### 默认

 <!--{include:`basic.md`}-->

### 分割线

 <!--{include:`divider.md`}-->

### 间距

 <!--{include:`space.md`}-->

### 换行

 <!--{include:`wrap.md`}-->

### 交互

 <!--{include:`interactive.md`}-->

## Props

### `<Stack>`

| 属性名称       | 类型`(默认值)`                                                                              | 描述                                   |
| -------------- | ------------------------------------------------------------------------------------------- | -------------------------------------- |
| alignItems     | 'flex-start' &#124; 'center' &#124; 'flex-end' &#124; 'stretch' &#124; 'baseline'           | 定义一组子项在交叉轴上的对齐方式       |
| classPrefix    | string `('stack')`                                                                          | 组件 CSS 类的前缀                      |
| direction      | 'row' &#124; 'row-reverse' &#124; 'column' &#124; 'column-reverse'                          | 定义一组子项的方向                     |
| divider        | ReactNode                                                                                   | 为每一个子项直接添加分隔符             |
| justifyContent | 'flex-start' &#124; 'center' &#124; 'flex-end' &#124; 'space-between' &#124; 'space-around' | 定义一组子项在主轴上的对齐方式         |
| spacing        | number, string                                                                              | 为每一个子项直接设置间距               |
| wrap           | boolean                                                                                     | 定义一组子项是强制在一行上还是在多行上 |
