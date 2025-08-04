<!--start-code-->

```jsx
import { Button, useDialog } from 'rsuite';

const App = () => {
  const dialog = useDialog();

  const handleClick = async () => {
    const confirmed = await dialog.confirm('Are you sure you want to delete this item?');

    if (confirmed) {
      console.log('Item deleted');
    } else {
      console.log('Deletion cancelled');
    }
  };

  return <Button onClick={handleClick}>Confirm</Button>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
