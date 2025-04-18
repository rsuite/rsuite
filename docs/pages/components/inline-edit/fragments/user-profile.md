<!--start-code-->

```js
import {
  InlineEdit,
  InputPicker,
  Input,
  DatePicker,
  Form,
  Panel,
  NumberInput,
  Slider,
  Cascader,
  Box,
  Textarea
} from 'rsuite';

const skills = ['React', 'Vue', 'Angular', 'Node.js', 'Webpack', 'Babel', 'TypeScript', 'RxJS'].map(
  item => ({ label: item, value: item })
);

const Field = ({ label, as: Component, defaultValue, ...rest }) => {
  return (
    <Stack direction="row">
      <Box w={120} display="inline-block" c="var(--rs-text-secondary)">
        {label}
      </Box>
      <InlineEdit placeholder="Click to edit ..." defaultValue={defaultValue}>
        <Component w={300} {...rest} />
      </InlineEdit>
    </Stack>
  );
};

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={10}>
    <Field label="Name" as={Input} defaultValue="Foobar" />
    <Field label="Bio" as={TextArea} defaultValue="I'm a software engineer." row={5} />
    <Field
      label="Date of Birth"
      as={DatePicker}
      defaultValue={new Date('1988-08-08')}
      format="MMMM dd, yyyy"
    />
    <Field
      label="Skills"
      as={TagPicker}
      data={skills}
      defaultValue={['React', 'TypeScript', 'Node.js']}
    />
    <Field label="Skill Level" as={Slider} defaultValue={50} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
