<!--start-code-->

```js
import { Grid, Row, Col, VStack, HStack, Slider, Center, Text } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="var(--rs-placeholder)" p={20} rounded="lg" {...rest}>
    {children}
  </Center>
);

const App = () => {
  const [columnGutter, setColumnGutter] = React.useState(16);
  const [rowGutter, setRowGutter] = React.useState(16);

  return (
    <>
      <VStack spacing={20}>
        <HStack spacing={20} w="100%">
          <Text muted w={120}>Column Gutter</Text>
          <Slider value={columnGutter} w="100%" onChange={setColumnGutter} />
        </HStack>
        <HStack spacing={20} w="100%">
          <Text muted w={120}>Row Gutter</Text>
          <Slider value={rowGutter} w="100%" onChange={setRowGutter} />
        </HStack>
      </VStack>
      <hr />
      <Grid fluid>
        <Row gutter={[columnGutter, rowGutter]}>
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
