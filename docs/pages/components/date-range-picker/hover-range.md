### 选择整周、整月

<!--start-code-->

```js
const instance = (
  <div className="field">
    <p>选择整周</p>
    <DateRangePicker hoverRange="week" ranges={[]} />
    <p>选择整周，ISO 8601 标准， 每个日历星期从星期一开始，星期日为第7天</p>
    <DateRangePicker hoverRange="week" isoWeek ranges={[]} />
    <p>选择整月</p>
    <DateRangePicker hoverRange="month" ranges={[]} />
    <p>自定义选择</p>
    <DateRangePicker
      ranges={[]}
      hoverRange={date => [dateFns.subDays(date, 1), dateFns.addDays(date, 1)]}
    />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
