# Tabs

Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Pills

<!--{include:`pills.md`}-->

### Subtle

<!--{include:`subtle.md`}-->

### Disabled

<!--{include:`disabled.md`}-->

### Reversed

<!--{include:`reversed.md`}-->

### Vertical

<!--{include:`vertical.md`}-->

### With icon

<!--{include:`with-icon.md`}-->

### Controlled

<!--{include:`controlled.md`}-->

## Accessibility

### ARIA properties

- Role `tablist` is added to the container element.
  - `aria-orientation` is set to `vertical` when `vertical` is `true`.
- Role `tab` is added to each tab element.
  - `aria-selected` is set to `true` when `activeKey` is the same as `eventKey`.
  - `aria-disabled` is set to `true` when `disabled` is `true`.
  - `aria-controls` is set to the `id` of the corresponding tabpanel.
- Role `tabpanel` is added to each panel element.
  - `aria-labelledby` is set to the `id` of the corresponding tab.
  - `aria-hidden` is set to `true` when `activeKey` is not the same as `eventKey`.

### Keyboard interactions

- <kbd>←</kbd> - moves focus to the previous tab, and activates it.
- <kbd>→</kbd> - moves focus to the next tab, and activates it.
- <kbd>↑</kbd> - moves focus to the previous tab, and activates it. (vertical mode only)
- <kbd>↓</kbd> - moves focus to the next tab, and activates it. (vertical mode only)
- <kbd>Home</kbd> - moves focus to the first tab, and activates it.
- <kbd>End</kbd> - moves focus to the last tab, and activates it.

### Resources

- [WAI-ARIA practices: TabList example](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/)

## Props

### `<Tabs>`

| Property         | Type `(Default)`                                 | Description                                  |
| ---------------- | ------------------------------------------------ | -------------------------------------------- |
| activeKey        | string                                           | The `eventKey` of the active tab.            |
| appearance       | 'tabs' &#124; 'subtle' &#124; 'pills' `('tabs')` | The tabs appearance style.                   |
| children         | ChildrenArray&lt;Tabs.Tab&gt;                    | The contents of the component.               |
| classPrefix      | string `('tabs')`                                | The prefix of the component CSS class.       |
| defaultActiveKey | string                                           | The `eventKey` of the active tab by default. |
| onSelect         | (eventKey: string, event) => void                | Callback function triggered after selection. |
| reversed         | boolean                                          | Reversed display.                            |
| vertical         | boolean                                          | Whether to display the component vertically. |

### `<Tabs.Tab>`

| Property | Type `(Default)`           | Description                       |
| -------- | -------------------------- | --------------------------------- |
| children | ReactNode                  | The contents of the component.    |
| disabled | boolean                    | Whether the item is disabled.     |
| eventKey | string                     | The value of the current item.    |
| icon     | Element&lt;typeof Icon&gt; | Sets the icon for the component.  |
| title \* | ReactNode                  | Sets the title for the component. |
