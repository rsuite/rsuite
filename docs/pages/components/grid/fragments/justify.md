<!--start-code-->

```js
import { Row, Col, Divider } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <>
    <Divider>justify="start"</Divider>
    <Row justify="start">
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
    </Row>
    <Divider>justify="center"</Divider>
    <Row justify="center">
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
    </Row>
    <Divider>justify="end"</Divider>
    <Row justify="end">
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
    </Row>
    <Divider>justify="space-between"</Divider>
    <Row justify="space-between">
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
    </Row>
    <Divider>justify="space-around"</Divider>
    <Row justify="space-around">
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
      <Col xs={4}>
        <DecorativeBox>4</DecorativeBox>
      </Col>
    </Row>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
