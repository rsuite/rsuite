# Drawer 抽屉

一个从页面边缘滑动出来的浮层，可以替代 Modal 放更多内容。

## 获取组件

```js
import { Drawer } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Drawer>`

| 属性名称          | 类型 `(默认值)`                                | 描述                                                                                                    |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| autoFocus         | boolean `(true)`                               | 当设置为 true, Drawer 被打开是自动焦点移到其自身,辅助屏幕阅读器容易访问                                 |
| backdrop          | unions: boolean, 'static'                      | 当设置为 true，Drawer 打开时会显示背景，点击背景会关闭 Drawer，如果不想关闭 Drawer，可以设置为 'static' |
| backdropClassName | string                                         | 为背景设置一个自定义 className                                                                          |
| classPrefix       | string `('drawer')`                            | 组件 CSS 类的前缀                                                                                       |
| enforceFocus      | boolean `(true)`                               | 当设置为 true, Drawer 将防止焦点在打开时离开,辅助屏幕阅读器容易访问                                     |
| full              | boolean                                        | 撑满全屏                                                                                                |
| keyboard          | boolean                                        | 按下 esc 键时关闭 Drawer                                                                                |
| onEnter           | () => void                                     | 显示前动画过渡的回调函数                                                                                |
| onEntered         | () => void                                     | 显示后动画过渡的回调函数                                                                                |
| onEntering        | () => void                                     | 显示中动画过渡的回调函数                                                                                |
| onExit            | () => void                                     | 退出前动画过渡的回调函数                                                                                |
| onExited          | () => void                                     | 退出后动画过渡的回调函数                                                                                |
| onExiting         | () => void                                     | 退出中动画过渡的回调函数                                                                                |
| onHide            | () => void                                     | 隐藏时的回调函数                                                                                        |
| onShow            | () => void                                     | 显示时的回调函数                                                                                        |
| placement         | enum: 'top','right','bottom', 'left' `(right)` | 设置 Drawer 显示的位置                                                                                  |
| show \*           | boolean                                        | 显示 Drawer                                                                                             |
| size              | enum: 'lg', 'md', 'sm', 'xs'                   | 设置 Drawer 尺寸                                                                                        |
