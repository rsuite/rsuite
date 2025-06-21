<!--start-code-->

```js
import { CheckTreePicker, Checkbox } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [4, 6, 6],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => {
  const [value, setValue] = React.useState([]);

  const handleCheckAll = (_v, checked) => {
    if (checked) {
      setValue(data.map(item => item.value));
    } else {
      setValue([]);
    }
  };

  return (
    <CheckTreePicker
      virtualized
      defaultExpandAll
      data={data}
      value={value}
      onChange={setValue}
      w={280}
      renderExtraFooter={() => (
        <ExtraFooter>
          <Checkbox inline onChange={handleCheckAll}>
            Check all
          </Checkbox>
        </ExtraFooter>
      )}
    />
  );
};

const ExtraFooter = ({ children }) => {
  return (
    <div
      style={{
        borderTop: '1px solid #e5e5e5',
        padding: 12
      }}
    >
      {children}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
