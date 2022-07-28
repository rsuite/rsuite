<!--start-code-->

```js
import { MultiCascader } from 'rsuite';
import PeoplesIcon from '@rsuite/icons/Peoples';
import AdminIcon from '@rsuite/icons/Admin';
import { mockTreeData } from './mock';

const headers = ['Job Area', 'Job Type', 'Name'];
const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.name[methodName[layer]]();
  }
});

const App = () => (
  <MultiCascader
    data={data}
    block
    menuWidth={220}
    renderMenuItem={(label, item) => {
      return (
        <div>
          <AdminIcon /> {label}
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
        <PeoplesIcon /> Location
      </span>
    }
    renderValue={(value, selectedItems, selectedElement) => (
      <span>
        <span style={{ color: '#575757' }}>
          <PeoplesIcon /> Location :
        </span>{' '}
        {selectedItems.map(item => item.label).join(' , ')}
      </span>
    )}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
