# Stat

Used to display statistical data with a title and its corresponding value, emphasizing the current value of a particular attribute.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

Display a simple statistic with a label and value.

<!--{include:`basic.md`}-->

### Format Options

Customize the value display using `formatOptions` for locale-aware number formatting.

<!--{include:`format-options.md`}-->

### Trend

Show a trend indicator (up/down) alongside the value to reflect changes.

<!--{include:`trend.md`}-->

### Border

Add a border around the statistic for emphasis.

<!--{include:`bordered.md`}-->

### Stat with Progress

Combine the statistic with a progress bar to visualize progress.

<!--{include:`progress-bar.md`}-->

### Stat with Ring Progress

Display progress as a ring around the statistic value.

<!--{include:`ring-progress.md`}-->

### Icon

Add an icon to the statistic for visual context.

<!--{include:`icon.md`}-->

### Info Tip

Show additional information with an info tip on the label.

<!--{include:`info-tip.md`}-->

### Value Unit

Display a unit next to the value for clarity (e.g., %, $).

<!--{include:`value-unit.md`}-->

### Stat Group

Group multiple statistics together in a grid layout.

<!--{include:`group.md`}-->

### Responsive Stat Group

Make the stat group responsive to different screen sizes.

<!--{include:<example-responsive>}-->

## Props

### `<Stat>`

| Property    | Type `(Default)`      | Description                           |
| ----------- | --------------------- | ------------------------------------- |
| as          | elementType `('div')` | HTML tag of the component             |
| bordered    | boolean               | Whether to display a border           |
| children    | ReactNode             | The children of the component         |
| classPrefix | string `('stat')`     | The prefix of the component CSS class |
| icon        | ReactNode             | The icon of the component             |

### `<Stat.Label>`

| Property    | Type `(Default)`        | Description                               |
| ----------- | ----------------------- | ----------------------------------------- |
| as          | elementType `('dt')`    | HTML tag of the component                 |
| children    | ReactNode               | The children of the component             |
| classPrefix | string `('stat-label')` | The prefix of the component CSS class     |
| info        | string                  | The info tip of the label                 |
| uppercase   | boolean                 | Whether to display the label in uppercase |

### `<Stat.Value>`

| Property      | Type `(Default)`                 | Description                           |
| ------------- | -------------------------------- | ------------------------------------- |
| as            | elementType `('dd')`             | HTML tag of the component             |
| children      | ReactNode                        | The children of the component         |
| classPrefix   | string `('stat-value')`          | The prefix of the component CSS class |
| formatOptions | [Intl.NumberFormatOptions][Intl] | The format options of the value       |
| value         | number                           | The value of the component            |

### `<Stat.Trend>`

| Property    | Type `(Default)`        | Description                           |
| ----------- | ----------------------- | ------------------------------------- |
| as          | elementType `('span')`  | HTML tag of the component             |
| children    | ReactNode               | The children of the component         |
| classPrefix | string `('stat-trend')` | The prefix of the component CSS class |
| indicator   | 'up' \| 'down'          | The trend indicator of the component  |

### `<Stat.HelpText>`

| Property    | Type `(Default)`            | Description                           |
| ----------- | --------------------------- | ------------------------------------- |
| as          | elementType `('span')`      | HTML tag of the component             |
| children    | ReactNode                   | The children of the component         |
| classPrefix | string `('stat-help-text')` | The prefix of the component CSS class |

### `<StatGroup>`

| Property    | Type `(Default)`        | Description                           |
| ----------- | ----------------------- | ------------------------------------- |
| as          | elementType `('div')`   | HTML tag of the component             |
| children    | ReactNode               | The children of the component         |
| classPrefix | string `('stat-group')` | The prefix of the component CSS class |
| columns     | number `(4)`            | The number of columns of the group    |
| spacing     | number `(6)`            | The spacing between the stats         |

[Intl]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
