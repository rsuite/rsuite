### Custom options

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const instance = (
  <MultiCascader
    data={data}
    block
    renderMenuItem={(label, item) => {
      return (
        <div>
          <i className="rs-icon rs-icon-circle" /> {label}
        </div>
      );
    }}
    placeholder={
      <span>
        <i className="rs-icon rs-icon-map-marker" /> Location
      </span>
    }
    renderValue={(value, selectedItems, selectedElement) => (
      <span>
        <span style={{ color: '#575757' }}>
          <i className="rs-icon rs-icon-map-marker" /> Location :
        </span>{' '}
        {selectedItems.map(item => item.label).join(' , ')}
      </span>
    )}
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
