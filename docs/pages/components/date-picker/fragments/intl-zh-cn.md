<!--start-code-->

```js
import { DatePicker } from 'rsuite';

const App = () => (
  <DatePicker
    format="yyyy-MM-dd HH:mm:ss"
    style={{ width: 260 }}
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
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
