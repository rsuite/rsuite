### Disabled

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/users.js
 */

const instance = (
  <div>
    <SelectPicker
      data={data}
      defaultValue={'Julius'}
      disabled
      style={{ width: 224 }}
    />
    <hr />
    <p>Disable Option</p>
    <SelectPicker
      data={data}
      style={{ width: 224 }}
      defaultValue={'Julius'}
      disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
