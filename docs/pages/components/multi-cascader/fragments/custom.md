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
    return faker.person[methodName[layer]]();
  }
});

const Column = ({ header, children }) => {
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
        {header}
      </div>
      {children}
    </div>
  );
};

const App = () => (
  <MultiCascader
    data={data}
    block
    columnWidth={220}
    renderTreeNode={(label, node) => {
      return (
        <div>
          <AdminIcon /> {label}
        </div>
      );
    }}
    renderColumn={(childNodes, { layer }) => {
      return <Column header={headers[layer]}> {childNodes}</Column>;
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
