# Timeline

Vertical display timeline.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Custom active item

By default the last `Timeline.Item` is marked as active (with a blue dot).
You could change this behavior by providing a function for `isItemActive` prop.

Two preset values are provided for convenience.

- `Timeline.ACTIVE_FIRST` Mark the first item as active
- `Timeline.ACTIVE_LAST` Mark the last item as active (the default behavior)

<!--{include:`custom-active-item.md`}-->

### Custom alignment

<!--{include:`align.md`}-->

### Custom time

<!--{include:`time.md`}-->

### Endless

<!--{include:`endless.md`}-->

### Custom Icon

<!--{include:`custom.md`}-->

## Props

### `<Timeline>`

| Property     | Type `(Default)`                                    | Description                                          |
| ------------ | --------------------------------------------------- | ---------------------------------------------------- |
| align        | 'left' &#124; 'right' &#124; 'alternate' `('left')` | Timeline content alignment                           |
| as           | ElementType `('ul')`                                | You can use a custom element type for this component |
| children \*  | Timeline.Item[]                                     | The content of the component                         |
| classPrefix  | string `('timeline')`                               | The prefix of the component CSS class                |
| endless      | boolean                                             | Timeline endless                                     |
| isItemActive | (index: number, totalItemsCount: number) => boolean | Determine whether an item should be marked as active |

### `<Timeline.Item>`

| Property    | Type `(Default)`           | Description                                          |
| ----------- | -------------------------- | ---------------------------------------------------- |
| children \* | ReactNode                  | The content of the component                         |
| classPrefix | string `('timeline-item')` | The prefix of the component CSS class                |
| as          | ElementType `('li')`       | You can use a custom element type for this component |
| dot         | ReactNode                  | Customizing the Timeline item                        |
| time        | ReactNode                  | Customizing the Timeline time                        |
