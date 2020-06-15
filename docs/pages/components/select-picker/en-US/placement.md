### Placement

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/users-role.json
 */

const CustomSelectPicker = ({ placement }) => (
  <SelectPicker data={data} placement={placement} placeholder={placement} />
);

const instance = (
  <div>
    <table className="placement-table">
      <tbody>
        <tr>
          <td />
          <td>
            <CustomSelectPicker placement="topStart" />
          </td>
          <td>
            <CustomSelectPicker placement="topEnd" />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <CustomSelectPicker placement="leftStart" />
          </td>
          <td />
          <td />
          <td>
            <CustomSelectPicker placement="rightStart" />
          </td>
        </tr>
        <tr>
          <td>
            <CustomSelectPicker placement="leftEnd" />
          </td>
          <td />
          <td />
          <td>
            <CustomSelectPicker placement="rightEnd" />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <CustomSelectPicker placement="bottomStart" />
          </td>
          <td>
            <CustomSelectPicker placement="bottomEnd" />
          </td>
          <td />
        </tr>
      </tbody>
    </table>
    <hr />
    <CustomSelectPicker placement="auto" />
    <hr />
    <CustomSelectPicker placement="autoVerticalStart" />{' '}
    <CustomSelectPicker placement="autoVerticalEnd" />
    
    <hr />
    <CustomSelectPicker placement="autoHorizontalStart" />{' '}
    <CustomSelectPicker placement="autoHorizontalEnd" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->

> Tip: When set to `auto*`, try to scroll the page, or change the browser size, it will automatically appear in the right place.
