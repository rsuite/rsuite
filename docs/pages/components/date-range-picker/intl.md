### 设置本地语言


<!--start-code-->
```js
const DateRangePickerIntl = props => (
  <div className="field only-date">
    <DateRangePicker
      format="YYYY-MM-DD"
      locale={{
        sunday: '日',
        monday: '一',
        tuesday: '二',
        wednesday: '三',
        thursday: '四',
        friday: '五',
        saturday: '六',
        ok: '确定',
        today: '今天',
        yesterday: '昨天',
        last7Days: '最近 7 天',
      }}
    />
  </div>
);


ReactDOM.render(<DateRangePickerIntl />);
```
<!--end-code-->
