<!--start-code-->

```js
import { CheckPicker } from 'rsuite';
import PlacementContainer from '@/components/PlacementContainer';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd'].map(item => ({
  label: item,
  value: item
}));

const App = () => {
  return (
    <PlacementContainer>
      {({ container, placement, preventOverflow }) => (
        <CheckPicker
          w={224}
          preventOverflow={preventOverflow}
          placement={placement}
          container={preventOverflow ? container : undefined}
          data={data}
          placeholder={`Will pop from ${placement}`}
        />
      )}
    </PlacementContainer>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
```

<!--end-code-->
