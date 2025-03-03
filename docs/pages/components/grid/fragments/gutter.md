<!--start-code-->

```js
import { Grid, Row, Col, HStack, Slider } from 'rsuite';
import { DecorativeBox } from '@/components/DecorativeBox';

const App = () => {
  const [gutter, setGutter] = React.useState(16);
  return (
    <>
      <HStack spacing={20}>
        Gutter
        <Slider value={gutter} style={{ width: 300 }} onChange={setGutter} />
      </HStack>
      <hr />
      <Grid fluid>
        <Row gutter={gutter}>
          <Col xs={4}>
            <DecorativeBox>xs={4}</DecorativeBox>
          </Col>
          <Col xs={4}>
            <DecorativeBox>xs={4}</DecorativeBox>
          </Col>
          <Col xs={4}>
            <DecorativeBox>xs={4}</DecorativeBox>
          </Col>
          <Col xs={4}>
            <DecorativeBox>xs={4}</DecorativeBox>
          </Col>
          <Col xs={4}>
            <DecorativeBox>xs={4}</DecorativeBox>
          </Col>
          <Col xs={4}>
            <DecorativeBox>xs={4}</DecorativeBox>
          </Col>
        </Row>
      </Grid>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
