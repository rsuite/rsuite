# Modal 模态框

一套模态对话框组件，用于消息提示、确认消息和提交内容。

## 获取组件

<!--{include:<import-guide>}-->

- `Modal` 模态框容器。
- `Modal.Header` 模态框头部，包含关闭按钮。
- `Modal.Title` 模态框标题，放置在模态框头部。
- `Modal.Body` 模态框内容。
- `Modal.Footer` 模态框底部，一般放置按钮。

## 演示

### 默认

<!--{include:`basic.md`}-->

### 背景板

控制 Modal 背景板的行为：

- `true`：显示背景，点击背景会关闭 Modal
- `false`：不显示背景
- `'static'`：显示背景，但点击背景不会关闭 Modal

<!--{include:`backdrop.md`}-->

### 垂直居中

使用 `centered` 属性将 Modal 在页面垂直方向上居中对齐。

<!--{include:`centered.md`}-->

### 尺寸

通过 `size` 属性设置 Modal 的不同尺寸，可选值包括：`'xs'`、`'sm'`、`'md'`、`'lg'`、`'full'` 或自定义宽度。

<!--{include:`size.md`}-->

### 内容溢出

当 Modal 内容过长时，内容区域会自动显示滚动条。

<!--{include:`overflow.md`}-->

### 动态加载的内容

展示如何在 Modal 中动态加载内容，适合处理异步数据加载场景。

<!--{include:`dynamic.md`}-->

### 警报对话框

使用 `role="alertdialog"` 创建警报对话框，适用于需要用户立即注意的重要信息。

<!--{include:`alert-dialog.md`}-->

### 表单

在 Modal 中嵌入表单，适合数据收集和提交操作。

<!--{include:`form.md`}-->

### 使用 useDialog

对于常见的对话框场景，可以使用 [useDialog](/zh/components/use-dialog) 来简化对话框的使用。

## 响应式

在移动设备上，Modal 的最大宽度会撑满屏幕并保留边距。

<!--{include:<example-responsive>}-->

## 无障碍设计

### WAI-ARIA Roles, States, and Properties

- Modal 拥有一个值为 `dialog` 的 `role` 属性。
- Modal 将 `aria-modal` 设置为 `true`。 告诉辅助技术当前对话框下方的窗口不可用于交互（惰性）。
- Modal 会自动添加 `aria-labelledby` 属性来指向 Modal.Title 组件。 使用 `aria-describedby` 属性来为 Modal.Body 组件添加一段描述。 你也可以手动添加 `aria-labelledby` 和 `aria-describedby` 属性去覆盖默认设置。

```js
<Modal aria-labelledby="modal-title" aria-describedby="modal-description">
  <Modal.Header>
    <Modal.Title id="modal-title">My Title</Modal.Title>
  </Modal.Header>
  <Modal.Body id="modal-description">My Description</Modal.Body>
</Modal>
```

