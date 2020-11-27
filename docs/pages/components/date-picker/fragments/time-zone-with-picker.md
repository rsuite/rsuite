<!--start-code-->

```js
const Instance = () => {
  const [timeZone, setTimeZone] = React.useState();
  return (
    <div>
      <TimeZonePicker onChange={value => setTimeZone(value)} />
      <DatePicker
        format="yyyy-MM-dd HH:mm:ss"
        timeZone={timeZone}
        style={{ marginLeft: '15px', width: 260 }}
      />
    </div>
  );
};

ReactDOM.render(<Instance />);
```

<!--end-code-->
