<!--start-code-->

```js
import { TagPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({
    label: item,
    value: item,
    role: Math.random() > 0.5 ? 'Owner' : 'Guest'
  })
);

const App = () => (
  <>
    <TagPicker data={data} groupBy="role" style={{ width: 300 }} />
    <hr />
    <p>Sort:</p>
    <TagPicker
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
      style={{ width: 300 }}
    />
  </>
);

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

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
