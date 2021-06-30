# Accessibility

Accessibility in web applications is to make it available to as many people as possible, even if their abilities are limited. [React](https://zh-hans.reactjs.org/docs/accessibility.html) fully supports building accessible websites, often by using standard HTML techniques. React Suite follows the [WAI-ARIA 1.1][wai-aria] standard, and all components have appropriate attributes and keyboard interaction functions out of the box.

## Signposts/Landmarks

Use semantic markup in the component, or add the necessary semantic attribute `role` to facilitate the provision of information for screen readers. For example layout components:

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

Corresponding to the rendered HTML structure:

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

## Enhancing keyboard accessibility

There are many functions that need to interact with users in web applications, which require components we provide to manage focus and keyboard interaction, such as:

- The <kbd>Tab</kbd> key can be used to switch the focus between [Button][button],[Input][input] and other form components.
- When components such as [Modal][modal], [Popover][popover] and [Tooltip][tooltip] are in focus, the <kbd>Enter</kbd> key opens the pop-up window, and the <kbd>ESC</kbd> key closes the pop-up window.
- Use the <kbd>↓</kbd> <kbd>↑</kbd> <kbd>→</kbd> <kbd>←</kbd> key to switch the focus on the component with option operation.
- Use the <kbd>→</kbd> <kbd>←</kbd> key to expand and collapse the nodes of [TreePicker](tree-picker) and [CheckTreePicker](check-tree-picker).
- When pickers is in the open state, press any character key, the search box will be focused.

## Accessibility of non-semantic controls

There are many component functions beyond those available in standard HTML, such as [Slider][slider], [Tree][tree], [InputPicker][input-picker], [Modal][modal], etc. By using `roles`, non-semantic element structures can be recognized as common UI functions.

### Accessibility of form interaction

Use the `aria-*` attribute in the form to make the form input components descriptive, which is convenient for screen readers to read the corresponding tags and descriptions of the components. For example: Automatically associate `aria-labelledby` with `aria-describedby` through the `controlId` property of [Form.Group][form.group]. When you try to submit the form, if there is a validation error, we will display an error message box under the form input component and include some ARIA properties. The following is the corresponding HTML structure:

```html
<div role="alert" aria-relevant="all" class="rs-form-control-message">
  This field is required.
</div>
```

- `role="alert"` automatically turns the element it is applied to into a live region, so changes to it are read out.
- An `aria-relevant` value of `all` instructs the screenreader to read out the contents of the error list when any changes are made to it.

### Component status

- In order to let the screen reader skip the disabled component, the attribute `aria-disabled="true"` is added to the component, such as disabling a [Button][button].
- Many components have a selection operation. We will add the attribute `aria-selected="true"` to the selected option. If the current option has sub-options, the attribute `aria-expanded` will be set to tell the screen reader whether the sub-option of the current option is Is unfolded. For example: [Tree][tree].

### Pickers

- Combo Box: https://www.w3.org/TR/wai-aria-practices/#combobox
- Listbox: https://www.w3.org/TR/wai-aria-practices/#Listbox

- The component has role `combobox`.
- The component has the `aria-expanded` prop, the default value is `false`, and the value is `true` when the popup window is displayed.
- The popup of the component has a `listbox` role.
- When an `id` is set for a component, it will automatically generate an `id` for the popup, the value is `[id]-listbox`, and it will also set `aria-controls=[id]-listbox` and popup The id of the window is associated.

[form.group]: /components/form#accessibility
[slider]: /components/slider
[tree]: /components/tree
[input-picker]: /components/input-picker
[modal]: /components/modal
[input]: /components/input
[button]: /components/button
[popover]: /components/popover
[tooltip]: /components/tooltip
[tree-picker]: /zh/components/tree-picker
[check-tree-picker]: /zh/components/check-tree-picker
[wai-aria]: https://www.w3.org/TR/wai-aria/
