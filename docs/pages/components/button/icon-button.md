### 图标按钮

`<IconButton>` 是专为图标按钮设计的组件，设置`icon`属性定义所需要的图标。 只有图标按钮可以设置为一个圆形按钮。

<!--start-code-->

```js
const instance = (
  <div>
    <ButtonToolbar>
      <IconButton icon={<Icon icon="star" />} />
      <IconButton icon={<Icon icon="star" />} appearance="primary" />
      <ButtonGroup>
        <IconButton icon={<Icon icon="align-left" />} />
        <IconButton icon={<Icon icon="align-center" />} />
        <IconButton icon={<Icon icon="align-right" />} />
        <IconButton icon={<Icon icon="align-justify" />} />
      </ButtonGroup>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton size="lg" icon={<Icon icon="star" />} />
      <IconButton size="lg" icon={<Icon icon={SvgIcons.Search} />} />
      <IconButton size="md" icon={<Icon icon="star" />} />
      <IconButton size="md" icon={<Icon icon={SvgIcons.Search} />} />
      <IconButton size="sm" icon={<Icon icon="star" />} />
      <IconButton size="sm" icon={<Icon icon={SvgIcons.Search} />} />
      <IconButton size="xs" icon={<Icon icon="star" />} />
      <IconButton size="xs" icon={<Icon icon={SvgIcons.Search} />} />
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<Icon icon="facebook-official" />} color="blue" circle />
      <IconButton icon={<Icon icon="google-plus-circle" />} color="red" circle />
      <IconButton icon={<Icon icon="twitter" />} color="cyan" circle />
      <IconButton icon={<Icon icon="linkedin" />} color="blue" circle />
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<Icon icon="pause" />} placement="left">
        Pause
      </IconButton>
      <IconButton icon={<Icon icon="arrow-right" />} placement="right">
        Next
      </IconButton>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<Icon icon="search" />}>Component</IconButton>
    </ButtonToolbar>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
