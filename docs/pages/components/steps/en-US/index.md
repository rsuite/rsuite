# Steps

Steps is a navigation bar that guides users through the steps of a task.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Title

<!--{include:`title.md`}-->

### Description

<!--{include:`description.md`}-->

### Vertical

<!--{include:`vertical.md`}-->

### Error Status

<!--{include:`status.md`}-->

### Small

<!--{include:`size.md`}-->

### Custom Icon

<!--{include:`icon.md`}-->

### Dynamic

<!--{include:`dynamic.md`}-->

## Props

### `<Steps>`

| Property      | Type `(Default)`                                                     | Description                           |
| ------------- | -------------------------------------------------------------------- | ------------------------------------- |
| classPrefix   | string `('steps')`                                                   | The prefix of the component CSS class |
| current       | number`(0)`                                                          | Current execution steps               |
| currentStatus | 'finish' &#124; 'wait' &#124; 'process' &#124; 'error' `('process')` | Current Execution Step Status         |
| small         | boolean                                                              | Small size Step Bar                   |
| vertical      | boolean                                                              | Vertical display                      |

### `<Steps.Item>`

| Property    | Type `(Default)`                                       | Description                           |
| ----------- | ------------------------------------------------------ | ------------------------------------- |
| classPrefix | string `('steps-item')`                                | The prefix of the component CSS class |
| description | ReactNode                                              | The description of Steps item         |
| icon        | Element&lt;typeof Icon&gt; ,                           | Set icon                              |
| status      | 'finish' &#124; 'wait' &#124; 'process' &#124; 'error' | Step status                           |
| title       | ReactNode                                              | The title of Steps item               |
