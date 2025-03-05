<!--start-code-->

```js
import { Row, Col } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

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
