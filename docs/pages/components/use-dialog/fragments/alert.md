<!--start-code-->

```jsx
import { Button, useDialog } from 'rsuite';

const App = () => {
  const dialog = useDialog();

  const handleClick = async () => {
    await dialog.alert('This is an alert message');
    console.log('Alert closed');
  };

  return <Button onClick={handleClick}>Alert</Button>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
