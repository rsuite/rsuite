### Use TimeZonePicker to set time zone

<!--start-code-->

```js
const Instance = () => {
  const [timeZone, setTimeZone] = React.useState();
  return (
    <div>
      <TimeZonePicker onChange={value => setTimeZone(value)} />
      <DatePicker format="yyyy-MM-dd HH:mm:ss" timeZone={timeZone} style={{ marginLeft: '15px' }} />
    </div>
  );
};

ReactDOM.render(<Instance />);
```

<!--end-code-->
