<!--start-code-->

```js
import { CheckPicker, VStack, SegmentedControl } from 'rsuite';

const data = [];
const sizes = ['xs', 'sm', 'md', 'lg'];

const App = () => {
  const [size, setSize] = React.useState('md');

  return (
    <>
      <SegmentedControl
        data={sizes.map(item => ({ value: item, label: item }))}
        value={size}
        onChange={size => setSize(size)}
      />

      <hr />
      <VStack>
        <CheckPicker data={data} loading size={size} />
        <CheckPicker data={data} loading w={200} size={size} />
        <CheckPicker label="User" data={data} loading size={size} />
        <CheckPicker label="User" data={data} loading w={200} size={size} />
      </VStack>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
