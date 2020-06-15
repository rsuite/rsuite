### Custom options

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const instance = (
  <Cascader
    data={data}
    style={{ widht: 224 }}
    renderMenuItem={(label, item) => {
      return (
        <div>
          <i className="rs-icon rs-icon-circle" /> {label}
        </div>
      );
    }}
    renderValue={(value, activePaths, activeItemLabel) => {
      return activePaths.map(item => item.label).join(' > ');
    }}
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
