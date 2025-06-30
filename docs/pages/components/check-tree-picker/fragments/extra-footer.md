<!--start-code-->

```js
import { CheckTreePicker, Checkbox, HStack } from 'rsuite';
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
        <HStack px={12} py={8} bdt="1px solid var(--rs-border-primary)">
          <Checkbox inline onChange={handleCheckAll}>
            Check all
          </Checkbox>
        </HStack>
      )}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
