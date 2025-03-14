<!--start-code-->

```js
import { Row, Col, Divider, Center } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="gray.100" p={20} my={6} rounded="lg" color="gray.500" {...rest}>
    {children}
  </Center>
);

const App = () => {
  const [align, setAlign] = React.useState('top');
  const [justify, setJustify] = React.useState('start');

  return (
    <>
      <VStack>
        <RadioGroup name="justify" appearance="picker" inline value={justify} onChange={setJustify}>
          <label>justify: </label>
          <Radio value="start">start</Radio>
          <Radio value="center">center</Radio>
          <Radio value="end">end</Radio>
          <Radio value="space-around">space-around</Radio>
          <Radio value="space-between">space-between</Radio>
        </RadioGroup>
        <RadioGroup name="align" appearance="picker" inline value={align} onChange={setAlign}>
          <label>align: </label>
          <Radio value="top">top</Radio>
          <Radio value="middle">middle</Radio>
          <Radio value="bottom">bottom</Radio>
        </RadioGroup>
      </VStack>
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
