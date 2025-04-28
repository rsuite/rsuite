<!--start-code-->

```js
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import { Breadcrumb, Dropdown, HStack } from 'rsuite';

const App = () => (
  <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>
      <Dropdown
        renderToggle={(props, ref) => (
          <HStack {...props} ref={ref}>
            Components
            <ArrowDownLineIcon />
          </HStack>
        )}
      >
        <Dropdown.Item>Guides</Dropdown.Item>
        <Dropdown.Item>Components</Dropdown.Item>
        <Dropdown.Item>Tools</Dropdown.Item>
      </Dropdown>
    </Breadcrumb.Item>
    <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
  </Breadcrumb>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
