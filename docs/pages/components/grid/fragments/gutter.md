<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';

const App = () => (
  <Grid fluid>
    <Row gutter={16}>
      <Col xs={4}>
        <div className="show-col">xs={4}</div>
      </Col>
      <Col xs={4}>
        <div className="show-col">xs={4}</div>
      </Col>
      <Col xs={4}>
        <div className="show-col">xs={4}</div>
      </Col>
      <Col xs={4}>
        <div className="show-col">xs={4}</div>
      </Col>
      <Col xs={4}>
        <div className="show-col">xs={4}</div>
      </Col>
      <Col xs={4}>
        <div className="show-col">xs={4}</div>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
