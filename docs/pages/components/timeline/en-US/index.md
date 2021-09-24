# Timeline

Vertical display timeline.

## Import

<!--{include:(components/timeline/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

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

| Property    | Type `(Default)`                                          | Description                                          |
| ----------- | --------------------------------------------------------- | ---------------------------------------------------- |
| align       | enum: 'left' &#124; 'right' &#124; 'alternate' `('left')` | Timeline content alignment                           |
| children \* | Timeline.Item[]                                           | The content of the component                         |
| classPrefix | string `('timeline')`                                     | The prefix of the component CSS class                |
| as          | ElementType `('ul')`                                      | You can use a custom element type for this component |
| endless     | boolean                                                   | Timeline endless                                     |

### `<Timeline.Item>`

| Property    | Type `(Default)`           | Description                                          |
| ----------- | -------------------------- | ---------------------------------------------------- |
| children \* | ReactNode                  | The content of the component                         |
| classPrefix | string `('timeline-item')` | The prefix of the component CSS class                |
| as          | ElementType `('li')`       | You can use a custom element type for this component |
| dot         | ReactNode                  | Customizing the Timeline item                        |
| time        | ReactNode                  | Customizing the Timeline time                        |
