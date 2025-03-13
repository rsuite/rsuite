<!--start-code-->

```js
import { Grid, Row, Col, Center } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="gray.100" p={20} my={6} rounded="lg" color="gray.500" {...rest}>
    {children}
  </Center>
);

const App = () => (
  <Grid fluid>
    <Row>
      <Col span={20} offset={4}>
        <DecorativeBox>span: 20, offset: 4</DecorativeBox>
      </Col>
    </Row>
    <Row>
      <Col span={16} offset={8}>
        <DecorativeBox>span: 16, offset: 8</DecorativeBox>
      </Col>
    </Row>
    <Row>
      <Col span={12} offset={12}>
        <DecorativeBox>span: 12, offset: 12</DecorativeBox>
      </Col>
    </Row>
    <Row>
      <Col span={8} offset={16}>
        <DecorativeBox>span: 8, offset: 16</DecorativeBox>
      </Col>
    </Row>
    <Row>
      <Col span={8} offset={8}>
        <DecorativeBox>span: 8, offset: 8</DecorativeBox>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
