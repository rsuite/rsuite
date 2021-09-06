# Carousel 轮播

以轮播的方式显示一组元素

## 获取组件

<!--{include:(components/carousel/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 外观

<!--{include:`appearance.md`}-->

### 自动轮播

<!--{include:`autoplay.md`}-->

## Props

### `<Carousel>`

| 属性名称     | 类型`(默认值)`                                         | 描述                       |
| ------------ | ------------------------------------------------------ | -------------------------- |
| as           | ElementType `('div')`                                  | 自定义元素类型             |
| autoplay     | boolean                                                | 自动轮播                   |
| children     | ReactNode                                              | 轮播的元素                 |
| classPrefix  | string `('carousel')`                                  | 组件 CSS 类的前缀          |
| onSelect     | (index: number, event?: React.ChangeEvent) => void     | 活动项更改时触发的回调     |
| onSlideEnd   | (index: number, event?: React.TransitionEvent) => void | 幻灯片过渡结束时触发的回调 |
| onSlideStart | (index: number, event?: React.ChangeEvent) => void     | 幻灯片过渡开始时触发的回调 |
| placement    | enum:'top','bottom','left','right' `('bottom')`        | 按钮的位置                 |
| shape        | enum:'dot','bar' `('dot')`                             | 按钮的形状                 |
