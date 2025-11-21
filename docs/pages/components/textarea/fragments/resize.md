<!--start-code-->

```js
import { Textarea, VStack, SelectPicker } from 'rsuite';

const App = () => {
  const [resize, setResize] = React.useState('vertical');
  return (
    <VStack>
      <SelectPicker
        label="Resize"
        data={[
          { value: 'both', label: 'both' },
          { value: 'horizontal', label: 'horizontal' },
          { value: 'none', label: 'none' },
          { value: 'vertical', label: 'vertical' }
        ]}
        onChange={setResize}
        value={resize}
        cleanable={false}
        searchable={false}
        placeholder="Select resize"
      />
      <Textarea placeholder="Default Textarea" resize={resize} />
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
