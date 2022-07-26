<!--start-code-->

```js
import { MultiCascader } from 'rsuite';
import LocationIcon from '@rsuite/icons/Location';
import { mockTreeData } from './mock';

const headers = ['Province', 'City', 'District'];
const data = mockTreeData({ limits: [2, 3, 3], labels: headers });

const App = () => (
  <MultiCascader
    data={data}
    block
    menuWidth={220}
    renderMenuItem={(label, item) => {
      return (
        <div>
          <LocationIcon /> {label}
        </div>
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
    placeholder={
      <span>
        <LocationIcon /> Location
      </span>
    }
    renderValue={(value, selectedItems, selectedElement) => (
      <span>
        <span style={{ color: '#575757' }}>
          <LocationIcon /> Location :
        </span>{' '}
        {selectedItems.map(item => item.label).join(' , ')}
      </span>
    )}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
