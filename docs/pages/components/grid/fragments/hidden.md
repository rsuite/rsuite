<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';

const App = () => (
  <Grid fluid>
    <Row className="show-grid">
      <Col xsHidden xs={12}>
        xsHidden xs={12}
      </Col>
      <Col xs={12} xs={12}>
        xs={12} xs={12}
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
