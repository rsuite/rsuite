<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';

const App = () => (
  <Grid fluid>
    <Row className="show-grid">
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
      <Col xs={2}>xs={2}</Col>
    </Row>

    <Row className="show-grid">
      <Col xs={4}>xs={4}</Col>
      <Col xs={4}>xs={4}</Col>
      <Col xs={4}>xs={4}</Col>
      <Col xs={4}>xs={4}</Col>
      <Col xs={4}>xs={4}</Col>
      <Col xs={4}>xs={4}</Col>
    </Row>

    <Row className="show-grid">
      <Col xs={8}>xs={8}</Col>
      <Col xs={8}>xs={8}</Col>
      <Col xs={8}>xs={8}</Col>
    </Row>

    <Row className="show-grid">
      <Col xs={12}>xs={12}</Col>
      <Col xs={12}>xs={12}</Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
