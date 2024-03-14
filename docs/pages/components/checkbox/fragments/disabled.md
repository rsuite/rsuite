<!--start-code-->

```js
import { Checkbox } from 'rsuite';

const App = () => (
  <>
    <Label>Disabled</Label>
    <Checkbox disabled>Default</Checkbox>
    <Checkbox defaultChecked disabled>
      Checked
    </Checkbox>
    <Checkbox indeterminate disabled>
      Indeterminate
    </Checkbox>

    <hr />
    <Label>Read only</Label>
    <Checkbox readOnly>Default</Checkbox>
    <Checkbox defaultChecked readOnly>
      Checked
    </Checkbox>
    <Checkbox indeterminate readOnly>
      Indeterminate
    </Checkbox>
    <hr />
    <Label>Plaintext</Label>
    <Checkbox plaintext>Default</Checkbox>
    <Checkbox defaultChecked plaintext>
      Checked
    </Checkbox>
    <Checkbox indeterminate plaintext>
      Checked
    </Checkbox>
  </>
);

function Label({ children }) {
  return (
    <label
      style={{
        verticalAlign: 'middle',
        display: 'inline-block',
        marginRight: 10,
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