- 当 Modal 作为一个警报对话框的时候，需要修改 `role` 为 `alertdialog`。 参考 [WAI-ARIA Alert and Message Dialogs Pattern](https://www.w3.org/TR/wai-aria-practices/#alertdialog).

```jsx
<Modal role="alertdialog" backdrop="static">
  ...
</Modal>
```

### 键盘交互

- <kbd>ESC</kbd> 可以关闭 Modal，同时也可以通过设置 `keyboard=false` 禁用它。
- <kbd>Tab</kbd> 当 Modal 打开时，焦点会自动移动到 Modal 内部。按 Tab 键可以在 Modal 内的可聚焦元素之间循环切换。
- <kbd>Shift + Tab</kbd> 反向循环切换 Modal 内的可聚焦元素。
- 当 Modal 关闭时，焦点会返回到触发 Modal 打开的元素。

## Props

### `<Modal>`

| 属性名称          | 类型 `(默认值)`                                                    | 描述                                                                                                 |
| ----------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| autoFocus         | boolean `(true)`                                                   | 当设置为 true, Modal 被打开是自动焦点移到其自身,辅助屏幕阅读器容易访问                               |
| backdrop          | unions: boolean \| 'static'                                        | 当设置为 true，Modal 打开时会显示背景，点击背景会关闭 Modal，如果不想关闭 Modal，可以设置为 'static' |
| backdropClassName | string                                                             | 应用于 backdrop DOM 节点的 css class                                                                 |
| centered          | boolean                                                            | 将模态框在页面垂直方向上居中对齐。                                                                   |
| children          | ReactNode                                                          | Modal 的内容                                                                                         |
| classPrefix       | string `('modal')`                                                 | 组件 CSS 类的前缀                                                                                    |
| container         | HTMLElement \| (() => HTMLElement)                                 | 设置渲染的容器                                                                                       |
| dialogAs          | ElementType `(ModalDialog)`                                        | 以对 Dialog 使用自定义元素类型                                                                       |
| dialogClassName   | string                                                             | 应用于 Dialog DOM 节点的 css class                                                                   |
| dialogStyle       | CSSProperties                                                      | 应用于 Dialog DOM 节点的 css style                                                                   |
| enforceFocus      | boolean `(true)`                                                   | 当设置为 true, Modal 将防止焦点在打开时离开,辅助屏幕阅读器容易访问                                   |
| keyboard          | boolean `(true)`                                                   | 按下 esc 键时关闭 Modal                                                                              |
| onClose           | () => void                                                         | 隐藏时的回调函数                                                                                     |
| onEnter           | () => void                                                         | 显示前动画过渡的回调函数                                                                             |
| onEntered         | () => void                                                         | 显示后动画过渡的回调函数                                                                             |
| onEntering        | () => void                                                         | 显示中动画过渡的回调函数                                                                             |
| onExit            | () => void                                                         | 退出前动画过渡的回调函数                                                                             |
| onExited          | () => void                                                         | 退出后动画过渡的回调函数                                                                             |
| onExiting         | () => void                                                         | 退出中动画过渡的回调函数                                                                             |
| onOpen            | () => void                                                         | 显示时的回调函数                                                                                     |
| open \*           | boolean                                                            | 显示 Modal                                                                                           |
| overflow          | boolean `(true)`                                                   | body 内容过长时自动设置高度                                                                          |
| size              | 'xs' \| 'sm' \| 'md' \| lg' \| 'full' \| number \| string `('sm')` | 设置 Modal 的宽度                                                                                    |

### `<Modal.Header>`

| 属性名称    | 类型 `(默认值 )`          | 描述                           |
| ----------- | ------------------------- | ------------------------------ |
| as          | ElementType `('div')`     | 以对 Header 使用自定义元素类型 |
| children    | ReactNode                 | Header 的内容                  |
| classPrefix | string `('modal-header')` | 组件 CSS 类的前缀              |
| closeButton | boolean `(true)`          | 当设置为 true, 显示关闭按钮    |
| onClose     | (event) => void           | 点击关闭按钮的回调函数         |

### `<Modal.Title>`

| 属性名称    | 类型 `(默认值)`          | 描述                          |
| ----------- | ------------------------ | ----------------------------- |
| as          | ElementType `('h4')`     | 以对 Title 使用自定义元素类型 |
| children    | ReactNode                | Title 的内容                  |
| classPrefix | string `('modal-title')` | 组件 CSS 类的前缀             |

### `<Modal.Footer>`

| 属性名称    | 类型 `(默认值)`           | 描述                           |
| ----------- | ------------------------- | ------------------------------ |
| as          | ElementType `('div')`     | 以对 Footer 使用自定义元素类型 |
| children    | ReactNode                 | Footer 的内容                  |
| classPrefix | string `('modal-footer')` | 组件 CSS 类的前缀              |

### `<Modal.Body>`

| 属性名称    | 类型 `(默认值)`         | 描述                         |
| ----------- | ----------------------- | ---------------------------- |
| as          | ElementType `('div')`   | 以对 Body 使用自定义元素类型 |
| children    | ReactNode               | Body 的内容                  |
| classPrefix | string `('modal-body')` | 组件 CSS 类的前缀            |
