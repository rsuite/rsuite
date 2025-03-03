<!--start-code-->

```js
import { Grid, Row, Col } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => (
  <Grid fluid>
    <Row>
      <Col xs={{ span: 12, push: 12 }}>
        <DecorativeBox>
          xs={`{ span: 12, push: 12 }`}
        </DecorativeBox>
      </Col>
      <Col xs={{ span: 12, pull: 12 }}>
        <DecorativeBox>
          xs={`{ span: 12, pull: 12 }`}
        </DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col xs={6}>
        <DecorativeBox> xs={6} `left`</DecorativeBox>
      </Col>
      <Col xs={{ span: 6, push: 12 }}>
        <DecorativeBox>
          xs={`{ span: 6, push: 12 }`}
        </DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col xs={{ span: 6, push: 18 }}>
        <DecorativeBox>
          xs={`{ span: 6, push: 18 }`}
        </DecorativeBox>
      </Col>
      <Col xs={{ span: 6, pull: 6 }}>
        <DecorativeBox>
          xs={`{ span: 6, pull: 6 }`}
        </DecorativeBox>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
