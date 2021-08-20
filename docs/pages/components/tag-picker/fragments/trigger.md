<!--start-code-->

```js
const instance = (
  <div>
    <TagPicker
      creatable
      data={[]}
      trigger={['Enter', 'Space', 'Comma']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
