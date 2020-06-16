### 尺寸

设置组件的大小

<!--start-code-->

```js
const instance = (
  <div>
    <div>
      <Rate defaultValue={1} size="xs" />
    </div>
    <div>
      <Rate defaultValue={2} size="sm" />
    </div>
    <div>
      <Rate defaultValue={3} size="md" />
    </div>
    <div>
      <Rate defaultValue={4} size="lg" />
    </div>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
