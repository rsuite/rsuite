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
      <Col span={12} push={12}>
        <DecorativeBox>span: 12, push: 12</DecorativeBox>
      </Col>
      <Col span={12} pull={12}>
        <DecorativeBox>span: 12, pull: 12</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col span={6}>
        <DecorativeBox>span: 6</DecorativeBox>
      </Col>
      <Col span={6} push={12}>
        <DecorativeBox>span: 6, push: 12</DecorativeBox>
      </Col>
    </Row>

    <Row>
      <Col span={6} push={18}>
        <DecorativeBox>span: 6, push: 18</DecorativeBox>
      </Col>
      <Col span={6} pull={6}>
        <DecorativeBox>span: 6, pull: 6</DecorativeBox>
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
