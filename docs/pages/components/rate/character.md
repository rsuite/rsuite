### 其他字符

你可以使用其他 icon、数字、中文或是其他自定义的图案

<!--start-code-->

```js
const instance = (
  <div>
    <div>
      <Rate
        defaultValue={2.5}
        character={<Icon icon="heart" size="2x" style={{ color: 'red' }} />}
      />
    </div>
    <div>
      <Rate defaultValue={2.5} character="鼎" />
    </div>

    <div>
      <Rate defaultValue={2.5} character="A" />
    </div>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
