<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                <DecorativeBox>xs={12}</DecorativeBox>
              </Col>
              <Col xs={12}>
                <DecorativeBox>xs={12}</DecorativeBox>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                <DecorativeBox>xs={12}</DecorativeBox>
              </Col>
              <Col xs={12}>
                <DecorativeBox>xs={12}</DecorativeBox>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                <DecorativeBox>xs={12}</DecorativeBox>
              </Col>
              <Col xs={12}>
                <DecorativeBox>xs={12}</DecorativeBox>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                <DecorativeBox>xs={12}</DecorativeBox>
              </Col>
              <Col xs={12}>
                <DecorativeBox>xs={12}</DecorativeBox>
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
