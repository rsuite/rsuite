<!--start-code-->

```js
import { Stack, HStack, VStack, Button, RadioGroup, Radio, SelectPicker } from 'rsuite';

// 6, 12, 18, 24, 30
const spacingArray = Array.from({ length: 5 }, (_, i) => {
  const value = (i + 1) * 6;
  return { label: `${value}px`, value };
});

const App = () => {
  const [direction, setDirection] = React.useState('row');
  const [justify, setJustify] = React.useState('flex-start');
  const [align, setAlign] = React.useState('flex-start');
  const [spacing, setSpacing] = React.useState(6);

  return (
    <HStack wrap spacing={20} align="start">
      <Stack
        spacing={spacing}
        direction={direction}
        align={align}
        justify={justify}
        bg="var(--rs-placeholder)"
        p={20}
        rounded="lg"
        w={400}
        h={300}
      >
        <Button size="lg" appearance="ghost">
          Large
        </Button>
        <Button size="md" appearance="ghost">
          Medium
        </Button>
        <Button size="sm" appearance="ghost">
          Small
        </Button>
        <Button size="xs" appearance="ghost">
          Xsmall
        </Button>
      </Stack>

      <VStack spacing={12}>
        <SelectPicker
          label="spacing"
          searchable={false}
          cleanable={false}
          value={spacing}
          data={spacingArray}
          onChange={setSpacing}
        />

        <SelectPicker
          label="direction"
          searchable={false}
          cleanable={false}
          value={direction}
          data={[
            { value: 'row', label: 'row' },
            { value: 'row-reverse', label: 'row-reverse' },
            { value: 'column', label: 'column' },
            { value: 'column-reverse', label: 'column-reverse' }
          ]}
          onChange={setDirection}
        />

        <SelectPicker
          label="align"
          searchable={false}
          cleanable={false}
          value={align}
          data={[
            { value: 'flex-start', label: 'flex-start' },
            { value: 'center', label: 'center' },
            { value: 'flex-end', label: 'flex-end' },
            { value: 'stretch', label: 'stretch' },
            { value: 'baseline', label: 'baseline' }
          ]}
          onChange={setAlign}
        />

        <SelectPicker
          label="justify"
          searchable={false}
          cleanable={false}
          value={justify}
          data={[
            { value: 'flex-start', label: 'flex-start' },
            { value: 'center', label: 'center' },
            { value: 'flex-end', label: 'flex-end' },
            { value: 'space-between', label: 'space-between' },
            { value: 'space-around', label: 'space-around' }
          ]}
          onChange={setJustify}
        />
      </VStack>
    </HStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
