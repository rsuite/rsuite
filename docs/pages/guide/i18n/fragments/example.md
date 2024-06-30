<!--start-code-->

```js
import { CustomProvider, SelectPicker, DatePicker, Calendar, Toggle, Stack, Divider } from 'rsuite';
import * as locales from 'rsuite/locales';

const data = Object.keys(locales).map(key => ({
  key: key.replace(/([a-z]{2})([A-Z]{2})/, '$1-$2'),
  value: locales[key]
}));

const App = () => {
  const [localeKey, setLocaleKey] = React.useState('fa-IR');
  const [intlDateTimeFormat, setIntlDateTimeFormat] = React.useState(true);
  const locale = data.find(item => item.key === localeKey);
  return (
    <CustomProvider locale={locale.value} intlDateTimeFormat={intlDateTimeFormat} rtl>
      <Stack divider={<Divider vertical style={{ height: 400 }} />} spacing={40}>
        <Stack direction="column" alignItems="flex-start" spacing={20}>
          <DatePicker />
          <Calendar compact style={{ width: 300 }} />
        </Stack>
        <Stack direction="column" alignItems="flex-start" spacing={30}>
          <SelectPicker
            label="Locale"
            cleanable={false}
            data={data}
            value={localeKey}
            onChange={setLocaleKey}
            labelKey="key"
            valueKey="key"
          />
          <Toggle checked={intlDateTimeFormat} onChange={setIntlDateTimeFormat}>
            Use Intl.DateTimeFormat
          </Toggle>
        </Stack>
      </Stack>
    </CustomProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
