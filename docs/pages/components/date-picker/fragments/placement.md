<!--start-code-->

```js
import { DatePicker } from 'rsuite';
import PlacementContainer from '@/components/PlacementContainer';

const App = () => {
  return (
    <PlacementContainer>
      {({ container, placement, preventOverflow }) => (
        <DatePicker
          preventOverflow={preventOverflow}
          placement={placement}
          container={preventOverflow ? container : undefined}
          placeholder={`Will pop from ${placement}`}
        />
      )}
    </PlacementContainer>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
