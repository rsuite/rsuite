### 按钮尺寸

`size` 属性设置按钮尺寸, 选项包括:'lg', 'md', 'sm', 'xs'

<!--start-code-->

```js
const instance = (
  <div>
    <ButtonToolbar>
      <Button size="lg">Large</Button>
      <Button size="md">Medium</Button>
      <Button size="sm">Small</Button>
      <Button size="xs">Xsmall</Button>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<Icon icon="star" />} circle size="lg" />
      <IconButton icon={<Icon icon="star" />} circle size="md" />
      <IconButton icon={<Icon icon="star" />} circle size="sm" />
      <IconButton icon={<Icon icon="star" />} circle size="xs" />
    </ButtonToolbar>

    <ButtonToolbar>
      <ButtonGroup size="lg">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>

      <ButtonGroup size="md">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>

      <ButtonGroup size="sm">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>

      <ButtonGroup size="xs">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </ButtonToolbar>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
