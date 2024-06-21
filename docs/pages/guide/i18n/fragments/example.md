<!--start-code-->

```js
import { CustomProvider, SelectPicker, DatePicker, Calendar, Pagination } from 'rsuite';
import * as locales from 'rsuite/locales';

const data = Object.keys(locales).map(key => ({
  key: key.replace(/([a-z]{2})([A-Z]{2})/, '$1-$2'),
  value: locales[key]
}));

const App = () => {
  const [localeKey, setLocaleKey] = React.useState('fa-IR');
  const locale = data.find(item => item.key === localeKey);
  return (
    <CustomProvider locale={locale.value} intlDateTimeFormat>
      <SelectPicker
        label="Locale"
        aria-labelledby="change_locale"
        cleanable={false}
        data={data}
        value={localeKey}
        onChange={setLocaleKey}
        labelKey="key"
        valueKey="key"
      />
      <hr />
      <DatePicker />
      <div style={{ width: 280 }}>
        <Calendar compact />
      </div>
      <hr />
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        total={200}
        limit={50}
        limitOptions={[30, 50, 100]}
        maxButtons={5}
        layout={['total', '-', 'limit', '|', 'pager', 'skip']}
      />
    </CustomProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
