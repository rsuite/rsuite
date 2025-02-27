<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';

const App = () => (
  <Grid fluid>
    <Row >
      <Col xs={12}>
        <Row >
          <Col xs={12}>
            <Row >
              <Col xs={12}><Box>xs={12}</Box></Col>
              <Col xs={12}><Box>xs={12}</Box></Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row >
              <Col xs={12}><Box>xs={12}</Box></Col>
              <Col xs={12}><Box>xs={12}</Box></Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <Row >
          <Col xs={12}>
            <Row >
              <Col xs={12}><Box>xs={12}</Box></Col>
              <Col xs={12}><Box>xs={12}</Box></Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row >
              <Col xs={12}><Box>xs={12}</Box></Col>
              <Col xs={12}><Box>xs={12}</Box></Col>
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
