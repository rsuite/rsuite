### Date + Time

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
  />
);

ReactDOM.render(instance);
```

<!--end-code-->
