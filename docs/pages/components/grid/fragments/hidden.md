<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';

const App = () => (
  <Grid fluid>
    <Row className="show-grid">
      <Col xsHidden md={12}>
        xsHidden md={12}
      </Col>
      <Col xs={24} md={12}>
        xs={24} md={12}
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
