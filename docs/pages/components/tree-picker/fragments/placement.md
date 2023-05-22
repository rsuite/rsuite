<!--start-code-->

```js
import { TreePicker } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const CustomTreePicker = ({ placement }) => (
  <TreePicker defaultExpandAll data={data} placement={placement} placeholder={placement} />
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
    <CustomTreePicker placement="autoVerticalStart" />{' '}
    <CustomTreePicker placement="autoVerticalEnd" />
    <hr />
    <CustomTreePicker placement="autoHorizontalStart" />{' '}
    <CustomTreePicker placement="autoHorizontalEnd" />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
