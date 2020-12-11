<!--start-code-->

```js
const SearchIcon = props => <SvgIcons.Search {...props} />;

const instance = (
  <div>
    <ButtonToolbar>
      <IconButton icon={<Star />} />
      <IconButton icon={<Star />} appearance="primary" />
      <ButtonGroup>
        <IconButton icon={<AlignLeft />} />
        <IconButton icon={<AlignCenter />} />
        <IconButton icon={<AlignRight />} />
        <IconButton icon={<AlignJustify />} />
      </ButtonGroup>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton size="lg" icon={<Star />} />
      <IconButton size="lg" icon={<Icon as={SearchIcon} />} />
      <IconButton size="md" icon={<Star />} />
      <IconButton size="md" icon={<Icon as={SearchIcon} />} />
      <IconButton size="sm" icon={<Star />} />
      <IconButton size="sm" icon={<Icon as={SearchIcon} />} />
      <IconButton size="xs" icon={<Star />} />
      <IconButton size="xs" icon={<Icon as={SearchIcon} />} />
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<FacebookOfficial />} color="blue" circle />
      <IconButton icon={<GooglePlusCircle />} color="red" circle />
      <IconButton icon={<Twitter />} color="cyan" circle />
      <IconButton icon={<Linkedin />} color="blue" circle />
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<Pause />} placement="left">
        Pause
      </IconButton>
      <IconButton icon={<ArrowRight />} placement="right">
        Next
      </IconButton>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<Search />}>Component</IconButton>
    </ButtonToolbar>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
