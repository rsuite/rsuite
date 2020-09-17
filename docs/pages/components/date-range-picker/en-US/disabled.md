### Disabled

<!--start-code-->

```js
const {
  allowedMaxDays,
  allowedDays,
  allowedRange,
  beforeToday,
  afterToday,
  combine
} = DateRangePicker;

const Demo = props => (
  <div className="field">
    <p>Disabled component.</p>
    <DateRangePicker disabled />

    <hr />
    <p>Custom disabled.</p>
    <DateRangePicker disabledDate={date => dateFns.isAfter(date, new Date())} />

    <hr />
    <p>Allow maximum selection for 7 days, other dates are disabled.</p>
    <DateRangePicker disabledDate={allowedMaxDays(7)} />

    <hr />
    <p>Only 7 days allowed, other dates are disabled</p>
    <DateRangePicker disabledDate={allowedDays(7)} />

    <hr />
    <p>Only one date range is allowed, other dates are disabled</p>
    <DateRangePicker disabledDate={allowedRange('2018-12-01', '2019-10-01')} />

    <hr />
    <p>Disable dates before today</p>
    <DateRangePicker disabledDate={beforeToday()} />

    <hr />
    <p>Disable dates after today</p>
    <DateRangePicker disabledDate={afterToday()} />

    <hr />
    <p>
      Combination: Allow maximum selection for 7 days, while disabling dates
      before today, other dates are disabled
    </p>
    <DateRangePicker disabledDate={combine(allowedMaxDays(7), beforeToday())} />
  </div>
);

ReactDOM.render(<Demo />);
```

<!--end-code-->

`disabledDate` is a function type property that is called when the calendar is rendered and the date is selected, and the options that need to be disabled can be customized according to the business. The syntax is as follows:

```ts
disabledDate(
 date: Date,              // Date used to determine if disabling is required.
 selectDate: Array<Date>, // Date selected.
 selectedDone: boolean,     // Whether to choose to finish now. If `false`, only the start date is selected, waiting for the selection end date.
 target: 'CALENDAR', 'TOOLBAR_BUTTON_OK', 'TOOLBAR_SHORTCUT'   // Call the target of the `disabledDate` function
) => boolean
```

To make it easier to set the date you want to disable, `DateRangePicker` provides some methods for easy calling, examples:

```ts
import { DateRangePicker } from 'rsuite';

const { combine, allowedMaxDays, beforeToday } = DateRangePicker;

ReactDOM.render(
  <DateRangePicker disabledDate={combine(allowedMaxDays(7), beforeToday())} />
);
```

**allowedMaxDays**

Allow the maximum number of days specified, other dates are disabled

```ts
allowedMaxDays(days: number) => boolean
```

**allowedDays**

Only allowed days are specified, other dates are disabled

```ts
allowedDays(days: number) => boolean
```

**allowedRange**

Allow specified date range, other dates are disabled

```ts
allowedRange( startDate: string | Date, endDate: string | Date) => boolean
```

**after**

Disable dates after the specified date

```ts
after(date?: string | Date) => boolean
```

**afterToday**

Disable dates after today

```ts
afterToday() => boolean
```

**before**

Disable dates before the specified date

```ts
before(date?: string | Date) => boolean
```

**beforeToday**

Disable dates before today

```ts
beforeToday() => boolean
```

**combine**

Used to combine multiple conditions

```ts
combine(...) => boolean
```
