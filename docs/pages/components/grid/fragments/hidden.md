<!--start-code-->

```js
import { Grid, Row, Col, Center } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="gray.100" p={20} my={6} rounded="lg" color="gray.500" {...rest}>
    {children}
  </Center>
);

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
