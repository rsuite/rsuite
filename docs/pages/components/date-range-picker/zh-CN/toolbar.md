### 自定义快捷项
<!--start-code-->
```js

const DateRangePickerCustomToolbar = props => (
  <div className="field">
    <DateRangePicker
      ranges={[{
        label: '昨天',
        value: [dateFns.addDays(new Date(), -1), dateFns.addDays(new Date(), -1)]
      }, {
        label: '今天',
        value: [new Date(), new Date()]
      }, {
        label: '明天',
        value: [dateFns.addDays(new Date(), 1), dateFns.addDays(new Date(), 1)]
      }, {
        label: '最近 7 天',
        value: [dateFns.subDays(new Date(), 6), new Date()]
      }]}
    />
  </div>
);

ReactDOM.render(<DateRangePickerCustomToolbar />);
```
<!--end-code-->

