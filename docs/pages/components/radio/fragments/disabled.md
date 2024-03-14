<!--start-code-->

```js
import { Radio } from 'rsuite';

const App = () => (
  <>
    <Label>Disabled</Label>
    <Radio disabled> Radio</Radio>
    <Radio checked disabled>
      Checked Radio
    </Radio>

    <hr />
    <Label>Read only</Label>
    <Radio readOnly> Radio</Radio>
    <Radio checked readOnly>
      Checked Radio
    </Radio>

    <hr />
    <Label>Plaintext</Label>
    <Radio plaintext> Radio</Radio>
    <Radio checked plaintext>
      Checked Radio
    </Radio>
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
