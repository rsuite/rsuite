<!--start-code-->

```js
import { Toggle, SelectPicker, HStack } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

const App = () => {
  const [size, setSize] = React.useState('md');
  return (
    <>
      <SelectPicker
        label="Size"
        value={size}
        onChange={setSize}
        searchable={false}
        cleanable={false}
        data={[
          { value: 'xs', label: 'Extra Small (xs)' },
          { value: 'sm', label: 'Small (sm)' },
          { value: 'md', label: 'Medium (md)' },
          { value: 'lg', label: 'Large (lg)' },
          { value: 'xl', label: 'Extra Large (xl)' }
        ]}
      />
      <hr />
      <HStack spacing={20}>
        <Toggle size={size} checkedChildren="Open" unCheckedChildren="Close" defaultChecked />
        <Toggle
          size={size}
          checkedChildren={<CheckIcon />}
          unCheckedChildren={<CloseIcon />}
          defaultChecked
        />
      </HStack>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
