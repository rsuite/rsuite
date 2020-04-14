### 位置

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/province-simplified.json
 */

const CustomCascader = ({ placement }) => (
  <Cascader data={data} placement={placement} placeholder={placement} />
);

const instance = (
  <div>
    <CustomCascader placement="topStart" />{' '}
    <CustomCascader placement="bottomStart" />{' '}
    <CustomCascader placement="autoVerticalStart" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
