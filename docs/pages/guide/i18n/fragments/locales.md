### Breadcrumb

```ts
type BreadcrumbLocaleType = {
  expandText?: string;
};
```

### Calendar

Calendar、DatePicker、DateRangePicker

```ts
type CalendarLocaleType = {
  sunday?: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  ok?: string;
  today?: string;
  yesterday?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
  formattedMonthPattern?: string;
  formattedDayPattern?: string;

  // for DateRangePicker
  last7Days?: string;
};
```

### Pagination

```ts
type PaginationLocaleType = {
  more?: string;
  prev?: string;
  next?: string;
  first?: string;
  last?: string;
  limit?: string;
  total?: string;
  skip?: string;
};
```

### Pickers

SelectPicker、CheckPicker、TreePicker、CheckTreePicker、Cascader、MultiCascader

```ts
type PickerLocaleType = {
  noResultsText?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  loading?: string;
  emptyMessage?: string;

  // for CheckTreePicker, MultiCascader
  checkAll?: string;

  // for InputPicker
  newItem?: string;
  createOption?: string;
};
```

### Uploader

```ts
type UploaderLocaleType = {
  inited?: string;
  progress?: string;
  error?: string;
  complete?: string;
  emptyFile?: string;
  upload?: string;
};
```

### Table

```ts
type TableLocaleType = {
  emptyMessage?: string;
  loading?: string;
};
```

### Toggle

```ts
type ToggleLocaleType = {
  on?: string;
  off?: string;
};
```
