<!--start-code-->

```js
import { FlexboxGrid, Divider } from 'rsuite';
import { Box } from '../../../../mock-components/Box';

const App = () => (
  <>
    <Divider>justify="start"</Divider>
    <FlexboxGrid justify="start">
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
    </FlexboxGrid>
    <Divider>justify="center"</Divider>
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
    </FlexboxGrid>
    <Divider>justify="end"</Divider>
    <FlexboxGrid justify="end">
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
    </FlexboxGrid>
    <Divider>justify="space-between"</Divider>
    <FlexboxGrid justify="space-between">
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
    </FlexboxGrid>
    <Divider>justify="space-around"</Divider>
    <FlexboxGrid justify="space-around">
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4}>
        <Box>colspan={4}</Box>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
