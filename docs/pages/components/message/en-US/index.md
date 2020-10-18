# Message

Used to show important tips on a page.

## Import

<!--{include:(components/message/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Types

<!--{include:`types.md`}-->

### Icons

<!--{include:`icons.md`}-->

### Closable

<!--{include:`close.md`}-->

### Full

<!--{include:`full.md`}-->

### With toaster

<!--{include:`with-toaster.md`}-->

## Props & Methods

### `<Message>`

| Property    | Type `(Default)`                            | Description                                                                                                        |
| ----------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| children    | ReactNode                                   | The description information for the message.                                                                       |
| classPrefix | string `('message')`                        | The prefix of the component CSS class.                                                                             |
| closable    | boolean                                     | Whether it is possible to close the message box                                                                    |
| duration    | number `(2000)`                             | Delay automatic removal of messages. When set to 0, the message is not automatically removed. (Unit: milliseconds) |
| full        | boolean                                     | Fill the container                                                                                                 |
| header      | ReactNode                                   | The title of the message.                                                                                          |
| onClose     | (event?: MouseEvent) => void                | Called after the message is closed                                                                                 |
| showIcon    | boolean                                     | Whether to display an icon.                                                                                        |
| type        | enum: 'info', 'success', 'warning', 'error' | The type of the message box.                                                                                       |

<!--{include:(components/notification/en-US/toaster.md)}-->
