<!--start-code-->

```js
const instance = (
  <div>
    <ButtonToolbar>
      <Button>Prev</Button>
      <ButtonGroup>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Button>5</Button>
      </ButtonGroup>
      <Button>Next</Button>
    </ButtonToolbar>
    <ButtonToolbar>
      <IconButton icon={<FileTextIcon />} />
      <IconButton icon={<SaveIcon />} />
      <ButtonGroup>
        <IconButton icon={<BoldIcon />} />
        <IconButton icon={<ItalicIcon />} />
        <IconButton icon={<UnderlineIcon />} />
        <IconButton icon={<StrikethroughIcon />} />
      </ButtonGroup>
      <ButtonGroup>
        <IconButton icon={<AlignLeftIcon />} />
        <IconButton icon={<AlignCenterIcon />} />
        <IconButton icon={<AlignRightIcon />} />
        <IconButton icon={<AlignJustifyIcon />} />
      </ButtonGroup>
      <IconButton icon={<LinkIcon />} />
    </ButtonToolbar>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
