<!--start-code-->

```js
import { useBreakpointValue, Avatar } from 'rsuite';

const App = () => {
  const size = useBreakpointValue(
    {
      '(min-width: 1200px)': 'xxl',
      '(min-width: 992px)': 'xl',
      '(min-width: 768px)': 'lg',
      '(min-width: 576px)': 'md'
    },
    { defaultValue: 'md' }
  );

  return (
    <>
      <p>
        Resize your window to see avatar size change. Current size: <b>{size}</b>
      </p>
      <hr />

      <Avatar size={size} circle src="https://i.pravatar.cc/150?u=1" />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
