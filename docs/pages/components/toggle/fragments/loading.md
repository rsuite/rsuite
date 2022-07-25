<!--start-code-->

```js
import { Toggle } from 'rsuite';

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

const App = () => (
  <>
    <label>Loading: </label>
    <AsyncToggle />
    <AsyncToggle checkedChildren="Enable" unCheckedChildren="Disabled" />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
