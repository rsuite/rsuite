<!--start-code-->

```js
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

const instance = (
  <div>
    <label>Loading: </label>
    <AsyncToggle />
    <AsyncToggle checkedChildren="Enable" unCheckedChildren="Disabled" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
