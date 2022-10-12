<!--start-code-->

```js
import { CheckTreePicker, Checkbox } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [4, 6, 6],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.name[methodName[layer]]();
  }
});

const App = () => (
  <>
    <CheckTreePicker
      virtualized
      defaultExpandAll
      data={data}
      style={{ width: 280 }}
      renderExtraFooter={() => (
        <div
          style={{
            padding: '10px 2px',
            borderTop: '1px solid #e5e5e5'
          }}
        >
          <Checkbox inline>Check all</Checkbox>
        </div>
      )}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
