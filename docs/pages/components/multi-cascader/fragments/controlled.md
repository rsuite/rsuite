<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const App = () => {
  const [value, setValue] = React.useState(['1-1', '1-2']);

  return <MultiCascader value={value} onChange={setValue} data={data} />;
};

ReactDOM.render(<App />);
```

<!--end-code-->
