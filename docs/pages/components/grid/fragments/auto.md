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
        <DecorativeBox>12</DecorativeBox>
      </Col>
      <Col span="auto">
        <DecorativeBox>auto</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col span={6}>
        <DecorativeBox>6</DecorativeBox>
      </Col>
      <Col span="auto">
        <DecorativeBox>auto</DecorativeBox>
      </Col>
      <Col span={6}>
        <DecorativeBox>6</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col span={8}>
        <DecorativeBox>8</DecorativeBox>
      </Col>
      <Col span={{ xs: 8, lg: 'auto' }}>
        <DecorativeBox>xs: 8, lg: auto </DecorativeBox>
      </Col>
      <Col span={8}>
        <DecorativeBox>8</DecorativeBox>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
