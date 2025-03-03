<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <Grid fluid>
    <Row>
      <Col md={12} xs={{ hidden: true }}>
        <DecorativeBox>xs={`{ hidden: true }`}</DecorativeBox>
      </Col>
      <Col xs={24} md={12}>
        <DecorativeBox>
          xs={24} md={12}
        </DecorativeBox>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
