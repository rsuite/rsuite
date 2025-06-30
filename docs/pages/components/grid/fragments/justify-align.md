<!--start-code-->

```js
import { Row, Col, Center, HStack, SelectPicker } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="var(--rs-placeholder)" p={20} my={6} rounded="lg" {...rest}>
    {children}
  </Center>
);

const App = () => {
  const [align, setAlign] = React.useState('top');
  const [justify, setJustify] = React.useState('start');

  return (
    <>
      <HStack wrap>
        <SelectPicker
          data={[
            { value: 'start', label: 'start' },
            { value: 'center', label: 'center' },
            { value: 'end', label: 'end' },
            { value: 'space-around', label: 'space-around' },
            { value: 'space-between', label: 'space-between' }
          ]}
          label="justify"
          searchable={false}
          cleanable={false}
          value={justify}
          onChange={setJustify}
        />
        <SelectPicker
          data={[
            { value: 'top', label: 'top' },
            { value: 'middle', label: 'middle' },
            { value: 'bottom', label: 'bottom' }
          ]}
          label="align"
          searchable={false}
          cleanable={false}
          value={align}
          onChange={setAlign}
        />
      </HStack>
      <hr />
      <Row align={align} justify={justify}>
        <Col xs={6}>
          <DecorativeBox h={60}>1</DecorativeBox>
        </Col>
        <Col xs={6}>
          <DecorativeBox h={80}>2</DecorativeBox>
        </Col>
        <Col xs={6}>
          <DecorativeBox h={100}>3</DecorativeBox>
        </Col>
      </Row>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
