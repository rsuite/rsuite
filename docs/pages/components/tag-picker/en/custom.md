### Custom

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/users.js
 */

const instance = (
  <TagPicker
    data={data}
    groupBy="role"
    placeholder="Select User"
    block
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
            <i className="rs-icon rs-icon-user" />
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
