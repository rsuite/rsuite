### 位置

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const CustomTreePicker = ({ placement }) => (
  <TreePicker
    defaultExpandAll
    data={data}
    placement={placement}
    placeholder={placement}
  />
);

const instance = (
  <div>
    <table className="placement-table">
      <tbody>
        <tr>
          <td />
          <td>
            <CustomTreePicker placement="topStart" />
          </td>
          <td>
            <CustomTreePicker placement="topEnd" />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <CustomTreePicker placement="leftStart" />
          </td>
          <td />
          <td />
          <td>
            <CustomTreePicker placement="rightStart" />
          </td>
        </tr>
        <tr>
          <td>
            <CustomTreePicker placement="leftEnd" />
          </td>
          <td />
          <td />
          <td>
            <CustomTreePicker placement="rightEnd" />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <CustomTreePicker placement="bottomStart" />
          </td>
          <td>
            <CustomTreePicker placement="bottomEnd" />
          </td>
          <td />
        </tr>
      </tbody>
    </table>
    <hr />
    <CustomTreePicker placement="auto" />
    <hr />
    <CustomTreePicker placement="autoVerticalStart" />{' '}
    <CustomTreePicker placement="autoVerticalEnd" />

    <hr />
    <CustomTreePicker placement="autoHorizontalStart" />{' '}
    <CustomTreePicker placement="autoHorizontalEnd" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
