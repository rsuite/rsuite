### Button Toolbar

<!--start-code-->
```js
const instance = (
  <div>
    <ButtonToolbar>
      <Button>Prev</Button>
      <ButtonGroup >
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Button>5</Button>
      </ButtonGroup>
      <Button>Next</Button>
    </ButtonToolbar>
    <ButtonToolbar>
      <IconButton icon={ <Icon icon="file-text"/> }   />
      <IconButton icon={ <Icon icon="save"/> }  />
      <ButtonGroup>
        <IconButton icon={ <Icon icon="bold"/> }  />
        <IconButton icon={ <Icon icon="italic"/> } />
        <IconButton icon={ <Icon icon="underline"/> } />
        <IconButton icon={ <Icon icon="strikethrough"/> } />
      </ButtonGroup>
      <ButtonGroup>
        <IconButton icon={ <Icon icon="align-left"/> }  />
        <IconButton icon={ <Icon icon="align-center"/> } />
        <IconButton icon={ <Icon icon="align-right"/> } />
        <IconButton icon={ <Icon icon="align-justify"/> } />
      </ButtonGroup>
      <IconButton icon={ <Icon icon="link" /> }  />
    </ButtonToolbar>
  </div>
);

ReactDOM.render(instance);
```
<!--end-code-->