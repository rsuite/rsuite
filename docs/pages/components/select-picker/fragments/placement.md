<!--start-code-->

```js
import { SelectPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const CustomSelectPicker = ({ placement }) => (
  <SelectPicker data={data} placement={placement} placeholder={placement} />
);

const App = () => (
  <>
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
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
