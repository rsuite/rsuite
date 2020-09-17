### Progress

<!--start-code-->

```js
const instance = (
  <div>
    <Slider
      progress
      defaultValue={50}
      onChange={value => {
        console.log(value);
      }}
    />
    <hr />
    <RangeSlider defaultValue={[10, 50]} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
