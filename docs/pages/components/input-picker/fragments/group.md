<!--start-code-->

```js
import { InputPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({
    label: item,
    value: item,
    role: Math.random() > 0.5 ? 'Owner' : 'Guest'
  })
);

const App = () => (
  <>
    <InputPicker data={data} groupBy="role" style={{ width: 224 }} />
    <hr />
    <p>Sort:</p>
    <InputPicker
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
