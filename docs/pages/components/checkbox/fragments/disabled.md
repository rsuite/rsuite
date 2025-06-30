<!--start-code-->

```js
import { Checkbox, HStack } from 'rsuite';

const App = () => (
  <>
    <HStack spacing={20}>
      <Label>Disabled</Label>
      <Checkbox disabled>Default</Checkbox>
      <Checkbox defaultChecked disabled>
        Checked
      </Checkbox>
      <Checkbox indeterminate disabled>
        Indeterminate
      </Checkbox>
    </HStack>

    <hr />
    <HStack spacing={20}>
      <Label>Read only</Label>
      <Checkbox readOnly>Default</Checkbox>
      <Checkbox defaultChecked readOnly>
        Checked
      </Checkbox>
      <Checkbox indeterminate readOnly>
        Indeterminate
      </Checkbox>
    </HStack>
    <hr />

    <HStack spacing={20}>
      <Label>Plaintext</Label>
      <Checkbox plaintext>Default</Checkbox>
      <Checkbox defaultChecked plaintext>
        Checked
      </Checkbox>
      <Checkbox indeterminate plaintext>
        Indeterminate
      </Checkbox>
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
