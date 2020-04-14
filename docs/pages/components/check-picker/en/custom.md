### Custom options

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const instance = (
  <CheckPicker
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
          <i className="rs-icon rs-icon-group" /> {label} - ({
            item.children.length
          })
        </div>
      );
    }}
    renderValue={(value, items) => {
      return (
        <span>
          <span style={{ color: '#575757' }}>
            <i className="rs-icon rs-icon-user" /> Users :
          </span>{' '}
          {value.join(' , ')}
        </span>
      );
    }}
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
