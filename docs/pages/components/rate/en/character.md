### Characters

You can use other icons, numbers, Chinese or other custom patterns

<!--start-code-->

```js
const instance = (
  <div>
    <div>
      <Rate allowHalf defaultValue={2.5} character={<Icon icon="heart" size="2x" />} color="red" />
    </div>
    <div>
      <Rate allowHalf defaultValue={2.5} character="鼎" color="blue" />
    </div>

    <div>
      <Rate allowHalf defaultValue={2.5} character="A" />
    </div>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
