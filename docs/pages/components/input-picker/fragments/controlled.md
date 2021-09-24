<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const App = () => {
  const [value, setValue] = React.useState(null);
  return <InputPicker value={value} onChange={setValue} data={data} style={{ width: 224 }} />;
};

ReactDOM.render(<App />);
```

<!--end-code-->
