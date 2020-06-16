### Used with Buttons

<!--start-code-->

```js
const instance = (
  <ButtonToolbar>
    <Dropdown title="Save" toggleComponentClass={Button} appearance="default">
      <Dropdown.Item>Save as...</Dropdown.Item>
      <Dropdown.Item>Save & New</Dropdown.Item>
    </Dropdown>

    <ButtonGroup>
      <Button>Save</Button>
      <Dropdown
        placement="bottomEnd"
        renderTitle={() => {
          return <IconButton icon={<Icon icon="angle-double-down" />} />;
        }}
      >
        <Dropdown.Item icon={<Icon icon="save" />}>Save as...</Dropdown.Item>
        <Dropdown.Item icon={<Icon icon="save" />}>Save & New</Dropdown.Item>
      </Dropdown>
    </ButtonGroup>

    <Dropdown
      renderTitle={() => {
        return (
          <IconButton icon={<Icon icon="plus" />} placement="left">
            {' '}
            New
          </IconButton>
        );
      }}
    >
      <Dropdown.Item icon={<Icon icon="user" />}>New User</Dropdown.Item>
      <Dropdown.Item icon={<Icon icon="group" />}>New Group</Dropdown.Item>
      <Dropdown.Menu icon={<Icon icon="group" />} title="More">
        <Dropdown.Item icon={<Icon icon="user" />}>New User</Dropdown.Item>
        <Dropdown.Item icon={<Icon icon="group" />}>New Group</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
