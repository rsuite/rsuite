<!--start-code-->

```js
import { Row, Col, Center } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="gray.100" p={20} my={6} rounded="lg" color="gray.500" {...rest}>
    {children}
  </Center>
);

const App = () => (
  <Row>
    <Col span={6}>
      <DecorativeBox>6</DecorativeBox>
    </Col>
    <Col span={6}>
      <DecorativeBox>6</DecorativeBox>
    </Col>
    <Col span={6}>
      <DecorativeBox>6</DecorativeBox>
    </Col>
    <Col span={6}>
      <DecorativeBox>6</DecorativeBox>
    </Col>
    <Col span={6}>
      <DecorativeBox>6</DecorativeBox>
    </Col>
  </Row>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
