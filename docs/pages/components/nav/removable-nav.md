### 扩展：可删除

<!--start-code-->

```js
/**
 * https://github.com/rsuite/responsive-nav
 *
 * import ResponsiveNav from '@rsuite/responsive-nav';
 */

const defaultItems = [
  { eventKey: 'A', label: 'Item A' },
  { eventKey: 'B', label: 'Item B' },
  { eventKey: 'C', label: 'Item C' },
  { eventKey: 'D', label: 'Item D' },
  { eventKey: 'E', label: 'Item E' },
  { eventKey: 'F', label: 'Item F' }
];

function getKey() {
  return (
    (Math.random() * 1e18)
      .toString(36)
      .slice(0, 5)
      .toUpperCase() + ''
  );
}

const App = () => {
  const [activeKey, setActiveKey] = React.useState('A');
  const [items, setItems] = React.useState(defaultItems);

  return (
    <div>
      <ResponsiveNav
        removable
        appearance="tabs"
        moreText={<Icon icon="more" />}
        moreProps={{ noCaret: true }}
        activeKey={activeKey}
        onSelect={setActiveKey}
        onItemRemove={eventKey => {
          const nextItems = [...items];
          nextItems.splice(
            nextItems.map(item => item.eventKey).indexOf(eventKey),
            1
          );
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
    </div>
  );
};
ReactDOM.render(<App />);
```

<!--end-code-->
