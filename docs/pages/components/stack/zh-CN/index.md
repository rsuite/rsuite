# Stack 堆叠

对一组子项定义弹性布局，以及间距。

## 获取组件

<!--{include:(components/stack/fragments/import.md)}-->

## 演示

### 默认

 <!--{include:`basic.md`}-->

### 分割线

 <!--{include:`divider.md`}-->

### 换行

 <!--{include:`wrap.md`}-->

### 交互

 <!--{include:`interactive.md`}-->

## Props

### `<Stack>`

| 属性名称       | 类型`(默认值)`                                                                 | 描述                                   |
| -------------- | ------------------------------------------------------------------------------ | -------------------------------------- |
| alignItems     | enum : 'flex-start' , 'center' , 'flex-end' , 'stretch' , 'baseline'           | 定义一组子项在交叉轴上的对齐方式       |
| classPrefix    | string `('stack')`                                                             | 组件 CSS 类的前缀                      |
| direction      | enum : 'row' , 'row-reverse' , 'column' , 'column-reverse'                     | 定义一组子项的方向                     |
| divider        | ReactNode                                                                      | 为每一个子项直接添加分隔符             |
| justifyContent | enum : 'flex-start' , 'center' , 'flex-end' , 'space-between' , 'space-around' | 定义一组子项在主轴上的对齐方式         |
| spacing        | number ,number[]                                                               | 为每一个子项直接设置间距               |
| wrap           | boolean                                                                        | 定义一组子项是强制在一行上还是在多行上 |
