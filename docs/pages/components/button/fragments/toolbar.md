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
      <IconButton icon={<FileText />} />
      <IconButton icon={<Save />} />
      <ButtonGroup>
        <IconButton icon={<Bold />} />
        <IconButton icon={<Italic />} />
        <IconButton icon={<Underline />} />
        <IconButton icon={<Strikethrough />} />
      </ButtonGroup>
      <ButtonGroup>
        <IconButton icon={<AlignLeft />} />
        <IconButton icon={<AlignCenter />} />
        <IconButton icon={<AlignRight />} />
        <IconButton icon={<AlignJustify />} />
      </ButtonGroup>
      <IconButton icon={<Link />} />
    </ButtonToolbar>
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
