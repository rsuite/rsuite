### 尺寸

设置 rate 组件的大小

<!--start-code-->

```js
const instance = (
  <div>
    <div>
      <Rate defaultValue={4} size="xs" />
    </div>
    <div>
      <Rate defaultValue={4} size="sm" />
    </div>
    <div>
      <Rate defaultValue={4} size="md" />
    </div>
    <div>
      <Rate defaultValue={4} size="lg" />
    </div>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
