### 和按钮组合

<!--start-code-->

```js
const instance = (
  <div>
    <DateRangePicker  toggleComponentClass={Button} />
    <hr />
    <DateRangePicker block toggleComponentClass={Button} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
