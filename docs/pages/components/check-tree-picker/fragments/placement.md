<!--start-code-->

```js
import { CheckTreePicker } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

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

const App = () => (
  <>
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
    <CustomTreePicker placement="autoVerticalStart" style={{ width: 200 }} />{' '}
    <CustomTreePicker placement="autoVerticalEnd" style={{ width: 200 }} />
    <hr />
    <CustomTreePicker placement="autoHorizontalStart" style={{ width: 200 }} />{' '}
    <CustomTreePicker placement="autoHorizontalEnd" style={{ width: 200 }} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
