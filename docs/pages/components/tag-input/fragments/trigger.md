<!--start-code-->

```js
const instance = (
  <div>
    <TagInput
      trigger={'Enter'}
      placeholder="Enter"
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <TagInput
      trigger={'Space'}
      placeholder="Space"
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <TagInput
      trigger={'Comma'}
      placeholder="Comma"
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      onCreate={(value, item) => {
        console.log(value, item);
      }}
    />
    <hr />
    <TagInput
      trigger={['Enter', 'Space', 'Comma']}
      placeholder="Enter, Space, Comma"
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
