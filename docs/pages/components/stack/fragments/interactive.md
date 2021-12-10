<!--start-code-->

```js
const App = () => {
  const [alignItems, setAlignItems] = React.useState('center');
  const [justifyContent, setJustifyContent] = React.useState('center');
  const [direction, setDirection] = React.useState('row');

  return (
    <div>
      <Stack
        spacing={6}
        direction={direction}
        alignItems={alignItems}
        justifyContent={justifyContent}
      >
        <Button>Item 1</Button>
        <Button>Item 2</Button>
        <Button>Item 3</Button>
        <Button>Item 4</Button>
        <Button>Item 5</Button>
      </Stack>
      <hr />

      <Panel>
        <Stack>
          <label>direction:</label>
          <RadioGroup inline value={direction} onChange={setDirection}>
            <Radio value="row">row</Radio>
            <Radio value="row-reverse">row-reverse</Radio>
            <Radio value="column">column</Radio>
            <Radio value="column-reverse">column-reverse</Radio>
          </RadioGroup>
        </Stack>

        <Stack>
          <label>justifyContent:</label>
          <RadioGroup inline value={justifyContent} onChange={setJustifyContent}>
            <Radio value="flex-start">flex-start</Radio>
            <Radio value="center">center</Radio>
            <Radio value="flex-end">flex-end</Radio>
            <Radio value="space-between">space-between</Radio>
            <Radio value="space-around">space-around</Radio>
          </RadioGroup>
        </Stack>
        <Stack>
          <label>alignItems:</label>
          <RadioGroup inline value={alignItems} onChange={setAlignItems}>
            <Radio value="flex-start">flex-start</Radio>
            <Radio value="center">center</Radio>
            <Radio value="flex-end">flex-end</Radio>
            <Radio value="stretch">stretch</Radio>
            <Radio value="baseline">baseline</Radio>
          </RadioGroup>
        </Stack>
      </Panel>
    </div>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
