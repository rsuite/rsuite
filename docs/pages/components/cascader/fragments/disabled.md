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
    <label>Disabled: </label>
    <Cascader disabled defaultValue="1-1" data={data} style={{ widht: 224 }} />

    <label style={{ marginLeft: 10 }}>Disabled option: </label>
    <Cascader
      data={data}
      defaultValue="1-1"
      disabledItemValues={['2', '1-1']}
      style={{ widht: 224 }}
    />
    <hr />
    <label>Read only: </label>
    <Cascader readOnly defaultValue="1-1" data={data} style={{ widht: 224 }} />

    <hr />
    <label>Plaintext: </label>
    <Cascader plaintext defaultValue="1-1" data={data} style={{ widht: 224 }} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
