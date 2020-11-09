# Modal 模态框

一套模态对话框组件，用于消息提示、确认消息和提交内容。 如果需要放置更多内容可以使用 Drawer。

模态框，包含下面组件:

- `<Modal.Header>`
- `<Modal.Title>`
- `<Modal.Body>`
- `<Modal.Footer>`

## 获取组件

<!--{include:(components/modal/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 背景板

当设置为 true，Modal 打开时会显示背景，点击背景会关闭 Modal，如果不想关闭 Modal，可以设置为 'static'

<!--{include:`backdrop.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 全屏

<!--{include:`full.md`}-->

### 溢出

<!--{include:`overflow.md`}-->

### 动态

<!--{include:`dynamic.md`}-->

### Confirm

<!--{include:`confirm.md`}-->

## 无障碍设计

### 键盘交互

- <kbd>ESC</kbd> 可以关闭 `Modal`，同时也可以通过设置 `keyboard=false` 禁用它。

### WAI-ARIA Roles, States, and Properties

- Modal 拥有一个值为 `dialog` 的 `role` 属性。
- Modal 将 `aria-modal` 设置为 `true`。 告诉辅助技术当前对话框下方的窗口不可用于交互（惰性）。
- 不要忘记用 `aria-labelledby` 属性来指向 Modal 的标题。 使用 `aria-describedby` 属性来为 Modal 组件添加一段描述。

```js
<Modal aria-labelledby="modal-title" aria-describedby="modal-description">
  <Modal.Header>
    <Modal.Title id="modal-title">My Title</Modal.Title>
  </Modal.Header>
  <Modal.Body id="modal-description">My Description</Modal.Body>
</Modal>
```

## Props

### `<Modal>`

| 属性名称          | 类型 `(默认值)`                                   | 描述                                                                                                 |
| ----------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| autoFocus         | boolean `(true)`                                  | 当设置为 true, Modal 被打开是自动焦点移到其自身,辅助屏幕阅读器容易访问                               |
| backdrop          | unions: boolean, 'static'                         | 当设置为 true，Modal 打开时会显示背景，点击背景会关闭 Modal，如果不想关闭 Modal，可以设置为 'static' |
| backdropClassName | string                                            | 应用于 backdrop DOM 节点的 css class                                                                 |
| classPrefix       | string `('modal')`                                | 组件 CSS 类的前缀                                                                                    |
| dialogAs          | ElementType `(ModalDialog)`                       | 以对 Dialog 使用自定义元素类型                                                                       |
| dialogClassName   | string                                            | 应用于 Dialog DOM 节点的 css class                                                                   |
| enforceFocus      | boolean `(true)`                                  | 当设置为 true, Modal 将防止焦点在打开时离开,辅助屏幕阅读器容易访问                                   |
| full              | boolean                                           | 撑满全屏                                                                                             |
| keyboard          | boolean `(true)`                                  | 按下 esc 键时关闭 Modal                                                                              |
| onClose           | () => void                                        | 隐藏时的回调函数                                                                                     |
| onEnter           | () => void                                        | 显示前动画过渡的回调函数                                                                             |
| onEntered         | () => void                                        | 显示后动画过渡的回调函数                                                                             |
| onEntering        | () => void                                        | 显示中动画过渡的回调函数                                                                             |
| onExit            | () => void                                        | 退出前动画过渡的回调函数                                                                             |
| onExited          | () => void                                        | 退出后动画过渡的回调函数                                                                             |
| onExiting         | () => void                                        | 退出中动画过渡的回调函数                                                                             |
| onOpen            | () => void                                        | 显示时的回调函数                                                                                     |
| open \*           | boolean                                           | 显示 Modal                                                                                           |
| overflow          | boolean `(true)`                                  | body 内容过长时自动设置高度                                                                          |
| size              | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' `('md')` | Modal 尺寸                                                                                           |

### `<Modal.Header>`

| 属性名称    | 类型 `(默认值 )`                           | 描述                        |
| ----------- | ------------------------------------------ | --------------------------- |
| classPrefix | string `('modal-header')`                  | 组件 CSS 类的前缀           |
| closeButton | boolean `(true)`                           | 当设置为 true, 显示关闭按钮 |
| onClose     | (event: SyntheticEvent&lt;any&gt;) => void | 点击关闭按钮的回调函数      |

### `<Modal.Title>`

| 属性名称    | 类型 `(默认值)`          | 描述              |
| ----------- | ------------------------ | ----------------- |
| classPrefix | string `('modal-title')` | 组件 CSS 类的前缀 |

### `<Modal.Footer>`

| 属性名称    | 类型 `(默认值)`           | 描述              |
| ----------- | ------------------------- | ----------------- |
| classPrefix | string `('modal-footer')` | 组件 CSS 类的前缀 |

### `<Modal.Body>`

| 属性名称    | 类型 `(默认值)`         | 描述              |
| ----------- | ----------------------- | ----------------- |
| classPrefix | string `('modal-body')` | 组件 CSS 类的前缀 |
