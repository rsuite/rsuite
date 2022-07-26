<!--start-code-->

```js
import { DatePicker } from 'rsuite';

const CustomDatePicker = ({ placement }) => (
  <DatePicker placement={placement} placeholder={placement} />
);

const App = () => (
  <>
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
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
