<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const headers = ['Province', 'City', 'District'];
const instance = (
  <Cascader
    data={data}
    style={{ width: 224 }}
    menuWidth={220}
    renderMenuItem={(label, item) => {
      return (
        <div>
          <TagIcon /> {label}
        </div>
      );
    }}
    renderMenu={(children, menu, parentNode, layer) => {
      return (
        <div>
          <div
            style={{
              background: '#154c94',
              padding: '4px 10px',
              color: ' #fff',
              textAlign: 'center'
            }}
          >
            {headers[layer]}
          </div>
          {menu}
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
