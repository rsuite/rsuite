```
import ResponsiveNav from '@rsuite/responsive-nav';
```

<!--start-code-->

```js
import { Button } from 'rsuite';
import ResponsiveNav from '@rsuite/responsive-nav';
import MoreIcon from '@rsuite/icons/More';

const defaultItems = [
  { eventKey: 'A', label: 'Item A' },
  { eventKey: 'B', label: 'Item B' },
  { eventKey: 'C', label: 'Item C' },
  { eventKey: 'D', label: 'Item D' },
  { eventKey: 'E', label: 'Item E' },
  { eventKey: 'F', label: 'Item F' }
];

function getKey() {
  return (Math.random() * 1e18).toString(36).slice(0, 5).toUpperCase() + '';
}

const App = () => {
  const [activeKey, setActiveKey] = React.useState('A');
  const [items, setItems] = React.useState(defaultItems);

  return (
    <>
      <ResponsiveNav
        removable
        appearance="tabs"
        moreText={<MoreIcon />}
        moreProps={{ noCaret: true }}
        activeKey={activeKey}
        onSelect={setActiveKey}
        onItemRemove={eventKey => {
          const nextItems = [...items];
          nextItems.splice(nextItems.map(item => item.eventKey).indexOf(eventKey), 1);
          setItems(nextItems);
          setActiveKey(nextItems[0] ? nextItems[0].eventKey : null);
        }}
      >
        {items.map(item => (
          <ResponsiveNav.Item key={item.eventKey} eventKey={item.eventKey}>
            {item.label}
          </ResponsiveNav.Item>
        ))}
      </ResponsiveNav>
      <hr />
      <Button
        appearance="primary"
        onClick={() => {
          const itemKey = getKey();
          const nextItems = [
            ...items,
            {
              eventKey: itemKey,
              label: `Item ${itemKey}`
            }
          ];
          setItems(nextItems);
        }}
      >
        New Item
      </Button>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
