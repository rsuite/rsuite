### Custom

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <InputPicker
    data={data}
    groupBy="role"
    placeholder="Select User"
    style={{ width: 224 }}

    renderMenuItem={(label, item) => {
      return (
        <div>
          <i className="rs-icon rs-icon-user" /> {label}
        </div>
      );
    }}
    renderMenuGroup={(label, item) => {
      return (
        <div>
          <i className="rs-icon rs-icon-group" /> {label} - (
          {item.children.length})
        </div>
      );
    }}
    renderValue={(value, item, selectedElement) => {
      return (
        <div>
          <span style={{ color: '#575757' }}>
            <i className="rs-icon rs-icon-user" /> User :
          </span>{' '}
          {value}
        </div>
      );
    }}
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
