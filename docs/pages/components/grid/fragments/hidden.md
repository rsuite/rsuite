<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';

const App = () => (
  <Grid fluid>
    <Row>
      <Col xsHidden md={12}>
        <Box>xsHidden md={12}</Box>
      </Col>
      <Col xs={24} md={12}>
        <Box>xs={24} md={12}</Box>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
