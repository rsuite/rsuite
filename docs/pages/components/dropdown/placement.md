### 菜单位置

<!--start-code-->
```js

const items=[
  <Dropdown.Item key={1}>New File</Dropdown.Item>,
  <Dropdown.Item key={2}>New File with Current Profile</Dropdown.Item>,
  <Dropdown.Item key={3}>Download As...</Dropdown.Item>,
  <Dropdown.Item key={4}>Export PDF</Dropdown.Item>,
  <Dropdown.Item key={5}>Export HTML</Dropdown.Item>,
  <Dropdown.Item key={6}>Settings</Dropdown.Item>,
  <Dropdown.Item key={7}>About</Dropdown.Item>,
];

const instance = (
  <table className="placement-table">
    <tbody>
      <tr>
        <td></td>
        <td>
          <Dropdown title="topStart" placement="topStart">
            {items}
          </Dropdown>
        </td>
        <td>
          <Dropdown title="topEnd" placement="topEnd">
            {items}
          </Dropdown>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <Dropdown title="leftStart" placement="leftStart">
            {items}
          </Dropdown>
        </td>
        <td></td>
        <td></td>
        <td>
          <Dropdown title="rightStart" placement="rightStart">
            {items}
          </Dropdown>
        </td>
      </tr>
      <tr>
        <td>

          <Dropdown title="leftEnd" placement="leftEnd">
            {items}
          </Dropdown>
        </td>
        <td></td>
        <td></td>
        <td>
          <Dropdown title="rightEnd" placement="rightEnd">
            {items}
          </Dropdown>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <Dropdown title="bottomStart" placement="bottomStart">
            {items}
          </Dropdown>
        </td>
        <td>

          <Dropdown title="bottomEnd" placement="bottomEnd">
            {items}
          </Dropdown>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>

);
ReactDOM.render(instance);
```
<!--end-code-->