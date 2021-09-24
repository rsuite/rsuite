<!--start-code-->

```js
const instance = (
  <DatePicker
    format="yyyy-MM-dd HH:mm:ss"
    ranges={[
      {
        label: 'Now',
        value: new Date()
      }
    ]}
    style={{ width: 260 }}
  />
);

ReactDOM.render(instance);
```

<!--end-code-->
