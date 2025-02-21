<!--start-code-->

```js
import { Radio, HStack } from 'rsuite';

const App = () => (
  <>
    <HStack spacing={20}>
      <Label>Disabled</Label>
      <Radio disabled> Radio</Radio>
      <Radio checked disabled>
        Checked Radio
      </Radio>
    </HStack>

    <hr />
    <HStack spacing={20}>
      <Label>Read only</Label>
      <Radio readOnly> Radio</Radio>
      <Radio checked readOnly>
        Checked Radio
      </Radio>
    </HStack>

    <hr />
    <HStack spacing={20}>
      <Label>Plaintext</Label>
      <Radio plaintext> Radio</Radio>
      <Radio checked plaintext>
        Checked Radio
      </Radio>
    </HStack>
  </>
);

function Label({ children }) {
  return (
    <label
      style={{
        width: 70,
        color: 'var(--rs-text-secondary)'
      }}
    >
      {children}
    </label>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
