# Calendar

A component that displays data by calendar

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Compact

<!--{include:`compact.md`}-->

### Custom cell styles

Use `cellClassName` function to specify the custom class name added to each cell. For example, in the following code, we specify that the `.bg-gray` class name is added on Monday, Wednesday, and Friday, so that the background color of the cells in these three columns is gray.

<!--{include:`custom-cell.md`}-->

### Custom week

<!--{include:`week-start.md`}-->

- Use `weekStart` to specify the first day of the week. If `isoWeek` is set, this property is ignored.
- Use `isoWeek` to enable the [ISO 8601 standard][ISO-8601], where each calendar week begins on Monday and Sunday on the seventh day.
- Use `showWeekNumbers` to display week numbers.

### Lunar

<!--{include:`lunar.md`}-->

## Props

### `<Calendar>`

| Property           | Type`(Default)`                                   | Description                                                                                                                       |
| ------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| bordered           | boolean                                           | Show border                                                                                                                       |
| cellClassName      | (date: Date) => string \| undefined               | Custom cell classes base on it's date                                                                                             |
| compact            | boolean                                           | Display a compact calendar                                                                                                        |
| defaultValue       | Date                                              | The default value (uncontrolled)                                                                                                  |
| isoWeek            | boolean                                           | [ISO 8601 standard][ISO-8601], each calendar week begins on Monday and Sunday on the seventh day                                  |
| locale             | [DateTimeFormats](/guide/i18n/#date-time-formats) | Locale configuration                                                                                                              |
| monthDropdownProps | [MonthDropdownProps][month-dropdown-props]        | Props for the month dropdown                                                                                                      |
| onChange           | (date: Date) => void                              | Callback fired before the value changed                                                                                           |
| onSelect           | (date: Date) => void                              | Callback fired before the date selected                                                                                           |
| renderCell         | (date: Date) => ReactNode                         | Custom render calendar cells                                                                                                      |
| value              | Date                                              | The current value (controlled)                                                                                                    |
| weekStart          | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 `(0)`             | The index of the first day of the week (0 - Sunday). If `isoWeek` is `true`, the value of `weekStart` is ignored <br/>![][5.62.0] |

<!--{include:(_common/types/month-dropdown-props.md)}-->

[month-dropdown-props]: #code-ts-month-dropdown-props-code
[ISO-8601]: https://en.wikipedia.org/wiki/ISO_week_date
[5.62.0]: https://img.shields.io/badge/>=-v5.62.0-blue
