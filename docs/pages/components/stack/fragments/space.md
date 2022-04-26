<!--start-code-->

```js
const App = () => {
  const [size, setSize] = React.useState(6);

  return (
    <Stack direction="column" spacing={20} alignItems="flex-start">
      <Stack spacing={12}>
        Spacing:
        <Slider style={{ width: 300 }} onChange={value => setSize(value)} />
      </Stack>
      <Stack spacing={size}>
        Label:
        <Input />
        <Button appearance="primary">Submit</Button>
        <Button>Reset</Button>
      </Stack>
    </Stack>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
