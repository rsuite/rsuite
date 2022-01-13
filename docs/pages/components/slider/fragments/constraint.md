<!--start-code-->

```js
const instance = (
  <div>
    <RangeSlider
      max={50}
      defaultValue={[10, 40]}
      constraint={([start, end]) => start <= 25 && end >= 35}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
