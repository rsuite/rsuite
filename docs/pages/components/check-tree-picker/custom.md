### 自定义选项

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <CheckTreePicker
    defaultExpandAll
    data={data}
    style={{ width: 280 }}
    placeholder={
      <span>
        <i className="rs-icon rs-icon-map-marker" /> 选择地区
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
            <i className="rs-icon rs-icon-map-marker" /> 地区 :
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
