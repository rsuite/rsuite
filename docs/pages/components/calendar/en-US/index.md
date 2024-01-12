# Calendar

A component that displays data by calendar

## Import

<!--{include:(components/calendar/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Custom cell styles

Use `cellClassName` function to specify the custom class name added to each cell. For example, in the following code, we specify that the `.bg-gray` class name is added on Monday, Wednesday, and Friday, so that the background color of the cells in these three columns is gray.

<!--{include:`custom-cell.md`}-->

### Compact

<!--{include:`compact.md`}-->

## Props

### `<Calendar>`

<!-- prettier-sort-markdown-table -->

| Property      | Type`(Default)`                             | Description                                                                                                                         |
| ------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| bordered      | boolean                                     | Show border                                                                                                                         |
| cellClassName | (date: Date) => string \| undefined         | Custom cell classes base on it's date                                                                                               |
| compact       | boolean                                     | Display a compact calendar                                                                                                          |
| defaultValue  | Date                                        | Default value                                                                                                                       |
| isoWeek       | boolean                                     | [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_week_date), each calendar week begins on Monday and Sunday on the seventh day |
| locale        | [CalendarLocaleType](/guide/i18n/#calendar) | Locale text                                                                                                                         |
| onChange      | (date:Date) => void                         | Callback fired before the value changed                                                                                             |
| onSelect      | (date:Date) => void                         | Callback fired before the date selected                                                                                             |
| renderCell    | (date: Date) => ReactNode                   | Custom render calendar cells                                                                                                        |
| value         | Date                                        | Controlled value                                                                                                                    |
