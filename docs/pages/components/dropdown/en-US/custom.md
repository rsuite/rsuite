### Custom

<!--start-code-->

```js
const instance = (
  <ButtonToolbar>
    <Dropdown title="More...">
      <Dropdown.Item>
        <Icon icon="edit2" /> Edit
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon icon="eye" /> View
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon icon="trash" /> Delete
      </Dropdown.Item>
    </Dropdown>

    <Dropdown
      title="New"
      renderTitle={children => {
        return <Button appearance="primary">{children} </Button>;
      }}
    >
      <Dropdown.Item>
        <Icon icon="user" /> New User
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon icon="group" /> New Group
      </Dropdown.Item>
    </Dropdown>
    <Dropdown
      renderTitle={() => {
        return <IconButton appearance="primary" icon={<Icon icon="plus" />} circle />;
      }}
    >
      <Dropdown.Item>
        <Icon icon="user" /> New User
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon icon="group" /> New Group
      </Dropdown.Item>
    </Dropdown>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
