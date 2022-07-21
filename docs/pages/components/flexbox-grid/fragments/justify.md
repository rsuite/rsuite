<!--start-code-->

```js
import { FlexboxGrid, Divider } from 'rsuite';

const App = () => (
  <div className="show-grid">
    <Divider>justify="start"</Divider>
    <FlexboxGrid justify="start">
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
    </FlexboxGrid>
    <Divider>justify="center"</Divider>
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
    </FlexboxGrid>
    <Divider>justify="end"</Divider>
    <FlexboxGrid justify="end">
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
    </FlexboxGrid>
    <Divider>justify="space-between"</Divider>
    <FlexboxGrid justify="space-between">
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
    </FlexboxGrid>
    <Divider>justify="space-around"</Divider>
    <FlexboxGrid justify="space-around">
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>colspan={4}</FlexboxGrid.Item>
    </FlexboxGrid>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
