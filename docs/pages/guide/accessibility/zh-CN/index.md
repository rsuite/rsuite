# 无障碍设计

在 Web 应用中无障碍性意味着使尽可能让更多的人使用，即使这些人的能力是有限的。[React](https://zh-hans.reactjs.org/docs/accessibility.html) 对于创建可访问网站有着全面的支持，而这通常是通过标准 HTML 技术实现的。React Suite 遵循 [WAI-ARIA 1.1][wai-aria] 标准，所有组件均具有开箱即用的适当属性和键盘交互功能。

## 路牌/地标 （Signposts/Landmarks）

组件中采用语义化的标记，或者添加必要的语义属性 `role`，便于为屏幕阅读器提供信息。 例如布局组件:

```html
<Container>
  <Sidebar>...</Sidebar>
  <Container>
    <header>...</header>
    <content>...</content>
    <footer>...</footer>
  </Container>
</Container>
```

对应渲染的 HTML 结构:

```html
<section class="rs-container">
  <header class="rs-header">...</header>

  <section class="rs-container">
    <aside class="rs-sidebar">...</aside>
    <main class="rs-content">...</main>
  </section>

  <footer class="rs-footer">...</footer>
</section>
```

## 键盘的无障碍操作

在 Web 应用中存在很多需要与用户交互功能，这需要我们提供的组件能够管理焦点和键盘交互，比如：

- [Button][button]、[Input][input] 等表单组件之间可以通过 <kbd>Tab</kbd> 键切换焦点。
- [Modal][modal]、[Popover][popover]、[Tooltip][tooltip] 等组件在聚焦状态下，<kbd>Enter</kbd> 键打开弹窗，<kbd>ESC</kbd> 键关闭弹窗。
- 通过 <kbd>↓</kbd> <kbd>↑</kbd> <kbd>→</kbd> <kbd>←</kbd> 键，在具有选项操作的组件上进行焦点切换。
- 通过 <kbd>→</kbd> <kbd>←</kbd> 键，可以展开和折叠 [TreePicker](tree-picker) 和 [CheckTreePicker](check-tree-picker) 的节点。
- 当 Pickers 处于打开状态时候，按下任何字符键，搜索框将会聚焦，切换为搜索模式。

## 非语义组件的可访问性

有许多组件功能超出标准 HTML 中可用的功能，例如: [Slider][slider]、[Tree][tree]、[InputPicker][input-picker]、[Modal][modal]等，通过使用 roles 可以将非语义元素结构识别为常见的 UI 功能 。

### 表单无障碍

在表单中通过 `aria-*` 属性让表单输入组件具有描述性，便于屏幕阅读器读出组件对应的标签与描述。例如: 通过 [Form.Group][form.group] 的 `controlId` 属性自动关联 `aria-labelledby` 与 `aria-describedby`。当您尝试提交表单时，如果存在验证错误，我们在表单输入组件下显示一个错误消息框，并包含了一些 ARIA 属性。 以下是对应 HTML 结构:

```html
<div role="alert" aria-relevant="all" class="rs-form-control-message">
  This field is required.
</div>
```

- `role="alert"` 自动将其转变为实时区域，所以它一变化就会念出来。
- `aria-relevant` 的值为 `all` 会指示屏幕阅读器在对其进行任何更改时读出错误消息。

### 组件状态

- 为了让屏幕阅读器跳过被禁用的组件，会为该组件添加属性 `aria-disabled="true"`，比如禁用一个 [Button][button]。
- 有许多组件具备选择操作，会在被选中的选项上添加属性 `aria-selected="true"`，如果当前选项具有子选项，会设置属性 `aria-expanded`， 告诉屏幕阅读器当前选项的子选项是否被展开，比如: [Tree][tree]。

### 选择器(Pickers)

- Combo Box: https://www.w3.org/TR/wai-aria-practices/#combobox
- Listbox: https://www.w3.org/TR/wai-aria-practices/#Listbox

- 组件具有 `combobox` role。
- 组件具有 `aria-expanded` 属性，默认值为 `false`， 让弹窗展示的时候值为 `true`。
- 组件的弹窗具有 `listbox` role。
- 当为组件设置一个 `id` 时，会自动为弹窗生成一个 `id`, 值为`[id]-listbox`， 同时会为组件设置 `aria-controls=[id]-listbox` 与弹窗的 id 关联。

[form.group]: /zh/components/form#无障碍设计
[slider]: /zh/components/slider
[tree]: /zh/components/tree
[input-picker]: /zh/components/input-picker
[modal]: /zh/components/modal
[input]: /zh/components/input
[button]: /zh/components/button
[popover]: /zh/components/popover
[tooltip]: /zh/components/tooltip
[tree-picker]: /zh/components/tree-picker
[check-tree-picker]: /zh/components/check-tree-picker
[wai-aria]: https://www.w3.org/TR/wai-aria/
