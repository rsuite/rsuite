<!--start-code-->

```js
const instance = (
  <ButtonToolbar>
    <Button appearance="default" disabled>
      Default
    </Button>
    <Button appearance="primary" disabled>
      Primary
    </Button>
    <Button appearance="link" disabled href="https://rsuitejs.com">
      Link
    </Button>
    <Button appearance="subtle" disabled>
      Subtle
    </Button>
    <Button appearance="ghost" disabled>
      Ghost
    </Button>
    <IconButton icon={<StarIcon />} disabled>
      Icon Button
    </IconButton>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
