<!--start-code-->

```js
import { Grid, Row, Col, Center } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="var(--rs-placeholder)" p={20} my={6} rounded="lg" {...rest}>
    {children}
  </Center>
);

const App = () => (
  <Grid fluid>
    <Row>
      <Col span={12}>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
              <Col span={12}>
                <DecorativeBox>12</DecorativeBox>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
