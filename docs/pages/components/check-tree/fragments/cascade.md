<!--start-code-->

```js
import { CheckTree } from 'rsuite';

function mockTreeData(depth, length) {
  const data = [];
  const mock = (list, parentValue, layer = 0) => {
    Array.from({ length }).forEach((_, index) => {
      const value = parentValue ? `${parentValue}-${index + 1}` : `${index + 1}`;
      const children = [];
      const row = { label: `Layer ${layer + 1}`, value };

      list.push(row);

      if (layer < depth - 1) {
        row.children = children;
        mock(children, value, layer + 1);
      }
    });
  };

  mock(data);

  return data;
}
const data = mockTreeData(3, 2);

const App = () => {
  const [cascade, setCascade] = useState(false);
  return (
    <div>
      Cascade:{' '}
      <Toggle
        checked={cascade}
        onChange={checked => {
          setCascade(checked);
        }}
      />
      <hr />
      <CheckTree defaultExpandAll cascade={cascade} defaultValue={[2, 38]} data={data} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
