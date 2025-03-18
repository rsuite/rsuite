<!--start-code-->

```js
import { Grid, Row, Col, HStack, Slider, Center } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="var(--rs-placeholder)" p={20} my={6} rounded="lg" {...rest}>
    {children}
  </Center>
);

const App = () => {
  const [gutter, setGutter] = React.useState(16);
  return (
    <>
      <HStack spacing={20}>
        Gutter
        <Slider value={gutter} w={300} onChange={setGutter} />
      </HStack>
      <hr />
      <Grid fluid>
        <Row gutter={gutter}>
          <Col span={4}>
            <DecorativeBox>4</DecorativeBox>
          </Col>
          <Col span={4}>
            <DecorativeBox>4</DecorativeBox>
          </Col>
          <Col span={4}>
            <DecorativeBox>4</DecorativeBox>
          </Col>
          <Col span={4}>
            <DecorativeBox>4</DecorativeBox>
          </Col>
          <Col span={4}>
            <DecorativeBox>4</DecorativeBox>
          </Col>
          <Col span={4}>
            <DecorativeBox>4</DecorativeBox>
          </Col>
        </Row>
      </Grid>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
