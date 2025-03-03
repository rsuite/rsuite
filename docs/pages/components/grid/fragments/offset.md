<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <Grid fluid>
    <Row>
      <Col span={4} offset={20}>
        <DecorativeBox>span: 4, offset: 20</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col span={8} offset={16}>
        <DecorativeBox>span: 8, offset: 16</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col span={12} offset={12}>
        <DecorativeBox>span: 12, offset: 12</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col span={16} offset={8}>
        <DecorativeBox>span: 16, offset: 8</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col span={20} offset={4}>
        <DecorativeBox>span: 20, offset: 4</DecorativeBox>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
