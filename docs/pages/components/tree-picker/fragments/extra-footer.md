<!--start-code-->

```js
import { TreePicker, HStack } from 'rsuite';
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
      w={246}
      renderExtraFooter={() => (
        <HStack px={12} py={8} bdt="1px solid var(--rs-border-primary)">
          Extra footer
        </HStack>
      )}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
