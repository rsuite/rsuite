### 位置

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite.github.io/blob/master/src/resources/data/province-simplified.js
 */

const CustomMultiCascader = ({ placement }) => (
  <MultiCascader data={data} placement={placement} placeholder={placement} />
);

const instance = (
  <div>
    <CustomMultiCascader placement="topStart" />{' '}
    <CustomMultiCascader placement="bottomStart" />{' '}
    <CustomMultiCascader placement="autoVerticalStart" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
