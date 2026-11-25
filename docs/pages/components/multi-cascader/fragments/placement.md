<!--start-code-->

```js
import { MultiCascader } from 'rsuite';
import { mockTreeData } from './mock';
import PlacementContainer from '@/components/PlacementContainer';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => {
  return (
    <PlacementContainer>
      {({ container, placement, preventOverflow }) => (
        <MultiCascader
          w={224}
          preventOverflow={preventOverflow}
          data={data}
          placement={placement}
          container={preventOverflow ? container : undefined}
          placeholder={`Will pop from ${placement}`}
        />
      )}
    </PlacementContainer>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
