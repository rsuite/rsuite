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
      <Col span={2}>
        <DecorativeBox>2</DecorativeBox>
      </Col>
      <Col span={2}>
        <DecorativeBox>2</DecorativeBox>
      </Col>
      <Col span={2}>
        <DecorativeBox>2</DecorativeBox>
      </Col>
      <Col span={2}>
        <DecorativeBox>2</DecorativeBox>
      </Col>
      <Col span={2}>
        <DecorativeBox>2</DecorativeBox>
      </Col>
      <Col span={2}>
        <DecorativeBox>2</DecorativeBox>
      </Col>
      <Col span={2}>
        <DecorativeBox>2</DecorativeBox>
      </Col>
      <Col span={2}>
        <DecorativeBox>2</DecorativeBox>
      </Col>
      <Col span={2}>
        <DecorativeBox>2</DecorativeBox>
      </Col>
      <Col span={2}>
        <DecorativeBox>2</DecorativeBox>
      </Col>
      <Col span={2}>
        <DecorativeBox>2</DecorativeBox>
      </Col>
      <Col span={2}>
        <DecorativeBox>2</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col span={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col span={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col span={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col span={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col span={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col span={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
    </Row>

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
    </Row>

    <Row>
      <Col span={8}>
        <DecorativeBox>8</DecorativeBox>
      </Col>
      <Col span={8}>
        <DecorativeBox>8</DecorativeBox>
      </Col>
      <Col span={8}>
        <DecorativeBox>8</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col span={12}>
        <DecorativeBox>12</DecorativeBox>
      </Col>
      <Col span={12}>
        <DecorativeBox>12</DecorativeBox>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
