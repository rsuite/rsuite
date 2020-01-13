### 显示刻度

<!--start-code-->

```js
const instance = (
  <div style={{ padding: 20 }}>
    <Slider defaultValue={50} min={10} step={10} max={100} graduated />

    <br />
    <Slider defaultValue={50} min={10} step={10} max={100} graduated progress />
    <br />
    <Slider
      defaultValue={50}
      min={10}
      step={10}
      max={100}
      graduated
      progress
      renderMark={mark => {
        return mark;
      }}
    />
    <br />

    <Slider
      defaultValue={50}
      step={64}
      graduated
      progress
      min={64}
      max={1024}
      renderMark={mark => {
        if ([64, 128, 256, 512, 1024].includes(mark)) {
          return <span>{mark} GB</span>;
        }
        return null;
      }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
