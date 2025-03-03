<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <Grid fluid>
    <Row>
      <Col xs={{ span: 4, offset: 20 }}>
        <DecorativeBox>xs={`{ span: 4, offset: 20 }`}</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col xs={{ span: 8, offset: 16 }}>
        <DecorativeBox>xs={`{ span: 8, offset: 16 }`}</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col xs={{ span: 12, offset: 12 }}>
        <DecorativeBox>xs={`{ span: 12, offset: 12 }`}</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col xs={{ span: 16, offset: 8 }}>
        <DecorativeBox>xs={`{ span: 16, offset: 8 }`}</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col xs={{ span: 20, offset: 4 }}>
        <DecorativeBox>xs={`{ span: 20, offset: 4 }`}</DecorativeBox>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
