### 位置

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const CustomCheckPicker = ({ placement, ...rest }) => (
  <CheckPicker
    style={{ width: 150 }}
    data={data}
    placement={placement}
    placeholder={placement}
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
            <CustomCheckPicker placement="topStart" />
          </td>
          <td>
            <CustomCheckPicker placement="topEnd" />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <CustomCheckPicker placement="leftStart" />
          </td>
          <td />
          <td />
          <td>
            <CustomCheckPicker placement="rightStart" />
          </td>
        </tr>
        <tr>
          <td>
            <CustomCheckPicker placement="leftEnd" />
          </td>
          <td />
          <td />
          <td>
            <CustomCheckPicker placement="rightEnd" />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <CustomCheckPicker placement="bottomStart" />
          </td>
          <td>
            <CustomCheckPicker placement="bottomEnd" />
          </td>
          <td />
        </tr>
      </tbody>
    </table>
    <hr />
    <CustomCheckPicker placement="auto" />
    <hr />
     <CustomCheckPicker placement="autoVerticalStart" style={{ width: 200 }} />
     {' '}
    <CustomCheckPicker
      placement="autoVerticalEnd"
      style={{ width: 200 }}
    />
   
    <hr />
    <CustomCheckPicker
      placement="autoHorizontalStart"
      style={{ width: 200 }}
    />{' '}
    <CustomCheckPicker
      placement="autoHorizontalEnd"
      style={{ width: 200 }}
    />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->

> 提示：设置为 `auto*`时， 尝试滚动页面，或者改变浏览器大小，会自动显示在合适的位置。
