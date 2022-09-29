### 自定义页脚

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <TreePicker
    virtualized
    defaultExpandAll
    data={data}
    style={{ width: 280 }}
    renderExtraFooter={() => (
      <div
        style={{
          padding: 10,
          borderTop: '1px solid #e5e5e5'
        }}
      >
        Extra footer
      </div>
    )}
  />
);
ReactDOM.render(instance);
```

<!--end-code-->
