<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <Grid fluid>
    <Row>
      <Col span={{ md: 12 }} hidden={{ xs: true }}>
        <DecorativeBox>hidden={`{ xs: true }`}</DecorativeBox>
      </Col>
      <Col span={{ xs: 24, md: 12 }}>
        <DecorativeBox>
          span={`{ xs: 24, md: 12 }`}
        </DecorativeBox>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
