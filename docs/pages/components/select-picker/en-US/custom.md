### Custom Option

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <SelectPicker
    data={data}
    style={{ width: 224 }}
    groupBy="role"
    placeholder="Select User"
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
          <i className="rs-icon rs-icon-group" /> {label} - ({item.children.length})
        </div>
      );
    }}
    renderValue={(value, item) => {
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
