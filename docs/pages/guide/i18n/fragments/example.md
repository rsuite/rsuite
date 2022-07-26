<!--start-code-->

```js
import { CustomProvider, SelectPicker, DatePicker, Calendar } from 'rsuite';
import ar_EG from 'rsuite/locales/ar_EG';
import da_DK from 'rsuite/locales/da_DK';
import de_DE from 'rsuite/locales/de_DE';
import en_GB from 'rsuite/locales/en_GB';
import en_US from 'rsuite/locales/en_US';
import es_AR from 'rsuite/locales/es_AR';
import es_ES from 'rsuite/locales/es_ES';
import fi_FI from 'rsuite/locales/fi_FI';
import it_IT from 'rsuite/locales/it_IT';
import ko_KR from 'rsuite/locales/ko_KR';
import pt_BR from 'rsuite/locales/pt_BR';
import ru_RU from 'rsuite/locales/ru_RU';
import sv_SE from 'rsuite/locales/sv_SE';
import zh_CN from 'rsuite/locales/zh_CN';
import zh_TW from 'rsuite/locales/zh_TW';
import fa_IR from 'rsuite/locales/fa_IR';

const locales = [
  { key: 'ar_EG', value: ar_EG },
  { key: 'da_DK', value: da_DK },
  { key: 'de_DE', value: de_DE },
  { key: 'en_GB', value: en_GB },
  { key: 'en_US', value: en_US },
  { key: 'es_AR', value: es_AR },
  { key: 'es_ES', value: es_ES },
  { key: 'fa_IR', value: fa_IR },
  { key: 'fi_FI', value: fi_FI },
  { key: 'it_IT', value: it_IT },
  { key: 'ko_KR', value: ko_KR },
  { key: 'pt_BR', value: pt_BR },
  { key: 'ru_RU', value: ru_RU },
  { key: 'sv_SE', value: sv_SE },
  { key: 'zh_CN', value: zh_CN },
  { key: 'zh_TW', value: zh_TW }
];

const App = () => {
  const [localeKey, setLocaleKey] = React.useState('zh_CN');
  const locale = locales.find(item => item.key === localeKey);
  return (
    <CustomProvider locale={locale.value}>
      <label id="change_locale">Change locale: </label>
      <SelectPicker
        aria-labelledby="change_locale"
        cleanable={false}
        data={locales}
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
    </CustomProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
