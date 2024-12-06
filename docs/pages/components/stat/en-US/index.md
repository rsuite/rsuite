# Stat

Used to display statistical data with a title and its corresponding value, emphasizing the current value of a particular attribute.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Format Options

<!--{include:`format-options.md`}-->

### Trend

<!--{include:`trend.md`}-->

### Border

<!--{include:`bordered.md`}-->

### Stat with Progress

<!--{include:`progress-bar.md`}-->

### Stat with Ring Progress

<!--{include:`ring-progress.md`}-->

### Icon

<!--{include:`icon.md`}-->

### Info Tip

<!--{include:`info-tip.md`}-->

### Value Unit

<!--{include:`value-unit.md`}-->

### Stat Group

<!--{include:`group.md`}-->

### Responsive Stat Group

<!--{include:`responsive-group.md`}-->

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
