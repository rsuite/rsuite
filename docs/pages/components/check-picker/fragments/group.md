<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

function compare(a, b) {
  let nameA = a.toUpperCase();
  let nameB = b.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

const instance = (
  <div>
    <CheckPicker data={data} groupBy="role" style={{ width: 224 }} />
    <hr />
    <p>Sort:</p>
    <CheckPicker
      data={data}
      groupBy="role"
      sort={isGroup => {
        if (isGroup) {
          return (a, b) => {
            return compare(a.groupTitle, b.groupTitle);
          };
        }

        return (a, b) => {
          return compare(a.value, b.value);
        };
      }}
      style={{ width: 224 }}
    />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
