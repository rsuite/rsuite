<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';

const App = () => (
  <Grid fluid>
    <Row className="show-grid">
      <Col xs={12}>
        <Row className="show-grid">
          <Col xs={12}>
            <Row className="show-grid">
              <Col xs={12}>xs={12}</Col>
              <Col xs={12}>xs={12}</Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row className="show-grid">
              <Col xs={12}>xs={12}</Col>
              <Col xs={12}>xs={12}</Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <Row className="show-grid">
          <Col xs={12}>
            <Row className="show-grid">
              <Col xs={12}>xs={12}</Col>
              <Col xs={12}>xs={12}</Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row className="show-grid">
              <Col xs={12}>xs={12}</Col>
              <Col xs={12}>xs={12}</Col>
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
