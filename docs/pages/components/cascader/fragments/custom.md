<!--start-code-->

```js
import { Cascader } from 'rsuite';
import TagIcon from '@rsuite/icons/Tag';

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

const headers = ['Provincial', 'County', 'Town'];
const data = mockTreeData(3, 3, headers);

const App = () => (
  <Cascader
    data={data}
    style={{ width: 224 }}
    menuWidth={160}
    renderMenuItem={(label, item) => {
      return (
        <>
          <TagIcon /> {label}
        </>
      );
    }}
    renderMenu={(children, menu, parentNode, layer) => {
      return (
        <div>
          <div
            style={{
              background: '#154c94',
              padding: '4px 10px',
              color: ' #fff',
              textAlign: 'center'
            }}
          >
            {headers[layer]}
          </div>
          {menu}
        </div>
      );
    }}
    renderValue={(value, activePaths, activeItemLabel) => {
      return activePaths.map(item => item.label).join(' > ');
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
