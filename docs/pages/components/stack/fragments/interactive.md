<!--start-code-->

```js
import { Stack, Button, Panel, RadioGroup, Radio } from 'rsuite';

const App = () => {
  const [direction, setDirection] = React.useState('row');
  const [justifyContent, setJustifyContent] = React.useState('flex-start');
  const [alignItems, setAlignItems] = React.useState('flex-start');

  return (
    <>
      <Stack
        spacing={6}
        direction={direction}
        alignItems={alignItems}
        justifyContent={justifyContent}
      >
        <Button size="lg">Item 1</Button>
        <Button size="md">Item 2</Button>
        <Button size="sm">Item 3</Button>
        <Button size="xs">Item 4</Button>
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
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
