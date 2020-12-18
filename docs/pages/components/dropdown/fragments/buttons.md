<!--start-code-->

```js
const instance = (
  <ButtonToolbar>
    <Dropdown title="Save" toggleAs={Button} appearance="default">
      <Dropdown.Item>Save as...</Dropdown.Item>
      <Dropdown.Item>Save & New</Dropdown.Item>
    </Dropdown>

    <ButtonGroup>
      <Button>Save</Button>
      <Dropdown placement="bottomEnd" renderTitle={() => <IconButton icon={<AngleDoubleDown />} />}>
        <Dropdown.Item icon={<Save />}>Save as...</Dropdown.Item>
        <Dropdown.Item icon={<Save />}>Save & New</Dropdown.Item>
      </Dropdown>
    </ButtonGroup>

    <Dropdown
      renderTitle={() => {
        return (
          <IconButton icon={<Plus />} placement="left">
            New
          </IconButton>
        );
      }}
    >
      <Dropdown.Item icon={<User />}>New User</Dropdown.Item>
      <Dropdown.Item icon={<Group />}>New Group</Dropdown.Item>
      <Dropdown.Menu icon={<Group />} title="More">
        <Dropdown.Item icon={<User />}>New User</Dropdown.Item>
        <Dropdown.Item icon={<Group />}>New Group</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
