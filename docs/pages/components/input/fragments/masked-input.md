<!--start-code-->

```js
import { FlexboxGrid, SelectPicker, Toggle, MaskedInput, HStack, VStack, Divider } from 'rsuite';

const options = [
  {
    name: 'Date',
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    placeholder: '25/09/1970'
  },
  {
    name: 'Date with time',
    mask: [
      /\d/,
      /\d/,
      '/',
      /\d/,
      /\d/,
      '/',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      ':',
      /\d/,
      /\d/,
      ' ',
      /a|p/,
      /m/
    ],
    placeholder: '25/09/1970 12:00 pm'
  },
  {
    name: 'CN phone number',
    mask: ['1', /[3456789]/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
    placeholder: '138 1234 1234'
  },
  {
    name: 'US phone number',
    mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    placeholder: '(555) 495-3947'
  },
  {
    name: 'Credit Card',
    mask: [
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/
    ],
    placeholder: '4242 4242 4242 4242'
  }
];

const placeholderChars = [
  {
    label: '\\u2000 (white space)',
    value: '\u2000'
  },
  {
    label: '_ (underscore)',
    value: '_'
  }
];

const ControlRow = ({ label, control, ...rest }) => (
  <HStack {...rest} alignItems="center">
    <span style={{ width: 180 }}>{label}: </span>
    {control}
  </HStack>
);

const App = () => {
  const [option, setOption] = React.useState(options[0]);
  const [value, setValue] = React.useState('');
  const [guide, setGuide] = React.useState(true);
  const [keepCharPositions, setKeepCharPositions] = React.useState(true);
  const [placeholderChar, setPlaceholderChar] = React.useState('_');
  const [showMask, setShowMask] = React.useState(false);

  return (
    <HStack wrap divider={<Divider vertical />} spacing={10} style={{ height: 200 }}>
      <MaskedInput
        value={value}
        mask={option.mask}
        guide={guide}
        showMask={showMask}
        keepCharPositions={keepCharPositions}
        placeholder={option.placeholder}
        placeholderChar={placeholderChar}
        w={300}
        onChange={setValue}
      />
      <VStack spacing={10}>
        <ControlRow
          label="Mask"
          control={
            <SelectPicker
              defaultValue={option.name}
              cleanable={false}
              searchable={false}
              data={options}
              labelKey="name"
              valueKey="name"
              size="sm"
              onSelect={(_v, item) => {
                setOption(item);
                setValue('');
              }}
              w={180}
            />
          }
        />
        <ControlRow
          label="Placeholder character"
          control={
            <SelectPicker
              value={placeholderChar}
              cleanable={false}
              searchable={false}
              size="sm"
              data={placeholderChars}
              onChange={setPlaceholderChar}
              w={180}
            />
          }
        />

        <ControlRow label="Guide" control={<Toggle checked={guide} onChange={setGuide} />} />

        <ControlRow
          label="Keep character positions"
          control={<Toggle checked={keepCharPositions} onChange={setKeepCharPositions} />}
        />

        <ControlRow
          label="Show mask"
          control={
            <Toggle
              checked={showMask}
              onChange={() => {
                setShowMask(!showMask);
                setValue('');
              }}
            />
          }
        />
      </VStack>
    </HStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
