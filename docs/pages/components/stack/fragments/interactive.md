<!--start-code-->

```js
import { Stack, Button, Panel, RadioGroup, Radio, SelectPicker } from 'rsuite';

// 6, 12, 18, 24, 30
const spacingArray = Array.from({ length: 5 }, (_, i) => {
  const value = (i + 1) * 6;
  return { label: `${value}px`, value };
});

const App = () => {
  const [direction, setDirection] = React.useState('row');
  const [justifyContent, setJustifyContent] = React.useState('flex-start');
  const [alignItems, setAlignItems] = React.useState('flex-start');
  const [spacing, setSpacing] = React.useState(6);

  return (
    <Stack divider={<Divider vertical />} style={{ height: 300 }}>
      <Stack
        spacing={spacing}
        direction={direction}
        alignItems={alignItems}
        justifyContent={justifyContent}
        style={{ width: 400 }}
      >
        <Button size="lg">Item 1</Button>
        <Button size="md">Item 2</Button>
        <Button size="sm">Item 3</Button>
        <Button size="xs">Item 4</Button>
      </Stack>

      <Panel>
        <Stack direction="column" spacing={12} alignItems="flex-start">
          <SelectPicker
            label="spacing"
            searchable={false}
            cleanable={false}
            value={spacing}
            data={spacingArray}
            onChange={setSpacing}
          />

          <RadioGroup inline value={direction} onChange={setDirection} appearance="picker">
            <RadioLabel>direction:</RadioLabel>
            <Radio value="row">row</Radio>
            <Radio value="row-reverse">row-reverse</Radio>
            <Radio value="column">column</Radio>
            <Radio value="column-reverse">column-reverse</Radio>
          </RadioGroup>

          <RadioGroup inline value={alignItems} onChange={setAlignItems} appearance="picker">
            <RadioLabel>alignItems:</RadioLabel>
            <Radio value="flex-start">flex-start</Radio>
            <Radio value="center">center</Radio>
            <Radio value="flex-end">flex-end</Radio>
            <Radio value="stretch">stretch</Radio>
            <Radio value="baseline">baseline</Radio>
          </RadioGroup>

          <RadioGroup
            inline
            value={justifyContent}
            onChange={setJustifyContent}
            appearance="picker"
          >
            <RadioLabel>justifyContent:</RadioLabel>
            <Radio value="flex-start">flex-start</Radio>
            <Radio value="center">center</Radio>
            <Radio value="flex-end">flex-end</Radio>
            <Radio value="space-between">space-between</Radio>
            <Radio value="space-around">space-around</Radio>
          </RadioGroup>
        </Stack>
      </Panel>
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;
```

<!--end-code-->
