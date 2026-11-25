# Message

Used to show important tips on a page.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

Default message box style.

<!--{include:`basic.md`}-->

### Types

Set different message types using the `type` prop: `info`, `success`, `warning`, and `error`.

<!--{include:`types.md`}-->

### With header and actions

Add a header using the `header` prop and include action buttons in the message content.

<!--{include:`header.md`}-->

### With icon

Display icons corresponding to the message type using the `showIcon` prop.

<!--{include:`icons.md`}-->

### Bordered

Add a border around the message box using the `bordered` prop.

<!--{include:`bordered.md`}-->

### Centered

Vertically center the message box within its container using the `centered` prop.

<!--{include:`centered.md`}-->

### Closable

Add a close button with the `closable` prop and handle the close event with `onClose` callback.

<!--{include:`close.md`}-->

### Full

Make the message box fill its parent container using the `full` prop.

<!--{include:`full.md`}-->

### With toaster

Demonstrates how to use the Message component with `toaster` to display messages containing an `Alert` component.

> **Note**: `useToaster` must be used inside a `CustomProvider`. If your application is not wrapped with `CustomProvider`, make sure to wrap your app with `<CustomProvider>` before using `useToaster`, otherwise you may see a warning.

<!--{include:`with-toaster.md`}-->

## Accessibility

### ARIA properties

Message has a `role` of `alert`.

### Keyboard interactions

No keyboard interaction needed.

## Props

### `<Message>`

| Property    | Type `(Default)`                            | Description                                     | Version     |
| ----------- | ------------------------------------------- | ----------------------------------------------- | ----------- |
| bordered    | boolean                                     | Show a border around the message box.           | ![][5.53.0] |
| centered    | boolean                                     | Center the message vertically.                  | ![][5.53.0] |
| children    | ReactNode                                   | The description information for the message.    |             |
| classPrefix | string `('message')`                        | The prefix of the component CSS class.          |             |
| closable    | boolean                                     | Whether it is possible to close the message box |             |
| full        | boolean                                     | Fill the container                              |             |
| header      | ReactNode                                   | The title of the message.                       |             |
| onClose     | (event?: MouseEvent) => void                | Called after the message is closed              |             |
| showIcon    | boolean                                     | Whether to display an icon.                     |             |
| type        | 'info' \| 'success' \| 'warning' \| 'error' | The type of the message box.                    |             |
