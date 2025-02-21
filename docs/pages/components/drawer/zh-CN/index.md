# Drawer 抽屉

一个从页面边缘滑动出来的面板，可以替代 Modal 呈现更多内容。

## 获取组件

<!--{include:<import-guide>}-->

- `<Drawer>` - 抽屉的容器。
- `<Drawer.Body>` - 抽屉的内容。
- `<Drawer.Actions>` - 抽屉的操作按钮， 一般放置在抽屉的头部。（可选）
- `<Drawer.Header>` - 抽屉的头部， 包含关闭按钮。（可选）
- `<Drawer.Title>` - 抽屉的标题， 一般放置在抽屉的头部。 （可选）
- `<Drawer.Footer>` - 抽屉的底部。（可选）

## 演示

### 默认

<!--{include:`basic.md`}-->

### 背景板

<!--{include:`backdrop.md`}-->

### 显示位置

<!--{include:`placement.md`}-->

### 尺寸

<!--{include:`size.md`}-->

## Props

### `<Drawer>`

| 属性名称          | 类型 `(默认值)`                                                                   | 描述                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| autoFocus         | boolean `(true)`                                                                  | 当设置为 true, Drawer 被打开是自动焦点移到其自身,辅助屏幕阅读器容易访问                                 |
| backdrop          | boolean &#124; 'static'                                                           | 当设置为 true，Drawer 打开时会显示背景，点击背景会关闭 Drawer，如果不想关闭 Drawer，可以设置为 'static' |
| backdropClassName | string                                                                            | 为背景设置一个自定义 className                                                                          |
| classPrefix       | string `('drawer')`                                                               | 组件 CSS 类的前缀                                                                                       |
| closeButton       | ReactNode &#124; boolean                                                          | 自定义关闭按钮，设置为 false 时不显示关闭按钮                                                           |
| container         | HTMLElement &#124; (() => HTMLElement)                                            | 设置渲染的容器                                                                                          |
| enforceFocus      | boolean `(true)`                                                                  | 当设置为 true, Drawer 将防止焦点在打开时离开,辅助屏幕阅读器容易访问                                     |
| keyboard          | boolean                                                                           | 按下 esc 键时关闭 Drawer                                                                                |
| onClose           | () => void                                                                        | 隐藏时的回调函数                                                                                        |
| onEnter           | () => void                                                                        | 显示前动画过渡的回调函数                                                                                |
| onEntered         | () => void                                                                        | 显示后动画过渡的回调函数                                                                                |
| onEntering        | () => void                                                                        | 显示中动画过渡的回调函数                                                                                |
| onExit            | () => void                                                                        | 退出前动画过渡的回调函数                                                                                |
| onExited          | () => void                                                                        | 退出后动画过渡的回调函数                                                                                |
| onExiting         | () => void                                                                        | 退出中动画过渡的回调函数                                                                                |
| onOpen            | () => void                                                                        | 显示时的回调函数                                                                                        |
| open \*           | boolean                                                                           | 显示 Drawer                                                                                             |
| placement         | [Placement](#code-ts-placement-code)`(right)`                                     | 设置 Drawer 显示的位置                                                                                  |
| size              | 'xs' &#124; 'sm' &#124; 'md' &#124; lg' &#124; 'full' &#124; number &#124; string | 设置 Drawer 尺寸                                                                                        |

<!--{include:(_common/types/placement4.md)}-->
