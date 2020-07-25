### 设置本地语言

`DatePicker` 支持本地语言自定义配置，但是我们更推荐使用统一[国际化](/guide/intl)配置。

<!--start-code-->

```js
const DatePickerIntl = props => (
  <div className="field only-date">
    <DatePicker
      format="YYYY-MM-DD HH:mm:ss"
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
        hours: '时',
        minutes: '分',
        seconds: '秒'
      }}
    />
  </div>
);

ReactDOM.render(<DatePickerIntl />);
```

<!--end-code-->
