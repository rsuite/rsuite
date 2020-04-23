### 彩色按钮

`color` 属性设置按钮样式，选项包括: 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'

<!--start-code-->

```js
const instance = (
  <div>
    <ButtonToolbar>
      <Button color="red">Red</Button>
      <Button color="orange">Orange</Button>
      <Button color="yellow">Yellow</Button>
      <Button color="green">Green</Button>
      <Button color="cyan">Cyan</Button>
      <Button color="blue">Blue</Button>
      <Button color="violet">Violet</Button>
    </ButtonToolbar>

    <ButtonToolbar style={{ background: '#000', padding: 10 }}>
      <Button color="red" appearance="ghost">
        Red
      </Button>
      <Button color="orange" appearance="ghost">
        Orange
      </Button>
      <Button color="yellow" appearance="ghost">
        Yellow
      </Button>
      <Button color="green" appearance="ghost">
        Green
      </Button>
      <Button color="cyan" appearance="ghost">
        Cyan
      </Button>
      <Button color="blue" appearance="ghost">
        Blue
      </Button>
      <Button color="violet" appearance="ghost">
        Violet
      </Button>
    </ButtonToolbar>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
