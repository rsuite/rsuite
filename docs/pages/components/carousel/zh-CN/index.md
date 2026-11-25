# Carousel 轮播

以轮播的方式显示一组元素

## 获取组件

<!--{include:<import-guide>}-->

## 示例

### 默认

基本轮播图，包含 5 张图片，可以通过底部的指示点进行切换。

<!--{include:`basic.md`}-->

### 受控的幻灯片

通过 `activeIndex` 和 `onSelect` 属性可以控制当前显示的幻灯片，实现完全受控的轮播图。

<!--{include:`position.md`}-->

### 外观

可以自定义轮播图指示器的位置（上、下、左、右）和形状（圆点或条状）。

<!--{include:`appearance.md`}-->

### 自动轮播

设置 `autoplay` 属性可以启用自动轮播功能，无需用户交互即可自动切换幻灯片。

<!--{include:`autoplay.md`}-->

## Props

### `<Carousel>`

| 属性名称           | 类型`(默认值)`                                   | 描述                       |
| ------------------ | ------------------------------------------------ | -------------------------- |
| activeIndex        | number                                           | 控制当前可见幻灯片         |
| as                 | ElementType `('div')`                            | 自定义元素类型             |
| autoplay           | boolean                                          | 自动轮播                   |
| children           | ReactNode                                        | 轮播的元素                 |
| classPrefix        | string `('carousel')`                            | 组件 CSS 类的前缀          |
| defaultActiveIndex | number (`0`)                                     | 默认的初始幻灯片           |
| onSelect           | (index: number, event?: ChangeEvent) => void     | 活动项更改时触发的回调     |
| onSlideEnd         | (index: number, event?: TransitionEvent) => void | 幻灯片过渡结束时触发的回调 |
| onSlideStart       | (index: number, event?: ChangeEvent) => void     | 幻灯片过渡开始时触发的回调 |
| placement          | enum:'top','bottom','left','right' `('bottom')`  | 按钮的位置                 |
| shape              | enum:'dot','bar' `('dot')`                       | 按钮的形状                 |
