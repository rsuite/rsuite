### 日期+时间

<!--start-code-->

```js
const instance = (
  <DatePicker
    format="YYYY-MM-DD HH:mm:ss"
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
