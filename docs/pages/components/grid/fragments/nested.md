<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <Grid fluid>
    <Row>
      <Col span={12}>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
