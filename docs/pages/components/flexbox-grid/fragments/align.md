<!--start-code-->

```js
import { FlexboxGrid, Divider } from 'rsuite';

const App = () => (
  <div className="show-grid">
    <Divider>align="top"</Divider>
    <FlexboxGrid align="top">
      <FlexboxGrid.Item colspan={6}>
        <div style={{ lineHeight: 1 }}>colspan={6}</div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <div style={{ lineHeight: 2 }}>colspan={6}</div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <div style={{ lineHeight: 3 }}>colspan={6}</div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <div style={{ lineHeight: 4 }}>colspan={6}</div>
      </FlexboxGrid.Item>
    </FlexboxGrid>

    <Divider>align="middle"</Divider>
    <FlexboxGrid align="middle">
      <FlexboxGrid.Item colspan={6}>
        <div style={{ lineHeight: 1 }}>colspan={6}</div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <div style={{ lineHeight: 2 }}>colspan={6}</div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <div style={{ lineHeight: 3 }}>colspan={6}</div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <div style={{ lineHeight: 4 }}>colspan={6}</div>
      </FlexboxGrid.Item>
    </FlexboxGrid>

    <Divider>align="bottom"</Divider>
    <FlexboxGrid align="bottom">
      <FlexboxGrid.Item colspan={6}>
        <div style={{ lineHeight: 1 }}>colspan={6}</div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <div style={{ lineHeight: 2 }}>colspan={6}</div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <div style={{ lineHeight: 3 }}>colspan={6}</div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={6}>
        <div style={{ lineHeight: 4 }}>colspan={6}</div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </div>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
