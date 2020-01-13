### Custom options

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/en/city-simplified.ts
 */

const instance = (
  <CheckTreePicker
    defaultExpandAll
    data={data}
    style={{ width: 280 }}
    placeholder={
      <span>
        <i className="rs-icon rs-icon-map-marker" /> Location
      </span>
    }
    renderTreeNode={nodeData => {
      return (
        <span>
          <i className="rs-icon rs-icon-map-marker" /> {nodeData.label}
        </span>
      );
    }}
    renderValue={(value, checkedItems) => {
      return (
        <span>
          <span style={{ color: '#575757' }}>
            <i className="rs-icon rs-icon-map-marker" /> Location :
          </span>{' '}
          {checkedItems.map(item => item.label).join(' , ')}
        </span>
      );
    }}
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
