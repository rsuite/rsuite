<!--start-code-->

```js
import { FlexboxGrid, Divider } from 'rsuite';
import { Box } from '../../../../mock-components/Box';

const App = () => (
  <>
    <Divider>align="top"</Divider>
    <FlexboxGrid align="top">
      <FlexboxGrid.Item colspan={6}>
        <Box height={60}>colspan={6}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <Box height={80}>colspan={6}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <Box height={100}>colspan={6}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <Box height={120}>colspan={6}</Box>
      </FlexboxGrid.Item>
    </FlexboxGrid>

    <Divider>align="middle"</Divider>
    <FlexboxGrid align="middle">
      <FlexboxGrid.Item colspan={6}>
        <Box height={60}>colspan={6}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <Box height={80}>colspan={6}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <Box height={100}>colspan={6}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <Box height={120}>colspan={6}</Box>
      </FlexboxGrid.Item>
    </FlexboxGrid>

    <Divider>align="bottom"</Divider>
    <FlexboxGrid align="bottom">
      <FlexboxGrid.Item colspan={6}>
        <Box height={60}>colspan={6}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <Box height={80}>colspan={6}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <Box height={100}>colspan={6}</Box>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <Box height={120}>colspan={6}</Box>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));

```

<!--end-code-->
