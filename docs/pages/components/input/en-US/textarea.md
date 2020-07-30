### Textarea

<!--start-code-->

```js
const instance = (
  <div>
    <Input as="textarea" rows={3} style={{ width: 300 }} placeholder="Textarea" />
    <hr />
    <Input
      as="textarea"
      rows={3}
      style={{ width: 300, resize: 'auto' }}
      placeholder="resize: 'auto'"
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
