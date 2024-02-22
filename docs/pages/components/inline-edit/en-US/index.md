# InlineEdit

An inline edit displays a custom input component that switches between reading and editing on the same page.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### TextArea

<!--{include:`text-area.md`}-->

### With InputPicker and no controls

<!--{include:`with-input-picker.md`}-->

### With TagPicker

<!--{include:`with-tag-picker.md`}-->

### With DatePicker

<!--{include:`with-date-picker.md`}-->

### With Slider

<!--{include:`with-slider.md`}-->

### Custom Input

InlineEdit can wrap any data input component, including custom input components.

<!--{include:`custom-input.md`}-->

### Disabled

<!--{include:`disabled.md`}-->

### User Profile

<!--{include:`user-profile.md`}-->

### Size

<!--{include:`size.md`}-->

## Props

### `<InlineEdit>`

| Property     | Type `(Default)`                                                | Description                                                                       |
| ------------ | --------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| as           | elementType `('div')`                                           | A custom element type.                                                            |
| disabled     | boolean                                                         | If true, the InlineEdit will be disabled.                                         |
| defaultValue | any                                                             | The initial value of the InlineEdit when it is not controlled.                    |
| value        | any                                                             | The value of the InlineEdit.                                                      |
| showControls | boolean `(true)`                                                | show the control buttons when editing.                                            |
| placeholder  | string                                                          | The placeholder of the InlineEdit.                                                |
| size         | `'lg'` \| `'md'` \| `'sm'` \| `'xs'`                            | The size of the InlineEdit.                                                       |
| stateOnBlur  | `'save'` \| `'cancel'`                                          | The state of the InlineEdit when it is blurred.                                   |
| onChange     | (value: any, event: ChangeEvent) => void                        | The callback function that is called when the value of the InlineEdit is changed. |
| onCancel     | (event?: SyntheticEvent) => void                                | The callback function that is called when the InlineEdit is canceled.             |
| onSave       | (event?: SyntheticEvent) => void                                | The callback function that is called when the InlineEdit is saved.                |
| onEdit       | (event: SyntheticEvent) => void                                 | The callback function that is called when the InlineEdit is clicked.              |
| children     | ReactNode \| (props: ChildrenProps, ref: Ref<any>) => ReactNode | The render function of the InlineEdit.                                            |
