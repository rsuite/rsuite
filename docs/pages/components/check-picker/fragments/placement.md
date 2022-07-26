<!--start-code-->

```js
import { CheckPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const CustomCheckPicker = ({ placement, ...rest }) => (
  <CheckPicker
    style={{ width: 150 }}
    data={data}
    placement={placement}
    placeholder={placement}
    {...rest}
  />
);

const App = () => (
  <>
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
    <CustomCheckPicker placement="autoVerticalStart" style={{ width: 200 }} />{' '}
    <CustomCheckPicker placement="autoVerticalEnd" style={{ width: 200 }} />
    <hr />
    <CustomCheckPicker placement="autoHorizontalStart" style={{ width: 200 }} />{' '}
    <CustomCheckPicker placement="autoHorizontalEnd" style={{ width: 200 }} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
