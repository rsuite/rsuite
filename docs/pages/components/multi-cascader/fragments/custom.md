<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */
const headers = ['Province', 'City', 'District'];
const instance = (
  <MultiCascader
    data={data}
    block
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
    placeholder={
      <span>
        <TagIcon /> Location
      </span>
    }
    renderValue={(value, selectedItems, selectedElement) => (
      <span>
        <span style={{ color: '#575757' }}>
          <TagIcon /> Location :
        </span>{' '}
        {selectedItems.map(item => item.label).join(' , ')}
      </span>
    )}
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
