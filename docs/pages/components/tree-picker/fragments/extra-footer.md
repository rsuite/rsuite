<!--start-code-->

```js
import { TreePicker } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [6, 6, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => (
  <>
    <TreePicker
      virtualized
      defaultExpandAll
      data={data}
      style={{ width: 246 }}
      renderExtraFooter={() => (
        <div
          style={{
            padding: 10,
            borderTop: '1px solid #e5e5e5'
          }}
        >
          Extra footer
        </div>
      )}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
