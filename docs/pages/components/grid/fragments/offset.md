<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';

const App = () => (
  <Grid fluid>
    <Row>
      <Col md={4} mdOffset={20}>
        <Box>
          xs={4} xsOffset={20}
        </Box>
      </Col>
    </Row>

    <Row>
      <Col xs={8} xsOffset={16}>
        <Box>
          xs={8} xsOffset={16}
        </Box>
      </Col>
    </Row>

    <Row>
      <Col xs={12} xsOffset={12}>
        <Box>
          xs={12} xsOffset={12}
        </Box>
      </Col>
    </Row>

    <Row>
      <Col xs={16} xsOffset={8}>
        <Box>
          xs={16} xsOffset={8}
        </Box>
      </Col>
    </Row>

    <Row>
      <Col xs={20} xsOffset={4}>
        <Box>
          xs={20} xsOffset={4}
        </Box>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
