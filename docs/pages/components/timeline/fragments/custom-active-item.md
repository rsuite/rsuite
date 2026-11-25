<!--start-code-->

```js
import { Timeline, Grid, Row, Col } from 'rsuite';

const ExampleTimeline = props => (
  <Timeline {...props}>
    <Timeline.Item>First item</Timeline.Item>
    <Timeline.Item>Second item</Timeline.Item>
    <Timeline.Item>Third item</Timeline.Item>
  </Timeline>
);

const App = () => (
  <Grid fluid>
    <Row>
      <Col xs={8}>
        <ExampleTimeline isItemActive={Timeline.ACTIVE_FIRST} />
      </Col>
      <Col xs={8}>
        <ExampleTimeline isItemActive={index => index === 1} />
      </Col>
      <Col xs={8}>
        <ExampleTimeline isItemActive={Timeline.ACTIVE_LAST} />
      </Col>
    </Row>
  </Grid>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
