### 不可选状态

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const instance = (
  <div>
    <MultiCascader
      data={data}
      block
      renderValue={(value, selectedItems) =>
        selectedItems.map(item => item.label).join(' , ')
      }
      uncheckableItemValues={['1', '2', '2-1']}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
