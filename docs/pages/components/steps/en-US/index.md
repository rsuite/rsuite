# Steps

Steps is a navigation bar that guides users through the steps of a task.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Title

Display step title for better navigation.

<!--{include:`title.md`}-->

### Description

Add descriptions to provide more context for each step.

<!--{include:`description.md`}-->

### Error Status

Indicate error state in the step flow to highlight issues.

<!--{include:`status.md`}-->

### Small

Use smaller steps for more compact interfaces.

<!--{include:`size.md`}-->

### Vertical

Display steps in a vertical layout, suitable for limited horizontal space.

<!--{include:`vertical.md`}-->

### Custom Icon

Replace default step icons with custom ones for better visual representation.

<!--{include:`icon.md`}-->

### Dynamic

Control steps dynamically with action buttons.

<!--{include:`dynamic.md`}-->

## Props

### `<Steps>`

| Property      | Type `(Default)`                                         | Description                           |
| ------------- | -------------------------------------------------------- | ------------------------------------- |
| classPrefix   | string `('steps')`                                       | The prefix of the component CSS class |
| current       | number`(0)`                                              | Current execution steps               |
| currentStatus | 'finish' \| 'wait' \| 'process' \| 'error' `('process')` | Current Execution Step Status         |
| small         | boolean                                                  | Small size Step Bar                   |
| vertical      | boolean                                                  | Vertical display                      |

### `<Steps.Item>`

| Property    | Type `(Default)`                           | Description                           |
| ----------- | ------------------------------------------ | ------------------------------------- |
| classPrefix | string `('steps-item')`                    | The prefix of the component CSS class |
| description | ReactNode                                  | The description of Steps item         |
| icon        | Element&lt;typeof Icon&gt; ,               | Set icon                              |
| status      | 'finish' \| 'wait' \| 'process' \| 'error' | Step status                           |
| title       | ReactNode                                  | The title of Steps item               |
