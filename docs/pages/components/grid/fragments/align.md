<!--start-code-->

```js
import { Row, Col, Divider } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <>
    <Divider>align="top"</Divider>
    <Row align="top">
      <Col span={6}>
        <DecorativeBox h={60}>6</DecorativeBox>
      </Col>
      <Col span={6}>
        <DecorativeBox h={80}>6</DecorativeBox>
      </Col>
      <Col span={6}>
        <DecorativeBox h={100}>6</DecorativeBox>
      </Col>
      <Col span={6}>
        <DecorativeBox h={120}>6</DecorativeBox>
      </Col>
    </Row>

    <Divider>align="center"</Divider>
    <Row align="center">
      <Col span={6}>
        <DecorativeBox h={60}>6</DecorativeBox>
      </Col>
      <Col span={6}>
        <DecorativeBox h={80}>6</DecorativeBox>
      </Col>
      <Col span={6}>
        <DecorativeBox h={100}>6</DecorativeBox>
      </Col>
      <Col span={6}>
        <DecorativeBox h={120}>6</DecorativeBox>
      </Col>
    </Row>

    <Divider>align="bottom"</Divider>
    <Row align="bottom">
      <Col span={6}>
        <DecorativeBox h={60}>6</DecorativeBox>
      </Col>
      <Col span={6}>
        <DecorativeBox h={80}>6</DecorativeBox>
      </Col>
      <Col span={6}>
        <DecorativeBox h={100}>6</DecorativeBox>
      </Col>
      <Col span={6}>
        <DecorativeBox h={120}>6</DecorativeBox>
      </Col>
    </Row>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
