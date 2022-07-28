<!--start-code-->

```js
import { Cascader } from 'rsuite';
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
  <Cascader
    data={data}
    style={{ width: 224 }}
    menuWidth={160}
    renderMenuItem={(label, item) => {
      return (
        <>
          <AdminIcon /> {label}
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
