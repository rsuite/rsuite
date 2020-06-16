### Placement

<!--start-code-->

```js
const CustomDatePicker = ({ placement }) => (
  <DatePicker placement={placement} placeholder={placement} />
);

const instance = (
  <div>
    <table className="placement-table">
      <tbody>
        <tr>
          <td />
          <td>
            <CustomDatePicker placement="topStart" />
          </td>
          <td>
            <CustomDatePicker placement="topEnd" />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <CustomDatePicker placement="leftStart" />
          </td>
          <td />
          <td />
          <td>
            <CustomDatePicker placement="rightStart" />
          </td>
        </tr>
        <tr>
          <td>
            <CustomDatePicker placement="leftEnd" />
          </td>
          <td />
          <td />
          <td>
            <CustomDatePicker placement="rightEnd" />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <CustomDatePicker placement="bottomStart" />
          </td>
          <td>
            <CustomDatePicker placement="bottomEnd" />
          </td>
          <td />
        </tr>
      </tbody>
    </table>
    <hr />
    <CustomDatePicker placement="auto" />
    <hr />
    <CustomDatePicker placement="autoVerticalStart" />{' '}
    <CustomDatePicker placement="autoVerticalEnd" />
    
    <hr />
    <CustomDatePicker placement="autoHorizontalStart" />{' '}
    <CustomDatePicker placement="autoHorizontalEnd" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->

> Tip: When set to `auto*`, try to scroll the page, or change the browser size, it will automatically appear in the right place.
