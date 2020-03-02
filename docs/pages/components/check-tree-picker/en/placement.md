### Placement

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/en/city-simplified.json
 */

const CustomTreePicker = ({ placement, ...rest }) => (
  <CheckTreePicker
    style={{ width: 150 }}
    defaultExpandAll
    data={data}
    placement={placement}
    placeholder={placement}
    height={320}
    {...rest}
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
    <CustomTreePicker
      placement="autoVerticalStart"
      style={{ width: 200 }}
    />{' '}
    <CustomTreePicker placement="autoVerticalEnd" style={{ width: 200 }} />
    <hr />
    <CustomTreePicker
      placement="autoHorizontalStart"
      style={{ width: 200 }}
    />{' '}
    <CustomTreePicker placement="autoHorizontalEnd" style={{ width: 200 }} />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
