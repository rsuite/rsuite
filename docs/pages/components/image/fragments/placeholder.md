<!--start-code-->

```js
import { Image, Placeholder, Button } from 'rsuite';

const App = () => {
  const [reload, setReload] = React.useState(2000);
  const handleReload = () => {
    setReload(reload + 1);
  };

  return (
    <>
      <Image
        width={300}
        height={200}
        src={`https://app.requestly.io/delay/${reload}/https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=300`}
        placeholder={<Placeholder.Graph active />}
        alt="black and white short coated dog"
      />
      <hr />
      <Button onClick={handleReload}> Reload </Button>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
