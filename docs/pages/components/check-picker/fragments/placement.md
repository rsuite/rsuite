<!--start-code-->

```js
import { CheckPicker, HStack } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const CustomCheckPicker = ({ placement, ...rest }) => (
  <CheckPicker w={200} data={data} placement={placement} placeholder={placement} {...rest} />
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
    <HStack>
      <CustomCheckPicker placement="autoVerticalStart" w={200} />
      <CustomCheckPicker placement="autoVerticalEnd" w={200} />
    </HStack>
    <hr />
    <HStack>
      <CustomCheckPicker placement="autoHorizontalStart" w={200} />
      <CustomCheckPicker placement="autoHorizontalEnd" w={200} />
    </HStack>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
