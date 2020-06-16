### Disabled

<!--start-code-->

```js
const instance = (
  <div>
    <Slider disabled />
    <hr />
    <Slider
      value={50}
      min={0}
      step={10}
      max={100}
      graduated
      progress
      disabled
    />
    <hr />
    <RangeSlider
      value={[10, 50]}
      min={0}
      step={10}
      max={100}
      graduated
      progress
      disabled
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
