<!--start-code-->

```js
import { Cascader } from 'rsuite';
import TagIcon from '@rsuite/icons/Tag';
import { mockTreeData } from './mock';

const headers = ['Provincial', 'County', 'Town'];
const data = mockTreeData({ limits: [2, 3, 3], labels: headers });

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
