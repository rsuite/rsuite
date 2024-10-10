<!--start-code-->

```js
import { ButtonGroup, Button, Whisper, Popover, Dropdown, IconButton } from 'rsuite';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

const App = () => {
  const [action, setAction] = React.useState(0);
  return (
    <ButtonGroup>
      <Button appearance="primary" color="green">
        {options[action]}
      </Button>
      <Whisper
        placement="bottomEnd"
        trigger="click"
        speaker={({ onClose, left, top, className }, ref) => {
          const handleSelect = eventKey => {
            onClose();
            setAction(eventKey);
            console.log(eventKey);
          };
          return (
            <Popover ref={ref} className={className} style={{ left, top }} full>
              <Dropdown.Menu onSelect={handleSelect}>
                {options.map((item, index) => (
                  <Dropdown.Item key={index} eventKey={index}>
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Popover>
          );
        }}
      >
        <IconButton appearance="primary" color="green" icon={<ArrowDownIcon />} />
      </Whisper>
    </ButtonGroup>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
