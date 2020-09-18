<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const CascadeDemo = () => {
  const [cascade, setCascade] = useState(false);
  return (
    <div>
      Cascade:{' '}
      <Toggle
        checked={cascade}
        onChange={checked => {
          setCascade(checked);
        }}
      />
      <hr />
      <CheckTree defaultExpandAll cascade={cascade} defaultValue={[2, 38]} data={data} />
    </div>
  );
};

ReactDOM.render(<CascadeDemo />);
```

<!--end-code-->
