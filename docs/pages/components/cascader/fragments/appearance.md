<!--start-code-->

```js
import { Cascader } from 'rsuite';

function mockTreeData(depth, length, labels) {
  const data = [];
  const mock = (list, parentValue, layer = 0) => {
    Array.from({ length }).forEach((_, index) => {
      const value = parentValue ? `${parentValue}-${index + 1}` : `${index + 1}`;
      const children = [];
      const row = { label: `${labels[layer]} ${value}`, value };

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

const data = mockTreeData(3, 3, ['Provincial', 'County', 'Town']);

const App = () => (
  <>
    <Cascader data={data} appearance="default" placeholder="Default" style={{ width: 224 }} />
    <hr />
    <Cascader data={data} appearance="subtle" placeholder="Subtle" style={{ width: 224 }} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
