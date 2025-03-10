# Drawer 抽屉

一个从页面边缘滑动出来的面板，可以替代 Modal 呈现更多内容。

## 获取组件

<!--{include:<import-guide>}-->

- `Drawer>` 抽屉的容器。
- `Drawer.Body` 抽屉的内容。
- `Drawer.Actions` 抽屉的操作按钮， 一般放置在抽屉的头部。（可选）
- `Drawer.Header` 抽屉的头部， 包含关闭按钮。（可选）
- `Drawer.Title` 抽屉的标题， 一般放置在抽屉的头部。 （可选）

## 演示

### 默认

<!--{include:`basic.md`}-->

### 背景板

<!--{include:`backdrop.md`}-->

### 显示位置

<!--{include:`placement.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 带表单的抽屉

<!--{include:`form.md`}-->

## 响应式

在移动设备上，Drawer 的最大宽度会撑满屏幕。

<!--{include:<example-responsive>}-->

## 可访问性

### ARIA 属性

- Drawer 组件的 `role` 属性为 `dialog`。
- 使用 `aria-labelledby` 属性关联 Drawer.Title。
- 使用 `aria-describedby` 属性为 Drawer.Body 提供描述信息。

### 键盘交互

- <kbd>ESC</kbd> 可以关闭 Drawer，同时也可以通过设置 `keyboard=false` 禁用此功能。
- <kbd>Tab</kbd> 在 Drawer 打开时，焦点会自动移至 Drawer 内部。按 Tab 键可在 Drawer 内的可聚焦元素之间移动焦点。
- <kbd>Shift + Tab</kbd> 反向循环聚焦 Drawer 内的可聚焦元素。
- 当 Drawer 关闭时，焦点会返回到触发打开 Drawer 的元素上。

## Props

### `<Drawer>`

| 属性名称          | 类型 `(默认值)`                                           | 描述                                                                                                    |
| ----------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| as                | ElementType `('div')`                                     | 以对 Drawer 使用自定义元素类型                                                                          |
| autoFocus         | boolean `(true)`                                          | 当设置为 true, Drawer 被打开是自动焦点移到其自身,辅助屏幕阅读器容易访问                                 |
| backdrop          | boolean \| 'static'                                       | 当设置为 true，Drawer 打开时会显示背景，点击背景会关闭 Drawer，如果不想关闭 Drawer，可以设置为 'static' |
| backdropClassName | string                                                    | 为背景设置一个自定义 className                                                                          |
| classPrefix       | string `('drawer')`                                       | 组件 CSS 类的前缀                                                                                       |
| closeButton       | ReactNode \| boolean                                      | 自定义关闭按钮，设置为 false 时不显示关闭按钮                                                           |
| container         | HTMLElement \| (() => HTMLElement)                        | 设置渲染的容器                                                                                          |
| enforceFocus      | boolean `(true)`                                          | 当设置为 true, Drawer 将防止焦点在打开时离开,辅助屏幕阅读器容易访问                                     |
| keyboard          | boolean                                                   | 按下 esc 键时关闭 Drawer                                                                                |
| onClose           | () => void                                                | 隐藏时的回调函数                                                                                        |
| onEnter           | () => void                                                | 显示前动画过渡的回调函数                                                                                |
| onEntered         | () => void                                                | 显示后动画过渡的回调函数                                                                                |
| onEntering        | () => void                                                | 显示中动画过渡的回调函数                                                                                |
| onExit            | () => void                                                | 退出前动画过渡的回调函数                                                                                |
| onExited          | () => void                                                | 退出后动画过渡的回调函数                                                                                |
| onExiting         | () => void                                                | 退出中动画过渡的回调函数                                                                                |
| onOpen            | () => void                                                | 显示时的回调函数                                                                                        |
| open \*           | boolean                                                   | 显示 Drawer                                                                                             |
| placement         | [Placement](#code-ts-placement-code)`(right)`             | 设置 Drawer 显示的位置                                                                                  |
| size              | 'xs' \| 'sm' \| 'md' \| lg' \| 'full' \| number \| string | 设置 Drawer 尺寸                                                                                        |

### `<Drawer.Header>`

| 属性名称    | 类型 `(默认值 )`          | 描述                           |
| ----------- | ------------------------- | ------------------------------ |
| as          | ElementType `('div')`     | 以对 Header 使用自定义元素类型 |
| classPrefix | string `('modal-header')` | 组件 CSS 类的前缀              |
| closeButton | boolean `(true)`          | 当设置为 true, 显示关闭按钮    |
| onClose     | (event) => void           | 点击关闭按钮的回调函数         |
| children    | ReactNode                 | Header 的内容                  |

### `<Drawer.Title>`

| 属性名称    | 类型 `(默认值)`          | 描述                          |
| ----------- | ------------------------ | ----------------------------- |
| as          | ElementType `('div')`    | 以对 Title 使用自定义元素类型 |
| classPrefix | string `('modal-title')` | 组件 CSS 类的前缀             |
| children    | ReactNode                | Title 的内容                  |

### `<Drawer.Actions>`

| 属性名称    | 类型 `(默认值)`            | 描述                            |
| ----------- | -------------------------- | ------------------------------- |
| as          | ElementType `('div')`      | 以对 Actions 使用自定义元素类型 |
| classPrefix | string `('modal-actions')` | 组件 CSS 类的前缀               |
| children    | ReactNode                  | Actions 的内容                  |

### `<Drawer.Body>`

| 属性名称    | 类型 `(默认值)`         | 描述                         |
| ----------- | ----------------------- | ---------------------------- |
| as          | ElementType `('div')`   | 以对 Body 使用自定义元素类型 |
| classPrefix | string `('modal-body')` | 组件 CSS 类的前缀            |
| children    | ReactNode               | Body 的内容                  |

<!--{include:(_common/types/placement4.md)}-->
