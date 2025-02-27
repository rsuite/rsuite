<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';

const App = () => (
  <Grid fluid>
    <Row>
      <Col xs={12} xsPush={12}>
        <Box>
          xs={12} xsPush={12}
        </Box>
      </Col>
      <Col xs={12} xsPull={12}>
        <Box>
          xs={12} xsPull={12}
        </Box>
      </Col>
    </Row>

    <Row>
      <Col xs={6}>
        <Box> xs={6} `left`</Box>
      </Col>
      <Col xs={6} xsPush={12}>
        <Box>
          xs={6} xsPush={12}
        </Box>
      </Col>
    </Row>

    <Row>
      <Col xs={6} xsPush={18}>
        <Box>
          xs={6} xsPush={18}
        </Box>
      </Col>
      <Col xs={6} xsPull={6}>
        <Box>
          xs={6} xsPull={6}
        </Box>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
