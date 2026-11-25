<!--start-code-->

```js
import { Toggle, VStack, HStack, SelectPicker, Divider, Center } from 'rsuite';

function AsyncToggle(props) {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setChecked(checked => !checked);
      setLoading(false);
    }, 1000);
  }, []);

  return <Toggle loading={loading} checked={checked} onChange={toggle} {...props} />;
}

const App = () => {
  const [checked, setChecked] = useState(true);
  const [withText, setWithText] = useState(false);
  const [size, setSize] = useState('md');
  const [withLabel, setWithLabel] = useState(false);
  return (
    <>
      <HStack divider={<Divider vertical />} h={200}>
        <Center w={300}>
          <Toggle
            loading
            checked={checked}
            checkedChildren={withText ? 'Enabled' : undefined}
            unCheckedChildren={withText ? 'Disabled' : undefined}
            size={size}
          >
            {withLabel ? 'With label' : undefined}
          </Toggle>
        </Center>

        <VStack spacing={20}>
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
          <Toggle checked={checked} onChange={setChecked}>
            Checked
          </Toggle>

          <Toggle checked={withText} onChange={setWithText}>
            With text
          </Toggle>

          <Toggle checked={withLabel} onChange={setWithLabel}>
            With label
          </Toggle>
        </VStack>
      </HStack>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
