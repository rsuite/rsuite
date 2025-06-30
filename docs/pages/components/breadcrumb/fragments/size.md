<!--start-code-->

```js
import { Breadcrumb, VStack } from 'rsuite';

const BreadcrumbBox = ({ size }) => (
  <Breadcrumb size={size}>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>Products</Breadcrumb.Item>
    <Breadcrumb.Item>Electronics</Breadcrumb.Item>
    <Breadcrumb.Item>Smartphones</Breadcrumb.Item>
    <Breadcrumb.Item>{`${size}`}</Breadcrumb.Item>
  </Breadcrumb>
);

const App = () => (
  <VStack spacing={20}>
    <BreadcrumbBox size="sm" />
    <BreadcrumbBox size="md" />
    <BreadcrumbBox size="lg" />
    <BreadcrumbBox size={'1.25rem'} />
  </VStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
