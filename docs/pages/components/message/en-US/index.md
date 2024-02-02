# Message

Used to show important tips on a page.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Types

<!--{include:`types.md`}-->

### With header and actions

<!--{include:`header.md`}-->

### With icon

<!--{include:`icons.md`}-->

### Bordered

<!--{include:`bordered.md`}-->

### Centered

<!--{include:`centered.md`}-->

### Closable

<!--{include:`close.md`}-->

### Full

<!--{include:`full.md`}-->

### With toaster

A message type that contains an Alert

<!--{include:`with-toaster.md`}-->

## Accessibility

### ARIA properties

Message has a `role` of `alert`.

### Keyboard interactions

No keyboard interaction needed.

## Props & Hooks

### `<Message>`

<!-- prettier-sort-markdown-table -->

| Property    | Type `(Default)`                                        | Description                                                                                                                                                                   |
| ----------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bordered    | boolean                                                 | Show a border around the message box.<br/>![](https://img.shields.io/badge/min-v5.53.0-blue)                                                                                  |
| centered    | boolean                                                 | Center the message vertically.<br/>![](https://img.shields.io/badge/min-v5.53.0-blue)                                                                                         |
| children    | ReactNode                                               | The description information for the message.                                                                                                                                  |
| classPrefix | string `('message')`                                    | The prefix of the component CSS class.                                                                                                                                        |
| closable    | boolean                                                 | Whether it is possible to close the message box                                                                                                                               |
| duration    | number `(2000)`                                         | Delay automatic closing message, only effective when used in combination with `toaster`. Do not automatically turn off notifications when the value is 0 (unit: milliseconds) |
| full        | boolean                                                 | Fill the container                                                                                                                                                            |
| header      | ReactNode                                               | The title of the message.                                                                                                                                                     |
| onClose     | (event?: MouseEvent) => void                            | Called after the message is closed                                                                                                                                            |
| showIcon    | boolean                                                 | Whether to display an icon.                                                                                                                                                   |
| type        | 'info' &#124; 'success' &#124; 'warning' &#124; 'error' | The type of the message box.                                                                                                                                                  |

<!--{include:(components/notification/en-US/toaster.md)}-->
