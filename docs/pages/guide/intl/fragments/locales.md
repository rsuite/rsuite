<!--start-code-->

```js
const App = () => {
  const [localeKey, setLocaleKey] = React.useState('zh_CN');
  const locale = locales.find(item => item.key === localeKey);
  return (
    <CustomProvider locale={locale.value} formatDate={locale.formatDate}>
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
      <div style={{ width: 280 }}>
        <Calendar compact />
      </div>
    </CustomProvider>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
