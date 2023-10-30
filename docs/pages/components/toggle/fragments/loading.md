<!--start-code-->

```js
import { Toggle, Checkbox, RadioGroup, Form } from 'rsuite';

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
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: 300,
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Toggle
            loading
            checked={checked}
            checkedChildren={withText ? 'Enabled' : undefined}
            unCheckedChildren={withText ? 'Disabled' : undefined}
            size={size}
          />
        </div>
        <div style={{ borderLeft: '1px solid var(--rs-border-primary)', padding: '0 20px' }}>
          <Form>
            <Form.Group>
              <Form.ControlLabel>
                <Toggle checked={checked} onChange={setChecked} />
                Checked
              </Form.ControlLabel>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>
                <Toggle checked={withText} onChange={setWithText} />
                With text
              </Form.ControlLabel>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Size</Form.ControlLabel>
              <RadioGroup value={size} onChange={setSize} inline>
                <Radio value="sm">sm</Radio>
                <Radio value="md">md</Radio>
                <Radio value="lg">lg</Radio>
              </RadioGroup>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
