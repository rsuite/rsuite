<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const App = () => {
  const [value, setValue] = React.useState('1-2-2');

  return <Cascader value={value} onChange={setValue} data={data} style={{ width: 224 }} />;
};

ReactDOM.render(<App />);
```

<!--end-code-->
