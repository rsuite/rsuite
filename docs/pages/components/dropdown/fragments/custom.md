<!--start-code-->

```js
const instance = (
  <ButtonToolbar>
    <Dropdown title="More...">
      <Dropdown.Item>
        <Edit2 /> Edit
      </Dropdown.Item>
      <Dropdown.Item>
        <Eye /> View
      </Dropdown.Item>
      <Dropdown.Item>
        <Trash /> Delete
      </Dropdown.Item>
    </Dropdown>

    <Dropdown
      title="New"
      renderTitle={(children) => {
        return <Button appearance="primary">{children} </Button>;
      }}
    >
      <Dropdown.Item>
        <User /> New User
      </Dropdown.Item>
      <Dropdown.Item>
        <Group /> New Group
      </Dropdown.Item>
    </Dropdown>
    <Dropdown
      renderTitle={() => {
        return <IconButton appearance="primary" icon={<Plus />} circle />;
      }}
    >
      <Dropdown.Item>
        <User /> New User
      </Dropdown.Item>
      <Dropdown.Item>
        <Group /> New Group
      </Dropdown.Item>
    </Dropdown>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
