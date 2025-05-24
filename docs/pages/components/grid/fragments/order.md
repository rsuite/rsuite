<!--start-code-->

```js
import { Row, Col, Center } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="var(--rs-placeholder)" p={20} my={6} rounded="lg" {...rest}>
    {children}
  </Center>
);

const App = () => (
  <Row>
    <Col span={4} order={4}>
      <DecorativeBox>order={4}</DecorativeBox>
    </Col>
    <Col span={4} order={3}>
      <DecorativeBox>order={3}</DecorativeBox>
    </Col>
    <Col span={4} order={2}>
      <DecorativeBox>order={2}</DecorativeBox>
    </Col>
    <Col span={4} order={1}>
      <DecorativeBox>order={1}</DecorativeBox>
    </Col>
  </Row>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
