<!--start-code-->

```js
const CustomSearchIcon = props => <SvgIcons.Search {...props} />;

const instance = (
  <div>
    <ButtonToolbar>
      <IconButton icon={<StarIcon />} />
      <IconButton icon={<StarIcon />} appearance="primary" />
      <ButtonGroup>
        <IconButton icon={<AlignLeftIcon />} />
        <IconButton icon={<AlignCenterIcon />} />
        <IconButton icon={<AlignRightIcon />} />
        <IconButton icon={<AlignJustifyIcon />} />
      </ButtonGroup>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton size="lg" icon={<StarIcon />} />
      <IconButton size="lg" icon={<Icon as={CustomSearchIcon} />} />
      <IconButton size="md" icon={<StarIcon />} />
      <IconButton size="md" icon={<Icon as={CustomSearchIcon} />} />
      <IconButton size="sm" icon={<StarIcon />} />
      <IconButton size="sm" icon={<Icon as={CustomSearchIcon} />} />
      <IconButton size="xs" icon={<StarIcon />} />
      <IconButton size="xs" icon={<Icon as={CustomSearchIcon} />} />
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<FacebookOfficialIcon />} color="blue" circle />
      <IconButton icon={<GooglePlusCircleIcon />} color="red" circle />
      <IconButton icon={<TwitterIcon />} color="cyan" circle />
      <IconButton icon={<LinkedinIcon />} color="blue" circle />
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<PauseIcon />} placement="left">
        Pause
      </IconButton>
      <IconButton icon={<PlayIcon />} placement="right">
        Next
      </IconButton>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<SearchIcon />}>Component</IconButton>
      <IconButton icon={<AddOutlineIcon />}>Add</IconButton>

      <IconButton icon={<PlusIcon />}>Add</IconButton>
    </ButtonToolbar>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
