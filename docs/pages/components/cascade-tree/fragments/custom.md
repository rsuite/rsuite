<!--start-code-->

```js
import { CascadeTree } from 'rsuite';
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
  <CascadeTree
    data={data}
    columnWidth={180}
    renderTreeNode={(label, node) => {
      return (
        <>
          <AdminIcon /> {label}
        </>
      );
    }}
    renderColumn={(childNodes, { layer }) => {
      return <Column header={headers[layer]}> {childNodes}</Column>;
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
